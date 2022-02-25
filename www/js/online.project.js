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

  getProjects("preview", (project) => {
    const courseWrapper = new CourseHtml(project.projects);
    $("#online-project-container").html(courseWrapper.courseWrapper);
  });

  $(document).on("click", ".download-project", (evt) => {
    let projectId = evt.target.id;
    downloadProject(projectId, (project) => {
      downloadProjectZip(project, fileSystem, (filePath) => {
        setTimeout(() => {
          deleteProject(filePath, (response) => {
            console.log("🚀 ~ file: online.project.js ~ line 24 ~ deleteProject ~ response", response)
            if (response == 1) {
              let downloadMessage = new DownloadCourseAlertHtml()
              $(".remove-course-alert").html(downloadMessage.alertContent);
            }
            // window.location.reload();
          });
        }, 200);
      });
    });
  });
}
