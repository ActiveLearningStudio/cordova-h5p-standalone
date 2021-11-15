document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
        fs.root.getFile("offlineactivity.txt", { create: false, exclusive: false }, function(fileEntry) {
            console.log("file", fileEntry)
            offlinereadFile(fileEntry);
        }, onErrorCreateFile = (err) => { console.log(err) });
    }, onErrorLoadFs = (err) => { console.log(err) })
    var getUrlParams = location.search.split("activityPath="),
        activityPath = getUrlParams[1],
        activityId = "",
        splitActivitypath = activityPath.split("/");
    splitActivitypath.splice(splitActivitypath.length - 1, 1),
        newActivityPath = splitActivitypath.join('/');
    var generateNewActivityPath = newActivityPath + "/";
    console.log("split activity path...", splitActivitypath)
    console.log("new activity path..", newActivityPath)
    console.log("JSON PATH>>>>>>", activityPath);

    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', activityPath, true);
    // xhr.responseType = 'json';

    // xhr.onload = function() {
    //     if (this.status == 200) {
    //         var json = JSON.stringify(this.response)
    //         console.log(JSON.parse(json))
    //     }
    // };
    // xhr.send();


    window.resolveLocalFileSystemURL(activityPath, function success(fileEntry) {
            fileEntry.file(function(file) {
                // console.log("im here>>>>", file);
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    var playlistJSON = JSON.parse(evt.target.result);
                    console.log("JOSN????", playlistJSON);
                    var setting = playlistJSON.settings;
                    window.H5PIntegration = {...setting }
                    $('#h5p-container').append(playlistJSON.embed_code);
                    console.log("setting>>>>", window.H5PIntegration);
                    var scripts = `<script src="js/h5p/jquery.js"></script>
                <script src="js/h5p/h5p.js"></script>
                <script src="js/h5p/h5p-event-dispatcher.js"></script>
                <script src="js/h5p/h5p-x-api.js"></script>
                <script src="js/h5p/h5p-x-api-event.js"></script>
                <script src="js/h5p/h5p-content-type.js"></script>
                <script src="js/h5p/DocumentsUpload.js"></script>`;
                    $("body").append(scripts);
                }
                reader.readAsText(file);
            })
        }, (err) => { console.log("error>>>", err) })
        // const offlineElement = document.getElementById('h5p-container');
        // const options = {
        //     h5pJsonPath: activityPath,
        //     frameJs: 'plugins/h5p-standalone/dist/mod.frame.bundle.js',
        //     frameCss: 'plugins/h5p-standalone/dist/styles/h5p.css',
        // }
        // new H5PStandalone.H5P(offlineElement, options);

    // ------------------------------------------------------------------------


    function offlinereadFile(fileEntry) {
        fileEntry.file(function(file) {
            var reader = new FileReader();
            // console.log("reader", reader);
            reader.onloadend = function() {
                //console.log("blob", this.result)
                activityIdObj = this.result.split(",")
                    // console.log("activity id object...", activityIdObj)
                    // console.log("activity path...", activityPath)
                    // console.log("new activity...", newActivityPath)
                var generateNewActivityPath = newActivityPath + "/",
                    indexno = activityIdObj.indexOf(generateNewActivityPath)
                currentActivity = getKeyByValue(activityIdObj, generateNewActivityPath),

                    countActivity = Object.keys(activityIdObj).length,
                    totalActivity = countActivity - 1,
                    buttonsHTML = `
                <div class="d-flex justify-content-between btn-wrap pb-3">
                    <button class="btn btn-info" id="prevButton" ${currentActivity == 0 ? "disabled" : ""}>Prev</button>
                    <button class="btn btn-info" id="nextButton" ${currentActivity == totalActivity ? "disabled" : ""}>Next</button>
                </div>`;
                // console.log("index no", indexno)
                // console.log("current activity", currentActivity)
                // console.log("count...", countActivity)
                // console.log("total", totalActivity)
                // console.log("genetate new activity is", generateNewActivity)
                $("#offlineactiveButton").append(buttonsHTML);
            };
            reader.readAsText(file);

        }, onErrorReadFile = (err) => { console.log(err) });
    }
    $(document).on("click", "#prevButton", () => {
        var currentActivityId = getKeyByValue(activityIdObj, generateNewActivityPath),
            prevActivityId = parseInt(currentActivityId) - 1;
        window.resolveLocalFileSystemURL(activityIdObj[prevActivityId], function success(activities) {
            console.log("activity object--", activityIdObj)
            var activitiesReader = activities.createReader();
            activitiesReader.readEntries(getPlaylists = (activitiesFiles) => {
                activitiesFiles.forEach((activitiesFile) => {


                    if (activitiesFile.isFile) {
                        if (activitiesFile.name.includes('h5p.json')) {
                            console.log("file", activitiesFile);
                            window.location.href = `offline-activity.html?activityPath=${activitiesFile.nativeURL}`;
                            //console.log("location---", window.location.href)
                            //console.log("file", activitiesFile);
                            window.location.href = `offline-activity.html?activityPath=${activitiesFile.nativeURL}`;
                            console.log("location---", window.location.href)
                        }
                    }
                })
            })
        })

    })
    $(document).on("click", "#nextButton", () => {
            console.log(">>>>>>>>>>", activityIdObj)
            console.log(">>>>>>>>>>", newActivityPath)
            var currentActivityId = getKeyByValue(activityIdObj, generateNewActivityPath),
                nextActivityId = parseInt(currentActivityId) + 1;

            window.resolveLocalFileSystemURL(activityIdObj[nextActivityId], function success(activities) {
                var activitiesReader = activities.createReader();
                activitiesReader.readEntries(getPlaylists = (activitiesFiles) => {
                    activitiesFiles.forEach((activitiesFile) => {
                        console.log("activities files==", activitiesFile)
                        if (activitiesFile.isFile) {
                            if (activitiesFile.name.includes('h5p.json')) {
                                console.log("file", activitiesFile);
                                window.location.href = `offline-activity.html?activityPath=${activitiesFile.nativeURL}`;
                                console.log("location---", window.location.href)
                            }
                        }
                    })
                })
            })
        })
        // handlePlayActivity(activityIdObj[nextActivityId])  })

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] == value);
    }
}
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);
var dataFileEntry;

