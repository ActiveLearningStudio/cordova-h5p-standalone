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
      downloadProjectZip(project, fileSystem);
      alert("Downloaded");
    });

  });

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
    const downloadCourseHtml = new DownloadCourseHtml(projectJsonPath, path, (offlineHtml) => {
      console.log("downloadCourseHtml", downloadCourseHtml);
      $(".offline-course-list").append(downloadCourseHtml.offlineProjectHTML);
    });
  }

  $(document).on('click', ".remove-project", (evt) => {
    console.log("id", evt.target.id);
    let projectPath = evt.target.id.replace("playlists", "");
    window.resolveLocalFileSystemURL(projectPath, (entry) => {
      entry.removeRecursively(() => {
        alert("removed");
      })
    }, (err) => {console.log(err)});
  })
}
