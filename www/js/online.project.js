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
    $(".main-wrap").append('<div class="loading"></div>')
    let projectId = evt.target.id;
    let projectName = evt.target.name;
    let data = [
      {
        projectId: projectId, 
        projectName: projectName
      }
    ]

    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
      fs.root.getFile("all-downloads-activity.json", { create: false, exclusive: false }, function(fileEntry) {
        readLoacalJsonFile(fileEntry, (file) => {
          activities = JSON.parse(file);
          activities.forEach((element,i)=>{ 
            if(element.projectId == projectId){
              console.log("File already exists");
              var loading = $(".loading");
              loading.delay(200).slideUp();
            }else{
              console.log("File not exists");
              var loading = $(".loading");
              loading.delay(200).slideUp();
              downloadProject(projectId, (project) => {
                downloadProjectZip(project, fileSystem, (filePath) => {
                  setTimeout(() => {
                    deleteProject(filePath, (response) => {
                      console.log("🚀 ~ file: online.project.js ~ line 24 ~ deleteProject ~ response", response)
                      if (response == 1) {
                        let downloadMessage = new DownloadCourseAlertHtml()
                        $(".remove-course-alert").html(downloadMessage.alertContent);
                        var loading = $(".loading");
                        loading.delay(200).slideUp();
                      }
                      // window.location.reload();
                    });
                  }, 200);
                });
              });
            }
            data.push(element)
          })
        })
      })
      console.log("all-downloads-activity.json file does not exists");
    })
  
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
      console.log("file craetion");
      createFile(fs.root, "all-downloads-activity.json", false, data);
    }, onErrorLoadFs = (err) => { console.log(err) });

    
    // data.forEach((element)=>{
    //   console.log("elements", element);
    //   if(element.projectId == projectId){
    //     console.log("File already downloaded");
    //     var loading = $(".loading");
    //     loading.delay(200).slideUp();
    //   }else{
    //     downloadProject(projectId, (project) => {
    //       downloadProjectZip(project, fileSystem, (filePath) => {
    //         setTimeout(() => {
    //           deleteProject(filePath, (response) => {
    //             console.log("🚀 ~ file: online.project.js ~ line 24 ~ deleteProject ~ response", response)
    //             if (response == 1) {
    //               let downloadMessage = new DownloadCourseAlertHtml()
    //               $(".remove-course-alert").html(downloadMessage.alertContent);
    //               var loading = $(".loading");
    //               loading.delay(200).slideUp();
    //             }
    //             // window.location.reload();
    //           });
    //         }, 200);
    //       });
    //     });
    //   }
    // })
    console.log("data",data);
  });
}
