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

  document.addEventListener(
    "offline",
    () => {
      $(".online-course-list").html('');
      $(".course-network-alert").removeClass("d-none");
    },
    false
  );

  document.addEventListener(
    "online",
    () => {
      $(".course-network-alert").addClass("d-none");
      getProjects("dashboard", (projects) => {
        const coursesHtml = new CourseHtml(projects.projects);
        $(".online-course-list").html(coursesHtml.courseWrapper);
      });
    },
    false
  );

  if(navigator.connection.type !== 'none') {
    getProjects("dashboard", (projects) => {
      const coursesHtml = new CourseHtml(projects.projects);
      $(".online-course-list").html(coursesHtml.courseWrapper);
    });
  }

  $(document).on("click", ".download-project", (evt) => {
    let projectId = evt.target.id;
    downloadProject(projectId, (project) => {
      console.log(project);
      downloadProjectZip(project, fileSystem);
    });
  });

  // const checkOfflineCourses = () => {
  window.resolveLocalFileSystemURL(
    fileSystem + "projects/",
    (directoryEntry) => {
      let directoryReader = directoryEntry.createReader();
      directoryReader.readEntries(entryHandler, errorHandler);
      function entryHandler(entries) {
        if (entries.length > 0) {
          let length = entries.length >= 2 ? 2 : entries.length;
          for (let i = 0; i < length; i++) {
            window.resolveLocalFileSystemURL(
              entries[i].nativeURL,
              (project) => {
                let projectReader = project.createReader();
                projectReader.readEntries(
                  (projectsHandler) => {
                    getProjectsJson(projectsHandler);

                    if (projectsHandler.isFile) {
                      let path = projectsHandler.nativeURL.replace(
                        projectsHandler.name,
                        "playlists"
                      );
                      offlineProjectSection(projectsHandler, path);
                    }
                  },
                  (projectsErrorHandler) => {
                    console.log(projectsErrorHandler);
                  }
                );
              }
            );
          }
        } else {
          $(".offline-course-list").html(
            "<p>You have not downloads, start by selecting one of the available course below</p>"
          );
        }
      }
      function errorHandler(error) {
        console.log(error);
      }
    }
  );
  // }

  const getProjectsJson = (projectsFolder) => {
    for (const projectJson of projectsFolder) {
      let path = projectJson.nativeURL.replace(projectJson.name, "playlists");
      projectJson.isFile && offlineProjectSection(projectJson.nativeURL, path);
    }
  };

  const offlineProjectSection = (projectJsonPath, path) => {
    new DownloadCourseHtml(projectJsonPath, path, (offlineHtml) => {
      $(".offline-course-list").append(offlineHtml);
    });
  };

  $(document).on("click", ".remove-project", (evt) => {
    console.log("id", evt.target.id);
    let projectPath = evt.target.id.replace("playlists", "");
    window.resolveLocalFileSystemURL(
      projectPath,
      (entry) => {
        entry.removeRecursively(() => {
          alert("removed");
          window.location.reload();
        });
      },
      (err) => {
        console.log(err);
      }
    );
  });
}
