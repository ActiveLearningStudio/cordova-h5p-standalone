document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    getUrlParams = location.search.split("activitiesPath=");
    activitiesPath = getUrlParams[1];
    console.log("activities===", activitiesPath)
    var offlineActivitiesHTML = '',
        counter = 0,
        activityPath = [],
        counterid = 0;
    window.resolveLocalFileSystemURL(activitiesPath, function success(activities) {
        var activitiesReader = activities.createReader();
        activitiesReader.readEntries(getPlaylists = (activitiesFolders) => {
            activitiesFolders.forEach((activitiesFolder, folderIndex) => {
                if (activitiesFolder.isDirectory) {
                    // offlineActivitiesHTML += `
                    // <div class= "row mt-3 mb-3">
                    //     <div class="col-12">
                    //         <a href="offline-activity.html?activityPath=${activitiesFolder.nativeURL}" class="activityLink">
                    //             <h4 class="text-center" id="${activitiesFolder.nativeURL}">${activitiesFolder.name}</h4>
                    //         </a>
                    //     </div>
                    // </div>`;


                    counterid++;
                    counter++;
                    activityPath[counterid] = activitiesFolder.nativeURL;
                    console.log("counterid is..", counterid)
                    console.log("====", activityPath[counterid])
                    console.log("====", activityPath)
                    if (counter == 1) {
                        offlineActivitiesHTML += `<div class="grid-card-block">
                        <div class="grid-wrapper">`;
                    }
                    offlineActivitiesHTML += `
                    <div class="grid-card-box">
                        <img src="">
                        <div class="description">
                            <a href="offline-activity.html?activityPath=${activitiesFolder.nativeURL}" class="activityLink">
                                <h5 id="${activitiesFolder.nativeURL}">${activitiesFolder.name}</h5>
                            </a>
                        </div>
                    </div>`;

                    if (counter == 2) {
                        offlineActivitiesHTML += '</div></div>';
                        counter = 0;
                    }
                    $("#offlineActivitiesContainer").html(offlineActivitiesHTML);


                } else {
                    // ------ Project.json address here -----
                    // variable = playlistFolder
                    console.log(activitiesFolder)
                }
            });
            console.log("activity path", activityPath);
            window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
                console.log('file system open: ' + fs.name);
                createFile(fs.root, "offlineactivity.txt", false, activityPath);
            }, onErrorLoadFs = (err) => { console.log(err) });



            function createFile(dirEntry, fileName, isAppend, data) {
                // Creates a new file or returns the file if it already exists.
                dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {
                    writeFile(fileEntry, data);
                }, onErrorCreateFile = (err) => { console.log(err) });
            }

            function writeFile(fileEntry, dataObj) {
                // Create a FileWriter object for our FileEntry (log.txt).
                var data = dataObj = new Blob([dataObj], { type: 'application/json' });
                console.log("data...", data)
                console.log("data object is---", dataObj)
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = function() {
                        console.log("Successful file write..." + this.result);
                    };
                    fileWriter.onerror = function(e) {
                        console.log("Failed file write: ", e);
                    };
                    // If data object is not passed in,
                    // create a new Blob instead.
                    if (!dataObj) {
                        dataObj = new Blob([dataObj], { type: 'text/plain' });
                    }
                    fileWriter.write(data);
                });
            }

            $('.activityLink').on('click', (e) => {
                e.preventDefault();
                var activityPath = e.target.id;
                console.log("av", activityPath)
                window.resolveLocalFileSystemURL(activityPath, function success(activities) {
                    var activitiesReader = activities.createReader();
                    activitiesReader.readEntries(getPlaylists = (activitiesFiles) => {
                        activitiesFiles.forEach((activitiesFile) => {
                            if (activitiesFile.isFile) {
                                // return false
                                if (activitiesFile.name.includes("h5p.json")) {
                                    console.log("file>>>>", activitiesFile);
                                    // var activityName = activitiesFile.name.split(".")
                                    // moveFile(activitiesFile.nativeURL, activityName[0], activityPath);
                                    window.location.href = `offline-activity.html?activityPath=${activitiesFile.nativeURL}`
                                }
                            } else {
                                // ------ Project.json address here -----
                                // variable = playlistFile
                                console.log("activities files...", activitiesFile);
                                // activityPath[counterid] = activitiesFolder.nativeURL;
                            }
                        });
                    });
                });
            });

            function moveFile(fileUri, name, activityPath) {
                window.resolveLocalFileSystemURL(fileUri,
                    function(fileEntry) {
                        newFileUri = activityPath;
                        oldFileUri = fileUri;
                        fileExt = "." + "zip";

                        newFileName = name + fileExt;
                        window.resolveLocalFileSystemURL(newFileUri,
                            function(dirEntry) {
                                // move the file to a new directory and rename it
                                fileEntry.moveTo(dirEntry, newFileName, successCallback = (evt) => {
                                    processZip(evt.nativeURL, newFileUri + name);
                                }, errorCallback);
                            },
                            errorCallback = (err) => { console.log(err) }
                        );
                    },
                    errorCallback = (err) => { console.log(err) }
                );
            }

            function processZip(zipSource, destination) {
                // Handle the progress event
                var progressHandler = function(progressEvent) {
                    var percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    console.log(percent + "%");
                    if (percent == 100) {
                        // removeDependencies(destination);
                        console.log(destination);
                        setTimeout(() => {
                            window.location.href = `offline-activity.html?activityPath=${destination}`;
                        }, 1000);
                    }
                };
                // Proceed to unzip the file
                window.zip.unzip(zipSource, destination, (status) => {
                    if (status == 0) {
                        console.log("Files succesfully decompressed");
                        window.resolveLocalFileSystemURL(zipSource,
                            function(fileEntry) {
                                fileEntry.remove(
                                    function() {
                                        console.log('File is removed.');
                                    },
                                    function(error) {
                                        console.log('Unable to remove file. ' + error);
                                    }
                                );
                            },
                            function(error) { console.log(error) }
                        );
                    }
                    if (status == -1) {
                        console.error("Oops, cannot decompress files");
                    }
                }, progressHandler);
            }

            function removeDependencies(path) {
                window.resolveLocalFileSystemURL(path, (dir) => {
                    var dirReader = dir.createReader();
                    dirReader.readEntries(getAllDependencies = (allDirectories) => {
                        allDirectories.forEach((allDirectory) => {
                            if (allDirectory.isDirectory) {
                                if (allDirectory.name != "content") {
                                    allDirectory.removeRecursively(() => {
                                        console.log("directory deleted");
                                    }, (err) => {
                                        console.log("error", err);
                                    });
                                }
                            } else {
                                // console.log("folder", activitiesH5pFile)
                            }
                        })
                    })
                })
            }
        });
    });
}