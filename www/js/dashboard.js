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

  class CourseHtml {
    constructor(allCourses) {
      this.courseWrapper = "";
      allCourses.forEach((course) => {
        this.courseWrapper += `<div class="course-card">
            <div class="card-head-wrap">
              <img src="${imageBaseUrl}/${course.thumb_url}" />
              <p><a href="playlist.html?projectId=${course.id}">${course.name}</a></p>
            </div>
            <div class="card-footer-wrap">
              <div class="text-list">
                <ul>
                  <li><a href="#">4 Playlists</a></li>
                  <li><a href="#">30 Activities</a></li>
                </ul>
              </div>
              <div class="card-btn">
                <button class="btn green-btn download-project" id="${course.id}">
                  <img src="img/download-vector.svg" /> Download
                </button>
              </div>
            </div>
          </div>`;
      });
    }
  }

  getProjects((projects) => {
    const coursesHtml = new CourseHtml(projects);
    $(".course-list").html(coursesHtml.courseWrapper);
  });

  $(document).on("click", ".download-project", (evt) => {
    let projectId = evt.target.id;
    // processZip("file:///storage/emulated/0/Android/data/com.curriki.reader/files/projects/projects-620b7d5e451af.zip", "file:///storage/emulated/0/Android/data/com.curriki.reader/files/projects/projects-620b7d5e451af", "projects-620b7d5e451af");
    // window.resolveLocalFileSystemURL("file:///storage/emulated/0/Android/data/com.curriki.reader/files/projects/", (entry) => {
    //   let subDirectoryReader = entry.createReader();
    //   subDirectoryReader.readEntries((subEntries) => {
    //   console.log("🚀 ~ file: dashboard.js ~ line 55 ~ subDirectoryReader.readEntries ~ subEntries", subEntries)
    //   })
    // })
    // return false;
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
}
