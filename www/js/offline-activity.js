document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    getUrlParams = location.search.split("activityPath=");
    activityPath = getUrlParams[1];
    console.log(activityPath)

    window.resolveLocalFileSystemURL(activityPath, function success(activities) {
        var activitiesReader = activities.createReader();
        activitiesReader.readEntries(getPlaylists = (activitiesFiles) => {
            activitiesFiles.forEach((activitiesFile) => {
                if(activitiesFile.isFile) {
                    console.log("file",activitiesFile);
                    if(activitiesFile.name.includes(".h5p")) {
                        var activityName = activitiesFile.name.split(".")
                        moveFile(activitiesFile.nativeURL, activityName[0]);
                    }
                } else {
                    // ------ Project.json address here -----
                    // variable = playlistFile
                    console.log(activitiesFile)
                    const offlineElement = document.getElementById('h5p-container');
                    const options = {
                        h5pJsonPath:  activitiesFile.nativeURL,
                        frameJs: '../plugins/h5p-standalone/dist/mod.frame.bundle.js',
                        frameCss: '../plugins/h5p-standalone/dist/styles/h5p.css',
                    }
                    new H5PStandalone.H5P(offlineElement, options);
                } 
            });
        });
    });

    function moveFile(fileUri, name) {
        window.resolveLocalFileSystemURL(fileUri,
            function(fileEntry){
                newFileUri  = activityPath;
                oldFileUri  = fileUri;
                fileExt     = "." + "zip";

                newFileName = name + fileExt;
                window.resolveLocalFileSystemURL(newFileUri,
                    function(dirEntry) {
                        // move the file to a new directory and rename it
                        fileEntry.moveTo(dirEntry, newFileName, successCallback = (evt) => {
                            processZip(evt.nativeURL, newFileUri + name);
                            setTimeout(() => {
                                removeDependencies(newFileUri + name);
                            }, 4000);
                        }, errorCallback);
                    },
                    errorCallback = (err) => {console.log(err)}
                );
            },
            errorCallback = (err) => {console.log(err)}
        );
    }

    function processZip(zipSource, destination) {
        // Handle the progress event
        var progressHandler = function(progressEvent){
            var percent =  Math.round((progressEvent.loaded / progressEvent.total) * 100);
            console.log(percent + "%");
        };
        // Proceed to unzip the file
        window.zip.unzip(zipSource, destination, (status) => {
            if(status == 0){
                console.log("Files succesfully decompressed");
                window.resolveLocalFileSystemURL (zipSource, 
                    function (fileEntry) { 
                        fileEntry.remove(
                            function () { 
                                console.log('File is removed.'); 
                            }, 
                            function (error) {
                                console.log('Unable to remove file. ' + error );
                            }
                        ); 
                    }, function (error) {console.log(error)}
                 );
            }
            if(status == -1){
                console.error("Oops, cannot decompress files");
            }
        }, progressHandler);
    }

    function removeDependencies(path) {
        window.resolveLocalFileSystemURL(path, (dir) => {
            var dirReader = dir.createReader();
            dirReader.readEntries(getAllDependencies = (allDirectories) => {
                allDirectories.forEach((allDirectory) => {
                    if(allDirectory.isDirectory) {
                        if(allDirectory.name != "content") {
                            allDirectory.removeRecursively(() => {
                                console.log("directory deleted");
                            }, (err) => {
                                console.log("error", err);
                            })
                        }
                    } else {
                        // console.log("folder", activitiesH5pFile)
                    } 
                }) 
            })
        })
    }
}