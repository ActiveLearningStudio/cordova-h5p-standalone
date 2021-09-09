document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory + "h5p-libraries/", function success(directoryEntry) {
        //read file
        var directoryReader = directoryEntry.createReader();

        directoryReader.readEntries(
            entryHandler,
            errorHandler
        );
        function entryHandler(entries) {
            entries.forEach(function (entry) {
              if (entry.isDirectory) {
                window.resolveLocalFileSystemURL(entry.nativeURL, function success(subDirectoryEntry) {
                  // function readFile(fileEntry) {
                    var subDirectoryReader = subDirectoryEntry.createReader();
                    subDirectoryReader.readEntries(getSubDirectory = (subEntries) => {
                      subEntries.forEach((subEntry) => {
                        if(subEntry.isDirectory) {
                          // console.log(subEntry.nativeURL, " -- ", cordova.file.externalDataDirectory)
                          window.resolveLocalFileSystemURL(subEntry.nativeURL, function success(fileEntry) {
                            var fileEntry = fileEntry.createReader();
                            fileEntry.readEntries(getSubDirectory = (files) => {
                              files.forEach((file) => {
                                if(file.isDirectory) {
                                  // console.log(file)
                                } else {
                                  // console.log("file", file)
                                } 
                              }) 
                            })
                          })
                        } else {
                          // console.log("file", subEntry)
                        }
                      })
                    }, onErrorReadFile = (err) => {console.log(err)});
                  })
              } else {
              }
        
            });
        
          }
          function errorHandler(error) {
        
            console.log("ERROR", error);
        
          }
        
    }, function error(e) { console.log('resolving directory error'); console.log(e);  });
    
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