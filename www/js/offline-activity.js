document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    getUrlParams = location.search.split("activityPath=");
    activityPath = getUrlParams[1];
    console.log(activityPath)

    const offlineElement = document.getElementById('h5p-container');
    const options = {
        h5pJsonPath:  activityPath,
        frameJs: 'plugins/h5p-standalone/dist/mod.frame.bundle.js',
        frameCss: 'plugins/h5p-standalone/dist/styles/h5p.css',
    }
    new H5PStandalone.H5P(offlineElement, options);
}

document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);
var dataFileEntry;
    function onOnline() {
        // Handle the online event
        var networkState = navigator.connection.type;
        window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
            fs.root.getFile("newTempFile.txt", {create: false, exclusive: false}, function(fileEntry) {
                readFile(fileEntry);
            }, onErrorCreateFile = (err) => {console.log(err)});
        }, onErrorLoadFs = (err) => {console.log(err)})
    }

    function onOffline() {
        // Handle the offline event
        var data;
        console.log("lost connection");
        H5P.externalDispatcher.on('xAPI', function (event) {
            switch (event.getVerb()) {
                case 'completed':
                    var obtainedScores = event.getScore(),
                    maxScores = event.getMaxScore(),
                    uuid = device.uuid;
                    data = {
                        "obtainedScore" : obtainedScores,
                        "maxScores" : maxScores,
                        "uuid": uuid
                    }
                    const stringData = JSON.stringify(data);
                    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
                        console.log('file system open: ' + fs.name);
                        createFile(fs.root, "newTempFile.txt", false, data);  
                    }, onErrorLoadFs = (err) => {console.log(err)});
                break;
            }
        });
    }

    function createFile(dirEntry, fileName, isAppend, data) {
        // Creates a new file or returns the file if it already exists.
        dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
            writeFile(fileEntry, data);
        }, onErrorCreateFile = (err) => {console.log(err)});
    
    }

    function writeFile(fileEntry, dataObj) {
        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function() {
                console.log("Successful file write..." + this.result);
            };
            fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };
            // If data object is not passed in,
            // create a new Blob instead.
            if (!dataObj) {           
                dataObj = new Blob([stringData], { type: 'text/plain' });
            }
            fileWriter.write(dataObj);
        });
    }

    function readFile(fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function() {
                console.log("Successful file read: " + this.result);
                // console.log(fileEntry.fullPath + ": " + this.result);
                var data = JSON.parse(this.result)
                console.log(data)
                $.ajax({
                    url: "https://seminary-tools.000webhostapp.com/api/save_data.php",
                    data: data,
                    success: function(result) {
                        console.log(result)
                    }
                });
            };
            reader.readAsText(file);
    
        }, onErrorReadFile = (err) => {console.log(err)});
    }