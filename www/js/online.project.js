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
    // $(".main-wrap").append('<div class="loading"></div>')
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    let projectId = evt.target.id,
    projectName = evt.target.name,
    course =  $(evt.target).data('course'),
    contentId =  $(evt.target).data('content');
    let mp4_file, mp4_id, filePath = [];
    if(contentId.length > 0){
      mp4_file = course.split(',');
      mp4_id = contentId.split(',');
      for(var i = 0; i < mp4_file.length; i++){
        filePath.push(`${mp4_id[i]}/${mp4_file[i]}`)
      }
    }else{
      mp4_file = course
      mp4_id = contentId
      filePath.push(`${mp4_id}/${mp4_file}`)
    }
    updateAddCourse(projectId, projectName, filePath, fileSystem); 
  });
}
