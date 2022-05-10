const imageBaseUrl = localStorage.getItem("CURRIKI_BASE_IMAGE_URL");
class CourseHtml {
  constructor(allCourses) {
    this.courseWrapper = "";
    var urls = [], contentId = [];
    allCourses.forEach((course) => {
      course.playlists
      course.playlists.forEach((data)=>{
        data.activities.forEach((url)=>{
          if(url.source_url && url.source_url.includes('videos/files')){
            urls.push(url.source_url);
            contentId.push(url.h5p_content_id);
          }
        })
      })
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
                <button class="btn green-btn download-project" data-content='${contentId}' data-course='${urls}' name="${course.name}" id="${
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
  console.log('path', path);
  function DownloaderSuccess() {
    var fileName = path.split("exports/"),
      name = fileName[1].split(".").slice(0, -1).join(".");
    window.resolveLocalFileSystemURL(
      fileSystem + "projects/",
      (entry) => {
        var reader = entry.createReader();
        reader.readEntries((listProjects) => {
        });
        entry.getDirectory(
          name,
          { create: true },
          (dirEntry) => {
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
                console.log("Unable to remove file.", error);
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
          let imgURL = projectJSON.thumb_url;
          this.offlineProjectHTML = `
              <div class="course-card">
                  <div class="card-head-wrap">
                      <img src="${imgURL.includes("https://") ? 'img/course-main-img.png' : imgURL}">
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
          <img src="img/Frame.svg" />
        </div>
        <p>
          This action will remove the downloaded course from your device but your progress will be saved in the Moodle Platform.
        </p>
        <p>Do you want to continue removing this course?</p>
        <button class="btn primary-btn confirm-remove mb-1 confirm-remove-btn">
          Yes, remove
        </button>
        <div></div>
        <button class="btn primary-btn cancel-remove mt-1">
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
          <img class="download-complete-icon" src="img/downloadcomplete.png" />
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
        <img src="img/reset-lock.svg" />
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
  }, onErrorCreateFile = (err) => {
      console.log(err);
    });
}

function writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {
      fileWriter.onwriteend = function() {
          console.log("Successful file write...");
      };
      fileWriter.onerror = function (e) {
          console.log("Failed file write: ", e);
      };
      // If data object is not passed in,
      // create a new Blob instead.
      if (!dataObj) {           
          dataObj = new Blob([stringData], { type: 'text/plain' });
      }
      fileWriter.write(dataObj);
  });
}

function readLoacalJsonFile(fileEntry, jsonData) {
  fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        // console.log("Successful file", this.result);
        jsonData(this.result);
      };
      reader.readAsText(file);
  }, onErrorReadFile = (err) => { console.log(err) });
}

const removeCourse = (projectPath) => {
  window.resolveLocalFileSystemURL(
    projectPath,
    (entry) => {
      entry.removeRecursively(() => {
        $(".remove-course-alert").html("");
        return true;
        window.location.reload();
      });
    },
    (err) => {
      console.log(err);
    }
  );
}

const updateAddCourse = async (projectId, projectName,course, fileSystem) => {
  let getProjectPath, getFullProjectPath;
  if(course.length > 0){
      for(var i = 0; i < course.length; i++){
        let name = course[i].split('#'),
        folderName = course[i].split('/')
        var dl = new download();
        dl.Initialize({
          fileSystem : 'file:///storage/emulated/0/Android/data/com.curriki.reader/cache/',
          folder: folderName[0],
          timeout: 0,
          success: DownloaderSuccess,
          error: DownloaderError,
        });
        dl.Get(`https://dev.currikistudio.org/api/storage/h5p/content/${name[0]}`);
        function DownloaderError(err) {
            console.log("download error: " + err);
        }
        function DownloaderSuccess(success) {
            console.log("yay!", success);
        }
      }
  }
  // var loading = $(".loading");
  // loading.delay(200).slideUp();
  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
    fs.root.getFile("all-downloads-activity.json", { create: false, exclusive: false }, function(fileEntry) {
      readLoacalJsonFile(fileEntry, (file) => {
        activities = JSON.parse(file);
        const inArray = new Promise((resolve, reject) => {
          activities.some((element,i) => {
            if (element.projectId == projectId) {
              getProjectPath = element.projectPath;
              getFullProjectPath = `${fileSystem}projects/${getProjectPath}`;
              resolve(getProjectPath);
              activities.splice(i, 1);               
            }
          });
        })
        
        handleDownloadProject(getFullProjectPath, projectId, fileSystem, (projectPath) => {
          activities.push({
            projectId: projectId, 
            projectName: projectName,
            projectPath: projectPath
          })
          writeFile(fileEntry, activities)
        });
      })
    }, onErrorReadFile = (err) => {
      console.log(err)
      window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
        handleDownloadProject(getFullProjectPath, projectId, fileSystem, (projectPath) => {
          
          let data = [{
            projectId: projectId, 
            projectName: projectName,
            projectPath: projectPath
          }];
          createFile(fs.root, "all-downloads-activity.json", false, data);
        });
      }, onErrorLoadFs = (err) => { console.log(err) });
    })
  })
}

function downloadImage(data) {
  console.log('data', data);
}


//store the activity score locally
const storeActivityScore = (contentId, score, maxScore, opened, finished, email) => {
  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
    fs.root.getFile("user-response-offline.json", { create: false, exclusive: false }, function(fileEntry) {
      readLoacalJsonFile(fileEntry, (file) => {
        activities = JSON.parse(file);
        const inArray = new Promise((resolve, reject) => {
          activities.some((element,i) => {
            if (element.contentId === contentId) {
              console.log('activity already played');
              return true
             }else{
              activities.push({
                contentId: contentId,
                score: score,
                maxScore: maxScore,
                opened: opened,
                finished: finished,
                time: "",
                email: email
              })
              return true;
             }
          });
          window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
            createFile(fs.root, "user-response-offline.json", false, activities);
          }, onErrorLoadFs = (err) => { console.log(err) });
        })
      })
    }, onErrorReadFile = (err) => {
      console.log(err)
      window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
        let data = [{
          contentId: contentId,
          score: score,
          maxScore: maxScore,
          opened: opened,
          finished: finished,
          time: "",
          email: email
        }];
        createFile(fs.root, "user-response-offline.json", false, data);
      }, onErrorLoadFs = (err) => { console.log(err) });
    })
  })
}

