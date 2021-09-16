document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + "h5p-libraries/", function success(directoryEntry) {
    //     //read file
    //     var directoryReader = directoryEntry.createReader();

    //     directoryReader.readEntries(
    //         entryHandler,
    //         errorHandler
    //     );
    //     function entryHandler(entries) {
    //         entries.forEach(function (entry) {
    //           if (entry.isDirectory) {
    //             window.resolveLocalFileSystemURL(entry.nativeURL, function success(subDirectoryEntry) {
    //               // function readFile(fileEntry) {
    //                 var subDirectoryReader = subDirectoryEntry.createReader();
    //                 subDirectoryReader.readEntries(getSubDirectory = (subEntries) => {
    //                   subEntries.forEach((subEntry) => {
    //                     if(subEntry.isDirectory) {
    //                       // console.log(subEntry.nativeURL, " -- ", cordova.file.externalDataDirectory)
    //                       window.resolveLocalFileSystemURL(subEntry.nativeURL, function success(fileEntry) {
    //                         var fileEntry = fileEntry.createReader();
    //                         fileEntry.readEntries(getSubDirectory = (files) => {
    //                           files.forEach((file) => {
    //                             if(file.isDirectory) {
    //                               // console.log(file)
    //                             } else {
    //                               // console.log("file", file)
    //                             } 
    //                           }) 
    //                         })
    //                       })
    //                     } else {
    //                       // console.log("file", subEntry)
    //                     }
    //                   })
    //                 }, onErrorReadFile = (err) => {console.log(err)});
    //               })
    //           } else {
    //           }
        
    //         });
        
    //       }
    //       function errorHandler(error) {
        
    //         console.log("ERROR", error);
        
    //       }
        
    // }, function error(e) { console.log('resolving directory error'); console.log(e);  });
    
    // if (externalDirectory) {
  //     let json = '';
  //     window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + "h5p-libraries/quiz/h5p.json/", function success(fileEntry) {
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
        // if (networkState !== Connection.NONE) {
        //     if (dataFileEntry) {
        //         tryToUploadFile();
        //     }
        // }
        // display('Connection type: ' + networkState);
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
    // function tryToUploadFile() {
    //     // !! Assumes variable fileURL contains a valid URL to a text file on the device,
    //     var fileURL = getDataFileEntry().toURL();
    //     getFileBlobSomehow(fileURL, function(fileBlob) {
    //         var success = function (r) {
    //             console.log("Response = " + r.response);
    //             display("Uploaded. Response: " + r.response);
    //         };
    
    //         var fail = function (error) {
    //             console.log("An error has occurred: Code = " + error.code || error.status);
    //             offlineWrite("Failed to upload: some offline data");
    //         }
    
    //         var xhr = new XMLHttpRequest();
    
    //         xhr.onerror = fail;
    //         xhr.ontimeout = fail;
    //         xhr.onload = function() {
    //             // If the response code was successful...
    //             if (xhr.status >= 200 && xhr.status < 400) {
    //                 success(xhr);
    //             }
    //             else {
    //                 fail(xhr)
    //             }
    //         }
    
    //         // Make sure you add the domain of your server URL to the
    //         // Content-Security-Policy <meta> element in index.html.
    //         xhr.open("POST", encodeURI(SERVER));
    
    //         xhr.setRequestHeader("Content-Type", "text/plain");
    
    //         // The server request handler could read this header to
    //         // set the filename.
    //         xhr.setRequestHeader("X-Filename", fileURL.substr(fileURL.lastIndexOf("/") + 1));
    
    //         xhr.send(fileBlob);
    //     });
    // };

    // function offlineWrite(offlineData) {
    //     // Create a FileWriter object for our FileEntry.
    //     dataFileEntry.createWriter(function (fileWriter) {
    
    //         fileWriter.onwriteend = function () {
    //             console.log("Successful file write...");
    //             display(offlineData);
    //         };
    
    //         fileWriter.onerror = function (e) {
    //             console.log("Failed file write: " + e.toString());
    //         };
    
    //         fileWriter.write(offlineData);
    //     });
    // }

    // var dataFileEntry;
    // function createSomeData() {
    //     window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
    //         console.log('file system open: ' + fs.name);
    //         // Creates a new file or returns an existing file.
    //         fs.root.getFile("data.txt", { create: true, exclusive: false }, function (fileEntry) {
    //             dataFileEntry = fileEntry;
    //         }, onErrorCreateFile);
    //     }, onErrorLoadFs);
    // }
    const offlineElement = document.getElementById('h5p-container');
    const options = {
        // h5pJsonPath:  "../activities/sample",
        h5pJsonPath:  cordova.file.externalDataDirectory + "h5p-libraries/quiz",
        frameJs: '../plugins/h5p-standalone/dist/frame.bundle.js',
        frameCss: '../plugins/h5p-standalone/dist/styles/h5p.css',
    }
    new H5PStandalone.H5P(offlineElement, options);
    // }
}