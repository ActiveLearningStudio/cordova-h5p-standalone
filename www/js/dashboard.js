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
      $(".online-course-list").html("");
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

  if (navigator.connection.type !== "none") {
    getProjects("dashboard", (projects) => {
      const coursesHtml = new CourseHtml(projects.projects);
      $(".online-course-list").html(coursesHtml.courseWrapper);
    });
  }

  // const checkOfflineCourses = () => {
  window.resolveLocalFileSystemURL(
    fileSystem + "projects/",
    (directoryEntry) => {
      let directoryReader = directoryEntry.createReader();
      directoryReader.readEntries(entryHandler, errorHandler);
      function entryHandler(entries) {
        if (entries.length > 0) {
          $("#offline-see-all-link").removeClass("d-none");
          let length = entries.length >= 2 ? 2 : entries.length;
          for (let i = 0; i < length; i++) {
            window.resolveLocalFileSystemURL(
              entries[i].nativeURL,
              (project) => {
                // console.log("project", project);
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
            "<p class='no-project-message'>You have not downloads, start by selecting one of the available course below</p>"
          );
          $("#offline-see-all-link").addClass("d-none");
        }
      }
      function errorHandler(error) {
        console.log(error);
      }
    },
    (error) => {
      error &&
        $(".offline-course-list").html(
          "<p class='no-project-message'>You have not downloads, start by selecting one of the available course below</p>"
        ),
        $("#offline-see-all-link").addClass("d-none");
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
    let resetMessage = new RemoveCourseAlertHtml();
    $(".remove-course-alert").append(resetMessage.alertContent);
    const projectPath = evt.target.id.replace("playlists", "");

    $(document).on("click", ".confirm-remove", () => {
      window.resolveLocalFileSystemURL(
        projectPath,
        (entry) => {
          entry.removeRecursively(() => {
            $(".remove-course-alert").html("");
            window.location.reload();
          });
        },
        (err) => {
          console.log(err);
        }
      );
    });

    $(document).on("click", ".cancel-remove", () => {
      $(".remove-course-alert").html("");
    });
  });

  $(document).on("click", ".download-project", (evt) => {
    $(".main-wrap").append('<div class="loading"></div>')
    let projectId = evt.target.id,
    projectName = evt.target.name;
    course =  $(evt.target).data('course');
    let brightcove_file = course.split(','),
    ids = [];

    for(var i=0;i < brightcove_file.length; i++){
      if(!brightcove_file[i].includes('https')){
        ids.push(brightcove_file[i])
      }
    }
    updateAddCourse(projectId, projectName,ids, fileSystem);
  });
}
