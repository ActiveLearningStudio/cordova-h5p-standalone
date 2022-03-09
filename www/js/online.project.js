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

//   window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
//     fs.root.getFile("all-downloads-activity.json", { create: false, exclusive: false }, function(fileEntry) {
//       readLoacalJsonFile(fileEntry, (file) => {
//         // console.log("🚀 ~ file: online.project.js ~ line 16 ~ readLoacalJsonFile ~ file", file)
//         activities = JSON.parse(file);
//         console.log("🚀 ~ file: online.project.js ~ line 17 ~ readLoacalJsonFile ~ activities", activities)
//       });
//     })

// }, (onErrorLoadFs) => {console.error(onErrorLoadFs)});

  getProjects("preview", (project) => {
    const courseWrapper = new CourseHtml(project.projects);
    $("#online-project-container").html(courseWrapper.courseWrapper);
  });

  $(document).on("click", ".download-project", (evt) => {
    $(".main-wrap").append('<div class="loading"></div>')
    let projectId = evt.target.id,
    projectName = evt.target.name;
    updateAddCourse(projectId, projectName, fileSystem);
  });
}