const handleDownloadProject = (getFullProjectPath,projectId, fileSystem, projectPath) => {
  if(getFullProjectPath){
    removeCourse(getFullProjectPath)
  }
  downloadProject(projectId, (project) => {
    downloadProjectZip(project, fileSystem, (filePath) => {
      setTimeout(() => {
        deleteProject(filePath, (response) => {
          if (response == 1) {
            let downloadMessage = new DownloadCourseAlertHtml()
            $(".remove-course-alert").html(downloadMessage.alertContent);
            var loading = $(".loading");
            loading.delay(200).slideUp();
            projectPath(filePath);
          }
          // window.location.reload();
        });
      }, 500);
    });
  });
}

//delete any file
const deleteFile = (fileName, callback) => {
  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
    fs.root.getFile("user-response-offline.json", { create: false }, function(fileEntry) {
      fileEntry.remove(function() {
        console.log("file deleted successfully");
        callback(true)
      }, function(error) {
        console.log(`Could not delete ${fileName} file. ` + JSON.stringify( error ));
      });
    });
  });
}
//append file data
const appendFile = (fileName, data, callback) => {
  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
    fs.root.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
        writeFile(fileEntry, data);
        callback(true)
    }, onErrorCreateFile = (err) => {
        console.log(err);
        callback(false)
    });
}, onErrorLoadFs = (err) => { console.log('err', err) });
}

// https://players.brightcove.net/6282550302001/default_default/index.min.js