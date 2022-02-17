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

  const localStorage = window.localStorage,
    imageBaseUrl = localStorage.getItem("CURRIKI_BASE_IMAGE_URL");

  getProjects('dashboard', (projects) => {
    const coursesHtml = new CourseHtml(projects);
    $(".online-course-list").html(coursesHtml.courseWrapper);
  });

  $(document).on("click", ".download-project", (evt) => {
    let projectId = evt.target.id;
    downloadProject(projectId, (project) => {
      console.log(project);
      downloadProjectZip(project);
    });
  });

  const downloadProjectZip = (path) => {
    var dl = new download();
    dl.Initialize({
      fileSystem: fileSystem,
      folder: "projects",
      unzip: false,
      remove: false,
      timeout: 0,
      success: DownloaderSuccess,
      error: DownloaderError,
    });
    dl.Get(path);

    function DownloaderSuccess() {
      console.log("project>>", path);
      var fileName = path.split("exports/"),
        name = fileName[1].split(".").slice(0, -1).join(".");
      window.resolveLocalFileSystemURL(
        fileSystem + "projects/", (entry) => {
          var reader = entry.createReader();
          reader.readEntries(((listProjects) => {
              console.log("list>>", listProjects);
            })
          );
          entry.getDirectory(name, { create: true }, (dirEntry) => {
              console.log(dirEntry);
              processZip(fileSystem + "projects/" + fileName[1], dirEntry.nativeURL, name);
            },
            (onErrorGetDir = (err) => {
              console.log("dir creating >>", err);
            })
          );
        },
        (err) => {
          console.log(err);
        }
      );
      // $("#myModalDownload").modal("show");
    }

    function DownloaderError(err) {
      console.log("download error: " + err);
      alert("download error: " + err);
  }
  };

  function processZip(zipSource, destination, projectName) {
    // Handle the progress event
    var progressHandler = function (progressEvent) {
      var percent = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      const myProgressBar = document.querySelector(".progress");
      console.log(percent + "%");
      if (percent == 100) {
        var projectNameArr = projectName.split(".");
        setTimeout(() => {
          deleteProject(projectNameArr[0], (response) => {
            console.log(response);
          })
        }, 200);
      }
    };
    window.zip.unzip(zipSource,destination,
      (status) => {
      console.log("🚀 ~ file: dashboard.js ~ line 128 ~ processZip ~ status", status)
        console.log("zip", zipSource, destination);
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
                  alert("Unable to remove file.");
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

  // const checkOfflineCourses = () => {
    window.resolveLocalFileSystemURL(
      fileSystem + "projects/", (directoryEntry) => {
        let directoryReader = directoryEntry.createReader();
        directoryReader.readEntries(entryHandler, errorHandler);
        function entryHandler(entries) {
          if (entries.length > 0) {
            for (let i = 0; i < 2; i++) {
              window.resolveLocalFileSystemURL(entries[i].nativeURL, (project) => {
                let projectReader = project.createReader();
                projectReader.readEntries((projectsHandler) => {
                  getProjectsJson(projectsHandler);
                  
                  if (projectsHandler.isFile) {
                    console.log("🚀 ~ file: dashboard.js ~ line 161 ~ projectReader.readEntries ~ projectsHandler", projectsHandler)
                    let path = projectsHandler.nativeURL.replace(projectsHandler.name, "playlists");
                    offlineProjectSection(projectsHandler, path)
                  }
                }, (projectsErrorHandler) => {console.log(projectsErrorHandler)});
              })
            }
          }
        }
        function errorHandler(error) {
          console.log(error);
        }
      })
  // }

  const getProjectsJson = (projectsFolder) => {
    for (const projectJson of projectsFolder) {
      let path = projectJson.nativeURL.replace(projectJson.name, "playlists");
      projectJson.isFile && offlineProjectSection(projectJson.nativeURL, path)
    }
  }

  const offlineProjectSection = (projectJsonPath, path) => {
    let offlineProjectHTML = '';
    window.resolveLocalFileSystemURL(projectJsonPath, (fileEntry) => {
      fileEntry.file((file) => {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = function (evt) {
          let projectJSON = JSON.parse(evt.target.result);
          offlineProjectHTML += `
            <div class="course-card">
                <div class="card-head-wrap">
                    <img src="${projectJSON.thumb_url}">
                    <p style="background:transparent !important">
                        <a href="offline-playlist.html?playlistPath=${path}">${projectJSON.name}</a>
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
                        <button class="btn red-btn remove-project" id="${path}"><img src="img/delete-btn.svg"> Remove</button>
                    </div>
                </div>
            </div>`;
          $(".offline-course-list").append(offlineProjectHTML);
        }
      })
    })
  }

  $(document).on('click', ".remove-project", (evt) => {
    console.log("id", evt.target.id);
    let projectPath = evt.target.id.replace("playlists", "");
    window.resolveLocalFileSystemURL(projectPath, (entry) => {
      entry.removeRecursively(() => {
        alert("remoed");
      })
    }, (err) => {console.log(err)});
  })
}
