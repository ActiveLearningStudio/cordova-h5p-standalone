const imageBaseUrl = localStorage.getItem("CURRIKI_BASE_IMAGE_URL");
class CourseHtml {
  constructor(allCourses) {
    this.courseWrapper = "";
    allCourses.forEach((course) => {
      this.courseWrapper += `<div class="course-card">
            <div class="card-head-wrap">
              <img src="${
                course.thumb_url.includes("http")
                  ? course.thumb_url
                  : imageBaseUrl + "/" + course.thumb_url
              }" />
              <p><a href="playlist.html?projectId=${course.id}">${
        course.name
      }</a></p>
            </div>
            <div class="card-footer-wrap">
              <div class="text-list">
                <ul>
                  <li><a href="#">${course.playlist_count} Playlists</a></li>
                  <li><a href="#">${course.activities_count} Activities</a></li>
                </ul>
              </div>
              <div class="card-btn">
                <button class="btn green-btn download-project" id="${
                  course.id
                }">
                  <img src="img/download-vector.svg" /> Download
                </button>
              </div>
            </div>
          </div>`;
    });
  }
}

const downloadProjectZip = (path, fileSystem, filePath) => {
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
    var fileName = path.split("exports/"),
      name = fileName[1].split(".").slice(0, -1).join(".");
    window.resolveLocalFileSystemURL(
      fileSystem + "projects/",
      (entry) => {
        var reader = entry.createReader();
        reader.readEntries((listProjects) => {
          console.log("list>>", listProjects);
        });
        entry.getDirectory(
          name,
          { create: true },
          (dirEntry) => {
            console.log(dirEntry);
            processZip(
              fileSystem + "projects/" + fileName[1],
              dirEntry.nativeURL,
              name, 
              (zipExtracted) => {
                filePath(zipExtracted);
              }
            );
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

function processZip(zipSource, destination, projectName, zipExtracted) {
  // Handle the progress event
  var progressHandler = function (progressEvent) {
    var percent = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    );
    const myProgressBar = document.querySelector(".progress");
    console.log(percent + "%");
    if (percent >= 80) {
      var projectNameArr = projectName.split(".");
      zipExtracted(projectNameArr[0]);
    }
  };
  window.zip.unzip(
    zipSource,
    destination,
    (status) => {
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

class DownloadCourseHtml {
  constructor(projectJsonPath, path, offlineHtml) {
    // this.offlineProjectHTML;
    window.resolveLocalFileSystemURL(projectJsonPath, (fileEntry) => {
      fileEntry.file((file) => {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = function (evt) {
          let projectJSON = JSON.parse(evt.target.result);
          this.offlineProjectHTML = `
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
                              <li><a href="#">${projectJSON.playlist_count} Playlists</a></li>
                              <li><a href="#">${projectJSON.activities_count} Activities</a></li>
                          </ul>
                      </div>
                      <div class="card-btn">
                          <button class="btn transparent-red-btn remove-project" id="${path}"><img src="img/delete-btn.svg"> Remove</button>
                      </div>
                  </div>
              </div>`;
          offlineHtml(this.offlineProjectHTML);
        };
      });
    });
  }
}

class AlertHeader {
  constructor() {
    this.alertHeader = `
    <div class="mask"></div>
    <div
      class="alert-message-box"
      style="
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
        background: #ffffff;
        border-radius: 10px 10px 0px 0px;
      "
    >`
  }
}


class RemoveCourseAlertHtml extends AlertHeader {
  constructor() {
    super();
    this.alertContent = `${this.alertHeader}
      <div class="alert-wrap">
        <div class="alert-icon" onclick="window.location.reload()">
          <img src="img/wifi-not-connected.svg" />
        </div>
        <p>
          This action will remove the downloaded course from your device but your progress will be saved in the Moodle Platform.
        </p>
        <p>Do you want to continue removing this course?</p>
        <button class="btn primary-btn confirm-remove">
          Yes, remove
        </button>
        <button class="btn primary-btn cancel-remove">
          No, cancel
        </button>
      </div>
    </div>`
  }
}

class DownloadCourseAlertHtml extends AlertHeader {
  constructor() {
    super();
    this.alertContent = `${this.alertHeader}
      <div class="alert-wrap">
        <div class="alert-icon" onclick="window.location.reload()">
          <img src="img/wifi-not-connected.svg" />
        </div>
        <p>
          The course has been downloaded please check in the downloaded courses section
        </p>
        <button class="btn primary-btn" onclick="window.location.reload()">
          I Understand
        </button>
      </div>
    </div>
  </div>`
  }
}

class ResetPasswordAlertHtml extends AlertHeader {
  constructor() {
    super();
    this.alertContent = `${this.alertHeader}
    <div class="alert-wrap">
      <div class="alert-icon" onclick="window.location.reload()">
        <img src="img/wifi-not-connected.svg" />
      </div>
      <p>
        To reset your password please go to
        <a
          onclick="document.getElementById('reset-alert').classList.add('d-none'), 
          cordova.InAppBrowser.open('https://map-lms.curriki.org/login/forgot_password.php', '_blank', 'location=yes');"
        >
          map-lms.curriki.org
        </a>
      </p>
      <button
        class="btn primary-btn"
        onclick="document.getElementById('reset-alert').innerHTML = '';"
      >
        I understand
      </button>
    </div>
    </div>`;
  }
}

class NetworkWarnings extends AlertHeader {
  constructor() {
    super();
    this.alertContent = `${this.alertHeader}
      <div class="alert-wrap">
        <div class="alert-icon" onclick="window.location.reload()">
          <img src="img/wifi-not-connected.svg" />
        </div>
        <p>Please connect to wifi to Login in your account.</p>
        <button
          class="btn primary-btn"
          onclick="document.getElementById('network-warning').innerHTML('');"
        >
          I understand
        </button>
      </div>
    </div>`;
  }
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
          console.log("Successful file write...");
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

function readLoacalJsonFile(fileEntry) {
  fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        console.log("Successful file", this.result)
      };
      reader.readAsText(file);

  }, onErrorReadFile = (err) => { console.log(err) });
}