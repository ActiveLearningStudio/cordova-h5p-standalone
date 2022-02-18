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
    
    getProjects('preview', (project) => {
        const courseWrapper = new CourseHtml(project);
        $("#online-project-container").html(courseWrapper.courseWrapper)
    })

    $(document).on("click", ".download-project", (evt) => {
        let projectId = evt.target.id;
        downloadProject(projectId, (project) => {
          console.log(project);
          downloadProjectZip(project, fileSystem);
          alert("Downloaded");
        });
      });
}