document.addEventListener('deviceready', onDeviceReady, false);
var H5P = window.H5P = window.H5P || {};
function onDeviceReady() {
    // if (externalDirectory) {
  //     let json = '';
  //     window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "h5p-libraries/quiz/h5p.json/", function success(fileEntry) {
  //     // function readFile(fileEntry) {

  //       fileEntry.file(function (file) {
  //           var reader = new FileReader();
    
  //           reader.onloadend = function() {
  //               console.log("Successful file read: " + this.result);
  //               // displayFileData(fileEntry.fullPath + ": " + this.result);
  //           };
    
  //           reader.readAsText(file);
            
  //           json = reader;
    
  //       }, onErrorReadFile = (err) => {console.log(err)});
  //   // }
  // })
  
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + "projects/", function success(directoryEntry) {
        //read Projects Folder
        var directoryReader = directoryEntry.createReader();
        directoryReader.readEntries(
            entryHandler,
            errorHandler
        );
        function entryHandler(entries) {
            var offlineProjectHTML = '';
            entries.forEach(function (entry) {
              if (entry.isDirectory) {
                //   -------- Sub Directory of Projects Folder ---------
                window.resolveLocalFileSystemURL(entry.nativeURL, function success(subDirectoryEntry) {
                    var subDirectoryReader = subDirectoryEntry.createReader();
                    subDirectoryReader.readEntries(getSubDirectory = (subEntries) => {
                      subEntries.forEach((subEntry) => {
                        if(subEntry.isDirectory) {
                            // ------- Main Project Folder --------
                          window.resolveLocalFileSystemURL(subEntry.nativeURL, function success(projects) {
                            var projectReader = projects.createReader();
                            projectReader.readEntries(getProjects = (projectFolderNFiles) => {
                                projectFolderNFiles.forEach((projectFolderNFile) => {
                                if(projectFolderNFile.isDirectory) {
                                    // ------ Playlist Folder -------
                                    window.resolveLocalFileSystemURL(projectFolderNFile.nativeURL, function success(playlist) {
                                        var playlistReader = playlist.createReader();
                                        playlistReader.readEntries(getPlaylists = (playlistFolders) => {
                                            playlistFolders.forEach((playlistFolder) => {
                                                if(playlistFolder.isDirectory) {
                                                    // ----- Activities Main Folder -----
                                                    window.resolveLocalFileSystemURL(playlistFolder.nativeURL, function success(activitiesContainer) {
                                                        var activitiesContainerReader = activitiesContainer.createReader();
                                                        activitiesContainerReader.readEntries(getActivitiesContainer = (activitiesFolderNPlaylistJson) => {
                                                            activitiesFolderNPlaylistJson.forEach((activitiesNPlaylistJson) => {
                                                                if(activitiesNPlaylistJson.isDirectory) {
                                                                    // --------- Activities ---------
                                                                    window.resolveLocalFileSystemURL(activitiesNPlaylistJson.nativeURL, function success(activities) {
                                                                        var activitiesReader = activities.createReader();
                                                                        activitiesReader.readEntries(getActivities = (activitiesFolders) => {
                                                                            activitiesFolders.forEach((activitiesFolder) => {
                                                                                if(activitiesFolder.isDirectory) {
                                                                                    // --------- Activities .h5p file ----------
                                                                                    window.resolveLocalFileSystemURL(activitiesFolder.nativeURL, function success(activitiesFiles) {
                                                                                        var activitiesFilesReader = activitiesFiles.createReader();
                                                                                        activitiesFilesReader.readEntries(getActivitiesFiles = (activitiesH5pFiles) => {
                                                                                            activitiesH5pFiles.forEach((activitiesH5pFile) => {
                                                                                                if(activitiesH5pFile.isFile) {
                                                                                                    if(activitiesH5pFile.name.includes(".h5p")) {
                                                                                                        var activityName = activitiesH5pFile.name.split(".")
                                                                                                        moveFile(activitiesH5pFile.nativeURL, activityName[0]);
                                                                                                    }
                                                                                                } else {
                                                                                                    // -------- If any folder inside activity folder will listed here ------
                                                                                                    // varible = activitiesH5pFile
                                                                                                } 
                                                                                            }) 
                                                                                        })
                                                                                    })
                                                                                } else {
                                                                                    // --------- If any file inside activities folder Address Here ---------
                                                                                    // variable = activitiesFolder
                                                                                } 
                                                                            }) 
                                                                        })
                                                                    })
                                                                } else {
                                                                    // --------- Playlist.json file Address Here ---------
                                                                    // variable = activitiesNPlaylistJson
                                                                    console.log(activitiesNPlaylistJson)
                                                                } 
                                                            }) 
                                                        })
                                                    })
                                                } else {
                                                    // ------ If any file inside playlist folder address here. -----
                                                    // variable = playlistFolder
                                                } 
                                            }) 
                                        })
                                    })
                                } else {
                                    // -------- project.json file address Here -------
                                    // variable = projectFolderNFile
                                        window.resolveLocalFileSystemURL(projectFolderNFile.nativeURL, function success(fileEntry) {
                                            fileEntry.file(function (file) {
                                                var reader = new FileReader();
                                                reader.onloadend = function(evt) {
                                                    // console.log("Successful file read: " + this.result);
                                                    console.log(JSON.parse(evt.target.result));
                                                    var projectJSON = JSON.parse(evt.target.result);
                                                    offlineProjectHTML += `
                                                    <div class= "row">
                                                        <div class="col-12">
                                                            <h4 class="text-center">${projectJSON.name}</h4>
                                                        </div>
                                                    </div>`;
                                                    $("#offlineProjectContainer").html(offlineProjectHTML);
                                                };
                                                reader.readAsText(file);
                                            }, onErrorReadFile = (err) => {console.log(err)});
                                        // }
                                    })
                                } 
                              }) 
                            })
                          })
                        } else {
                            // ------- Sub directory's file listing ---------
                            // variable = subEntry
                        }
                      })
                    }, onErrorReadFile = (err) => {console.log(err)});
                  })
              } else {}
            });
        }
        function errorHandler(error) {
            console.log("ERROR", error);
        }
    }, function error(e) { console.log('resolving directory error'); console.log(e);  });


    function moveFile(fileUri, name) {
        window.resolveLocalFileSystemURL(fileUri,
            function(fileEntry){
                newFileUri  = cordova.file.externalDataDirectory + "downloaded-activities/";
                oldFileUri  = fileUri;
                fileExt     = "." + "zip";

                newFileName = name + fileExt;
                window.resolveLocalFileSystemURL(newFileUri,
                    function(dirEntry) {
                        // move the file to a new directory and rename it
                        fileEntry.moveTo(dirEntry, newFileName, successCallback = (evt) => {
                            processZip(evt.nativeURL, cordova.file.externalDataDirectory + "h5p-libraries/" + name);
                            setTimeout(() => {
                                removeDependencies(cordova.file.externalDataDirectory + "h5p-libraries/" + name);
                            }, 3000);
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

    function readJsonFile(filePath) {
        window.resolveLocalFileSystemURL(filePath, function success(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function() {
                    return JSON.parse(this.result);
                };
                reader.readAsText(file);
            }, onErrorReadFile = (err) => {console.log(err)});
        })
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
        console.log("download");
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

    const offlineElement = document.getElementById('h5p-container');
    const options = {
        h5pJsonPath:  cordova.file.externalDataDirectory + "h5p-libraries/35382",
        frameJs: '../plugins/h5p-standalone/dist/mod.frame.bundle.js',
        frameCss: '../plugins/h5p-standalone/dist/styles/h5p.css',
    }
    new H5PStandalone.H5P(offlineElement, options);
    // }
}