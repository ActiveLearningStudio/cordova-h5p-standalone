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
    console.log('file', $(evt.target).data('course'));
    let projectId = evt.target.id,
    projectName = evt.target.name,
    course =  $(evt.target).data('course'),
    contentId =  $(evt.target).data('content');
    let mp4_file = course.split(',');
    let mp4_id = contentId.split(',');
    let filePath = [];
    for(var i = 0; i < mp4_file.length; i++){
      filePath.push(`${mp4_id[i]}/${mp4_file[i]}`)
    }
    console.log('filePath', filePath);
    updateAddCourse(projectId, projectName,filePath, fileSystem); 
  });
}