function onOnline() {
    // Handle the online event
    var networkState = navigator.connection.type;
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
        fs.root.getFile("newTempFile.txt", { create: false, exclusive: false }, function(fileEntry) {
            readFile(fileEntry);
        }, onErrorCreateFile = (err) => { console.log(err) });
    }, onErrorLoadFs = (err) => { console.log(err) })
}

function onOffline() {
    // Handle the offline event
    var data;
    console.log("lost connection");
    H5P.externalDispatcher.on('xAPI', function(event) {
        console.log("event...", event.data.statement)
        switch (event.getVerb()) {
            case 'completed':
                var obtainedScores = event.getScore(),
                    maxScores = event.getMaxScore(),
                    uuid = device.uuid;
                data = {
                    "obtainedScore": obtainedScores,
                    "maxScores": maxScores,
                    "uuid": uuid
                }
                const stringData = JSON.stringify(data);
                window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
                    console.log('file system open: ' + fs.name);
                    createFile(fs.root, "newTempFile.txt", false, data);
                }, onErrorLoadFs = (err) => { console.log(err) });
                break;
        }
    });
}

function createFile(dirEntry, fileName, isAppend, data) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {
        writeFile(fileEntry, data);
    }, onErrorCreateFile = (err) => { console.log(err) });

}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function() {
            console.log("Successful file write..." + this.result);
        };
        fileWriter.onerror = function(e) {
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
    fileEntry.file(function(file) {
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

    }, onErrorReadFile = (err) => { console.log(err) });
}