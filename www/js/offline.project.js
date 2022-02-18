document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  var fileSystem = "";
  switch (device.platform) {
    case "iOS":
      fileSystem = cordova.file.dataDirectory;
      break;
    case "Android":
      fileSystem = cordova.file.externalDataDirectory;
      break;
  }
  window.resolveLocalFileSystemURL(
    fileSystem + "projects/", (directoryEntry) => {
      //read Projects Folder
      var directoryReader = directoryEntry.createReader();
      directoryReader.readEntries(entryHandler, errorHandler);
      function entryHandler(entries) {
        var offlineCoursesProgress = [];
        if (localStorage.getItem("offlineCoursesProgress") !== null) {
          offlineCoursesProgress = JSON.parse(
            localStorage.getItem("offlineCoursesProgress")
          );
        }
        var offlineProjectHTML = "";
        entries.forEach(function (entry) {
          if (entry.isDirectory) {
            var projectDirectoryReader = entry.createReader();
            projectDirectoryReader.readEntries((projectEntryHandler) => {
              getProjectsJson(projectEntryHandler);
                  if (projectEntryHandler.isFile) {
                    let path = projectEntryHandler.nativeURL.replace(projectEntryHandler.name, "playlists");
                    offlineProjectSection(projectEntryHandler, path)
                  }
            });
          }
        });
      }
      function errorHandler(error) {
        console.log("ERROR", error);
      }
    },
    function error(e) {
      console.log("resolving directory error");
      console.log(e);
    }
  );

  $(document).on('click', ".remove-project", (evt) => {
    console.log("id", evt.target.id);
    let projectPath = evt.target.id.replace("playlists", "");
    window.resolveLocalFileSystemURL(projectPath, (entry) => {
      entry.removeRecursively(() => {
        alert("removed");
        window.location.reload();
      })
    }, (err) => {console.log(err)});
  })

  const getProjectsJson = (projectsFolder) => {
    for (const projectJson of projectsFolder) {
      let path = projectJson.nativeURL.replace(projectJson.name, "playlists");
      projectJson.isFile && offlineProjectSection(projectJson.nativeURL, path)
    }
  }

  const offlineProjectSection = (projectJsonPath, path) => {
    new DownloadCourseHtml(projectJsonPath, path, (offlineHtml) => {
      $("#offlineProjectContainer").append(offlineHtml);
    });
  }

  function moveFile(fileUri, name) {
    window.resolveLocalFileSystemURL(
      fileUri,
      function (fileEntry) {
        newFileUri = fileSystem + "downloaded-activities/";
        oldFileUri = fileUri;
        fileExt = "." + "zip";

        newFileName = name + fileExt;
        window.resolveLocalFileSystemURL(
          newFileUri,
          function (dirEntry) {
            // move the file to a new directory and rename it
            fileEntry.moveTo(
              dirEntry,
              newFileName,
              (successCallback = (evt) => {
                processZip(evt.nativeURL, fileSystem + "h5p-libraries/" + name);
                setTimeout(() => {
                  removeDependencies(fileSystem + "h5p-libraries/" + name);
                }, 3000);
              }),
              errorCallback
            );
          },
          (errorCallback = (err) => {
            console.log(err);
          })
        );
      },
      (errorCallback = (err) => {
        console.log(err);
      })
    );
  }

  function processZip(zipSource, destination) {
    // Handle the progress event
    var progressHandler = function (progressEvent) {
      var percent = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      console.log(percent + "%");
    };
    // Proceed to unzip the file
    window.zip.unzip(
      zipSource,
      destination,
      (status) => {
        if (status == 0) {
          console.log("Files succesfully decompressed");
          window.resolveLocalFileSystemURL(
            zipSource,
            function (fileEntry) {
              fileEntry.remove(
                function () {
                  console.log("File is removed.");
                },
                function (error) {
                  console.log("Unable to remove file. " + error);
                }
              );
            },
            function (error) {
              console.log(error);
            }
          );
        }
        if (status == -1) {
          console.error("Oops, cannot decompress files");
        }
      },
      progressHandler
    );
  }

  function removeDependencies(path) {
    window.resolveLocalFileSystemURL(path, (dir) => {
      var dirReader = dir.createReader();
      dirReader.readEntries(
        (getAllDependencies = (allDirectories) => {
          allDirectories.forEach((allDirectory) => {
            if (allDirectory.isDirectory) {
              if (allDirectory.name != "content") {
                allDirectory.removeRecursively(
                  () => {
                    console.log("directory deleted");
                  },
                  (err) => {
                    console.log("error", err);
                  }
                );
              }
            } else {
              // console.log("folder", activitiesH5pFile)
            }
          });
        })
      );
    });
  }

  function readJsonFile(filePath) {
    window.resolveLocalFileSystemURL(filePath, function success(fileEntry) {
      fileEntry.file(
        function (file) {
          var reader = new FileReader();
          reader.onloadend = function () {
            return JSON.parse(this.result);
          };
          reader.readAsText(file);
        },
        (onErrorReadFile = (err) => {
          console.log(err);
        })
      );
    });
  }

  document.addEventListener("offline", onOffline, false);
  document.addEventListener("online", onOnline, false);
  var dataFileEntry;

  function onOnline() {
    // Handle the online event
    var networkState = navigator.connection.type;
    window.requestFileSystem(
      window.TEMPORARY,
      5 * 1024 * 1024,
      function (fs) {
        fs.root.getFile(
          "newTempFile.txt",
          { create: false, exclusive: false },
          function (fileEntry) {
            readFile(fileEntry);
          },
          (onErrorCreateFile = (err) => {
            console.log(err);
          })
        );
      },
      (onErrorLoadFs = (err) => {
        console.log(err);
      })
    );
  }

  function onOffline() {
    // Handle the offline event
    var data;
    console.log("lost connection");
    H5P.externalDispatcher.on("xAPI", function (event) {
      switch (event.getVerb()) {
        case "completed":
          var obtainedScores = event.getScore(),
            maxScores = event.getMaxScore(),
            uuid = device.uuid;
          data = {
            obtainedScore: obtainedScores,
            maxScores: maxScores,
            uuid: uuid,
          };
          const stringData = JSON.stringify(data);
          window.requestFileSystem(
            window.TEMPORARY,
            5 * 1024 * 1024,
            function (fs) {
              console.log("file system open: " + fs.name);
              createFile(fs.root, "newTempFile.txt", false, data);
            },
            (onErrorLoadFs = (err) => {
              console.log(err);
            })
          );
          break;
      }
    });
  }

  function createFile(dirEntry, fileName, isAppend, data) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(
      fileName,
      { create: true, exclusive: false },
      function (fileEntry) {
        writeFile(fileEntry, data);
      },
      (onErrorCreateFile = (err) => {
        console.log(err);
      })
    );
  }

  function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
      fileWriter.onwriteend = function () {
        console.log("Successful file write..." + this.result);
      };
      fileWriter.onerror = function (e) {
        console.log("Failed file write: " + e.toString());
      };
      // If data object is not passed in,
      // create a new Blob instead.
      if (!dataObj) {
        dataObj = new Blob([stringData], { type: "text/plain" });
      }
      fileWriter.write(dataObj);
    });
  }

  function readFile(fileEntry) {
    fileEntry.file(
      function (file) {
        var reader = new FileReader();
        reader.onloadend = function () {
          console.log("Successful file read: " + this.result);
          // console.log(fileEntry.fullPath + ": " + this.result);
          var data = JSON.parse(this.result);
          console.log(data);
          $.ajax({
            url: "https://seminary-tools.000webhostapp.com/api/save_data.php",
            data: data,
            success: function (result) {
              console.log(result);
            },
          });
        };
        reader.readAsText(file);
      },
      (onErrorReadFile = (err) => {
        console.log(err);
      })
    );
  }
}
