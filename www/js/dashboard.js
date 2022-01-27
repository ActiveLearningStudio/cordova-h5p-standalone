document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

 

    var fileSystem = '';
    switch (device.platform) {
        case "iOS":
            fileSystem = cordova.file.dataDirectory;
            break;
        case "Android":
            fileSystem = cordova.file.externalDataDirectory;
            break;
    }

    const localStorage = window.localStorage,
        token = localStorage.getItem("USER_TOKEN"),
        userID = localStorage.getItem("USER_ID"),
        adminToken = localStorage.getItem("ADMIN_TOKEN"),
        customApiToken = localStorage.getItem("CUSTOM_API_TOKEN"),
        courseContainer = $("#courseContainer"),
        currikiToken = localStorage.getItem("CURRIKI_TOKEN"),
        moodleBaseURL = localStorage.getItem("MOODLE_BASE_API_URL"),
        currikiBaseURL = localStorage.getItem("CURRIKI_BASE_API_URL"),
        imageUrl = localStorage.getItem("CURRIKI_BASE_IMAGE_URL"),
        limit = 0,
        offset = 0;
    if (token) {
        handleDashboard(token, limit, offset);
        
    } else {
        window.location.href = 'index.html';
    }

    async function getCourses(response){
        console.log("Test Api res-->", response);

        let projectIds = [];
        let promises = [];

        await response.forEach(course => {
            let request = $.ajax({
                url: moodleBaseURL,
                type: "get",
                data: {
                    "moodlewsrestformat": "json",
                    "course_id": course.id,
                    "wsfunction": "local_curriki_moodle_plugin_fetch_project",
                    "wstoken": customApiToken
                },
                success: (project) => {
                    console.log({projectid:project.projectid})
                    projectIds.push(project.projectid);
                }
            });
            promises.push( request);
        })
        $.when.apply(null, promises).done(function(){
            console.log("projectIds", projectIds);
            let obj = {
                "project_id": projectIds
            }
            console.log("obj",obj);
            $.ajax({
                url: `${currikiBaseURL}suborganization/1/projects/by-ids`,
                headers: {
                    Authorization: "Bearer " + currikiToken,
                },
                type: "POST",
                data: obj,
                
                success: (projects) => {
                    console.log({courseWraper});
                    var courseWraper = '<div class="row">',
                    counter = 0;
                    console.log("courseContainer", courseContainer);
                    projects.forEach(course => {
                        counter++;
                        if (counter == 1) {
                            courseWraper += `<div class="grid-card-block">
                            <div class="grid-wrapper">`;
                        }
                    courseWraper += `
                                <div class="grid-card-box">
                                    <img src="${course.thumb_url.includes('https') ? course.thumb_url : imageUrl+course.thumb_url}">
                                   
                                    <div class="description">
                                        <a href="playlist.html?courseId=${course.id}">
                                            <h5>${course.name}</h5>
                                        </a>   
                                        <div class="progress mt-0 mb-2" style="width: 100% !important; height:8px !important">
                                        <div class="progress-bar" role="progressbar" style="width:0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>                          
                                    <button type="button" id="downloadProject" data-course-id="${course.id}" class="btn btn-primary">Download</button>                         
                                    </div>
                                </div>`;
                        if (counter == 2) {
                            courseWraper += '</div></div>';
                            counter = 0;
                        }
                    });
                    // localStorage.setItem('courses', courses);
                    courseWraper += '</div>';
                    courseContainer.html(courseWraper);
                }
            });
            
        });

        // console.log("INSIDE TEST API");
        // let obj = {
        //     "project_id": ["2093", "7443", "7479"]
        // }
        // $.ajax({
        //     type: "POST",
        //     url: `${currikiBaseURL}suborganization/1/projects/by-ids`,
        //     headers: {
        //         Authorization: "Bearer " + currikiToken,
        //     },
        //     dataType: 'json',
        //     data: obj,
        //     success: (resposne) =>{
        //         console.log('resposne', resposne);
        //     }
        // }) 
    }

    function handleDashboard(token, limit, offset) {
        $.ajax({
            url: moodleBaseURL,
            data: {
                "wstoken": adminToken,
                "moodlewsrestformat": "json",
                "wsfunction": "core_enrol_get_users_courses",
                "userid": userID
            },
            success: (response) => {
                console.log("RESP--->", response);
                var courses=[];
                offset = response.nextoffset;
                var courseWraper = '<div class="row">',
                    counter = 0;
                    var coursesProgress = [];
                    if (localStorage.getItem("coursesProgress") === null || localStorage.getItem("coursesProgress").length != response.length) {
                        response.forEach(course => {
                            coursesProgress.push({'id': course.id, progress : 0, activities : [], completed_activities : []});
                        });
                        localStorage.setItem("coursesProgress", JSON.stringify(coursesProgress));
                    } else {
                        coursesProgress = JSON.parse(localStorage.getItem('coursesProgress'));
                    }
                    getCourses(response);

                    // response.forEach(course => {
                    // courses.push(course.id);
                    // var progress = coursesProgress[coursesProgress.findIndex((obj => obj.id == course.id))].progress;
                    // counter++;
                    // if (counter == 1) {
                    //     courseWraper += `<div class="grid-card-block">
                    //     <div class="grid-wrapper">`;
                    // }
                    // courseWraper += `
                    // <div class="grid-card-box">
                    //     <img src="${course.courseimage}">

                    //     <div class="description">
                    //         <a href="playlist.html?courseId=${course.id}">
                    //             <h5>${course.fullname}</h5>
                    //         </a>   
                    //         <div class="progress mt-0 mb-2" style="width: 100% !important; height:8px !important">
                    //            <div class="progress-bar" role="progressbar" style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
                    //         </div>                          
                    //       <button type="button" id="downloadProject" data-course-id="${course.id}" class="btn btn-primary">Download</button>                         
                    //     </div>
                    // </div>`;
                    // //set image in localstorage
                    // localStorage.setItem(course.id, course.courseimage);
                    // if (counter == 2) {
                    //     courseWraper += '</div></div>';
                    //     counter = 0;
                    // }
                    // });
                localStorage.setItem('courses', courses);
                courseWraper += '</div>';
                courseContainer.html(courseWraper);
            }
        })
    }

    $(document).on('click', "#downloadProject", (e) => {
        var courseID = e.target.getAttribute("data-course-id");
        if (courseID != null) {
            var spinnerOptions = { dimBackground: true };
            SpinnerPlugin.activityStart("Preparing for Download", spinnerOptions);
            $.ajax({
                url: `${currikiBaseURL}suborganization/1/projects/${courseID}/offline-project`,
                headers: {
                    Authorization: "Bearer " + currikiToken,
                },
                success: (res) => {
                    SpinnerPlugin.activityStop();
                    var getProjectpath = res.split('org'),
                        projectName = getProjectpath.join('org/api'),
                        downloadPath = projectName.replace("http", "https");
                    console.log("projectName>>>", downloadPath);
                    // return false;
                    var confirmation = confirm('The project is ready to download. Click OK to download');
                    if (confirmation) {
                        SpinnerPlugin.activityStart("Downloading...", spinnerOptions);
                        console.log("in download")
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
                        dl.Get(downloadPath);

                        function DownloaderSuccess() {
                            
                            // alert(fileSystem);
                            // modal.style.display = "none";
                            console.log("project>>", projectName);
                            // console.log("projectFull >>", fileSystem + "projects/" + projectName);
                            console.log("yej");
                            var fileName = projectName.split('exports/'),
                            name = fileName[1].split('.').slice(0, -1).join('.');
                            // console.log("nameee >>>", name); return false;
                            window.resolveLocalFileSystemURL(fileSystem + "projects/", (entry) => {
                                var reader = entry.createReader();
                                reader.readEntries(getProjects = (listProjects) => {
                                    console.log("list>>", listProjects);
                                })
                                entry.getDirectory(name, { create: true }, function (dirEntry) {
                                    console.log(dirEntry);
                                    processZip(fileSystem + "projects/" + fileName[1], dirEntry.nativeURL, projectName)
                                    SpinnerPlugin.activityStop();
                                }, onErrorGetDir = (err)=> {console.log("dir creating >>",err);});
                            }, (err) => { console.log(err) })
                            $("#myModalDownload").modal("show")
                            // var rootDirEntry = fileSystem + "projects/";
                            // console.log(rootDirEntry);
                            

                        }

                        function DownloaderError(err) {
                            console.log("download error: " + err);
                            alert("download error: " + err);
                        }
                    }
                }
            });
        }
    });
    $("#logout").on("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    // $("#myDownloads").on('click', (e) => {
    //     e.preventDefault();
    //     window.resolveLocalFileSystemURL(fileSystem + "projects", (entry) => {
    //         var projectReader = entry.createReader();
    //         projectReader.readEntries(getProjects = (listProjects) => {
    //             console.log(listProjects);
    //             if (listProjects.length <= 0) {
    //                 var dl = new download();
    //                 dl.Initialize({
    //                     fileSystem: fileSystem,
    //                     folder: "projects",
    //                     unzip: false,
    //                     remove: false,
    //                     timeout: 0,
    //                     success: DownloaderSuccess,
    //                     error: DownloaderError,
    //                 });
    //                 dl.Get("https://lnwebworks.com/updated-project.zip");

    //                 function DownloaderError(err) {
    //                     console.log("download error: " + err);
    //                 }

    //                 function DownloaderSuccess(evt) {
    //                     console.log("yej");

    //                     processZip(fileSystem + "projects/sample-project.zip", fileSystem + "projects")

    //                 }
    //             } else {
    //                 listProjects.forEach((project, folderIndex) => {
    //                     if (project.isDirectory) {
    //                         console.log(project);
    //                         return window.location.href = "offline-project.html";

    //                     } else {

    //                         moveFile(project.nativeURL, activityName[0], fileSystem + "projects");
    //                     }
    //                 })
    //             }
    //         });
    //     }, (err) => { console.log(err) })

    // });

    function processZip(zipSource, destination, projectName) {
        // Handle the progress event
        var progressHandler = function (progressEvent) {
            var percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);

            // function updateProgressBar(progressBar, value) {
            //     value = Math.round(value);
            //     progressBar.querySelector(".progress__fill").style.width = `${value}%`;
            //     progressBar.querySelector(".progress__text").textContent = `${value}%`;
            // }
            const myProgressBar = document.querySelector(".progress");
            // updateProgressBar(myProgressBar, percent);
            console.log(percent + "%");
            if (percent == 100) {
                var projectNameArr = projectName.split(".");
                setTimeout(() => {
                    $.ajax({
                        url: `${currikiBaseURL}project/delete/${projectNameArr[0]}`,
                        headers: {
                            Authorization: "Bearer " + currikiToken,
                        },
                        success: (res) => {
                            // console.log(res);
                            if (res == 1)
                                window.location.href = "offline-project.html";
                        }
                    });
                }, 2000);
            }
        }
        window.zip.unzip(zipSource, destination, (status) => {
            console.log("zip", zipSource, destination);
            if (status == 0) {
                console.log("Files succesfully decompressed");
                window.resolveLocalFileSystemURL(zipSource,
                    function (fileEntry) {
                        fileEntry.remove(
                            function () {
                                console.log('File is removed.');
                            },
                            function (error) {
                                alert('Unable to remove file.');
                            }
                        );
                    },
                    function (error) { console.log(error) }
                );
            }
            if (status == -1) {
                console.error("Oops, cannot decompress files");
            }
        }, progressHandler);
    }
}

function moveFile(fileUri, name, activityPath) {
    window.resolveLocalFileSystemURL(fileUri,
        function (fileEntry) {
            newFileUri = activityPath;
            oldFileUri = fileUri;
            fileExt = "." + "zip";

            newFileName = name + fileExt;
            console.log(newFileName);
            window.resolveLocalFileSystemURL(newFileUri,
                function (dirEntry) {
                    console.log(dirEntry);
                    // move the file to a new directory and rename it
                    fileEntry.moveTo(dirEntry, newFileName, successCallback = (evt) => {
                        processZip(evt.nativeURL, newFileUri + name);
                    }, errorCallback);
                },
                errorCallback = (err) => { console.log(err) }
            );
        },
        errorCallback = (err) => { console.log(err) }
    );

}