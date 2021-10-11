document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    getUrlParams = location.search.split("activitiesPath=");
    activitiesPath = getUrlParams[1];

    var offlineActivitiesHTML = '', counter = 0;
    window.resolveLocalFileSystemURL(activitiesPath, function success(activities) {
        var activitiesReader = activities.createReader();
        activitiesReader.readEntries(getPlaylists = (activitiesFolders) => {
            activitiesFolders.forEach((activitiesFolder, folderIndex) => {
                if(activitiesFolder.isDirectory) {
                    // offlineActivitiesHTML += `
                    // <div class= "row mt-3 mb-3">
                    //     <div class="col-12">
                    //         <a href="offline-activity.html?activityPath=${activitiesFolder.nativeURL}" class="activityLink">
                    //             <h4 class="text-center" id="${activitiesFolder.nativeURL}">${activitiesFolder.name}</h4>
                    //         </a>
                    //     </div>
                    // </div>`;

                    counter++;
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
            $('.activityLink').on('click', (e) => {
                e.preventDefault();
                var activityPath = e.target.id;
                console.log("av", activityPath)
                window.resolveLocalFileSystemURL(activityPath, function success(activities) {
                    var activitiesReader = activities.createReader();
                    activitiesReader.readEntries(getPlaylists = (activitiesFiles) => {
                        activitiesFiles.forEach((activitiesFile) => {
                            if(activitiesFile.isFile) {
                                console.log("file",activitiesFile);
                                if(activitiesFile.name.includes(".h5p")) {
                                    var activityName = activitiesFile.name.split(".")
                                    moveFile(activitiesFile.nativeURL, activityName[0], activityPath);
                                }
                            } else {
                                // ------ Project.json address here -----
                                // variable = playlistFile
                                console.log(activitiesFile);
                                window.location.href = `offline-activity.html?activityPath=${activitiesFile.nativeURL}`
                            } 
                        });
                    });
                });
            });
        
            function moveFile(fileUri, name, activityPath) {
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