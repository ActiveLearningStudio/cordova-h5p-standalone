document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
   var fileSystem = '';
    switch (device.platform) {
        case "iOS":
            fileSystem = cordova.file.dataDirectory;
        break;
        case "Android":
            fileSystem = cordova.file.externalDataDirectory;
        break;
    }
    window.resolveLocalFileSystemURL(fileSystem + "projects/", function success(directoryEntry) {
        //read Projects Folder


        var directoryReader = directoryEntry.createReader();
        directoryReader.readEntries(
            entryHandler,
            errorHandler
        );
        function entryHandler(entries) {
            var offlineCoursesProgress = [];
            if (localStorage.getItem("offlineCoursesProgress") !== null) {
                offlineCoursesProgress = JSON.parse(localStorage.getItem('offlineCoursesProgress'));
            }
            var counter = 0;
            var offlineProjectHTML = '';
            entries.forEach(function (entry) {
                console.log("Entriess>>>>", entry);
                if (entry.isDirectory) {
                    var projectDirectoryReader = entry.createReader();
                    projectDirectoryReader.readEntries(
                        projectEntryHandler,
                        projectErrorHandler
                    );

                    function projectEntryHandler(projectEntries) {
                        playlistPath = '';
                        projectEntries.forEach(function (entry) {
                            console.log(entry);
                            if (entry.isDirectory) {
                                if (entry.name == "playlists") {
                                    playlistPath = entry;
                                } 
                            }
                            else {
                                if (entry.name == "project.json") {
                                    var path = entry.nativeURL.replace(entry.name, "playlists");
                                    window.resolveLocalFileSystemURL(entry.nativeURL, function success(fileEntry) {
                                        fileEntry.file(function (file) {
                                            var reader = new FileReader();
                                            reader.onloadend = function(evt) {
                                                var projectJSON = JSON.parse(evt.target.result);
                                                var isRecordExist = offlineCoursesProgress[offlineCoursesProgress.findIndex((obj => obj.id == projectJSON.id))];
                                                var progress = isRecordExist ? isRecordExist.progress : 0;
                                                console.log("JSON >>>>>>>", projectJSON);
                                                if(offlineCoursesProgress[offlineCoursesProgress.findIndex((obj => obj.id == projectJSON.id))] == undefined) {
                                                    offlineCoursesProgress.push({'id': projectJSON.id, progress : 0, activities : [], completed_activities : []});
                                                    localStorage.setItem("offlineCoursesProgress", JSON.stringify(offlineCoursesProgress));
                                                }
                                                offlineProjectHTML += `
                                                <div class="course-card">
                                                    <div class="card-head-wrap">
                                                        <img src="${projectJSON.thumb_url}">
                                                        <p style="background:transparent !important">
                                                            <a href="offline-playlist.html?projectId=${projectJSON.id}">${projectJSON.name}</a>
                                                        </p>
                                                    </div>
                                                    <div class="card-footer-wrap">
                                                        <div class="text-list">
                                                            <ul>
                                                                <li><a href="#">4 Playlists</a></li>
                                                                <li><a href="#">30 Activities</a></li>
                                                            </ul>
                                                        </div>
                                                        <div class="card-btn">
                                                            <button class="btn red-btn"><img src="img/delete-btn.svg"> Remove</button>
                                                        </div>
                                                    </div>
                                                </div>`;
                                                $("#offlineProjectContainer").html(offlineProjectHTML);
                                            };
                                            reader.readAsText(file);
                                        }, onErrorReadFile = (err) => {console.log(err)});
                                    });
                                }
                            }
                        });
                    }
                    function projectErrorHandler(error) {
                        console.log("ERROR", error);
                    }
                    //   -------- Sub Directory of Projects Folder ---------
                }
            });
        }
        function errorHandler(error) {
            console.log("ERROR", error);
        }
    }, function error(e) { console.log('resolving directory error'); console.log(e);  });


    function moveFile(fileUri, name) {
        window.resolveLocalFileSystemURL(fileUri,
            function(fileEntry){
                newFileUri  = fileSystem + "downloaded-activities/";
                oldFileUri  = fileUri;
                fileExt     = "." + "zip";

                newFileName = name + fileExt;
                window.resolveLocalFileSystemURL(newFileUri,
                    function(dirEntry) {
                        // move the file to a new directory and rename it
                        fileEntry.moveTo(dirEntry, newFileName, successCallback = (evt) => {
                            processZip(evt.nativeURL, fileSystem+ "h5p-libraries/" + name);
                            setTimeout(() => {
                                removeDependencies(fileSystem+ "h5p-libraries/" + name);
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

    // const offlineElement = document.getElementById('h5p-container');
    // const options = {
    //     h5pJsonPath:  fileSystem+ "h5p-libraries/35382",
    //     frameJs: '../plugins/h5p-standalone/dist/mod.frame.bundle.js',
    //     frameCss: '../plugins/h5p-standalone/dist/styles/h5p.css',
    // }
    // new H5PStandalone.H5P(offlineElement, options);
    // }
}