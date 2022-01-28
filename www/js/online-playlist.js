document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var getUrlParams = location.search.split("courseId="),
    courseId = getUrlParams[1];
    console.log("courseId-->", courseId);

    var fileSystem = '';
    switch (device.platform) {
        case "iOS":
            fileSystem = cordova.file.dataDirectory;
            break;
        case "Android":
            fileSystem = cordova.file.externalDataDirectory;
            break;
    }

    var localStorage = window.localStorage,
    dashboardImage = localStorage.getItem(courseId),
    customApiToken = localStorage.getItem("CUSTOM_API_TOKEN"),
    moodleBaseURL = localStorage.getItem("MOODLE_BASE_API_URL"),
    currikiToken = localStorage.getItem("CURRIKI_TOKEN"),
    imageUrl = localStorage.getItem("CURRIKI_BASE_IMAGE_URL"),
    currikiBaseURL = localStorage.getItem("CURRIKI_BASE_API_URL");
    
    localStorage.setItem('activeCourse', courseId);
    document.getElementById('onlineImage').src = dashboardImage;
    console.log("dashboard image is", dashboardImage)
   
    $.ajax({
        url: `${currikiBaseURL}projects/${courseId}/playlists?skipContent=false`,
        headers: {
            Authorization: "Bearer " + currikiToken,
        },
        success: (response) => {
            var playlistContainer = $("#playlistContainer");
            var overviewContainer = $("#overviewContainer");
            var imageContainer = $("#onlineImageShow");

            var playlistHTML = "";
            var overviewHTML = "";
            var imageHTML= "";
                counter = 0, activities = [];
            
            overviewHTML +=     
                `<div>
                    <h3>Introduction to<br> ${response.playlists[0].project.name}</h3>
                    <p>${response.playlists[0].project.description}</p>

                    <button type="button" id="downloadProject" data-course-id="${courseId}" class="btn btn-primary">Download</button>      
                    
                </div>`;
            imageHTML += `<img src="${response.playlists[0].project.thumb_url.includes('https') ? response.playlists[0].project.thumb_url : imageUrl+response.playlists[0].project.thumb_url}" id="onlineImage">`

            response.playlists.forEach((element, index) => {
                // console.log("index--->", index);
                counter++;
                if (counter == 1) {
                    playlistHTML += `
                    <div class="grid-card-block">
                    <div class="grid-wrapper">`;
                }
                playlistHTML += `
                            <div class="grid-card-box">
                                <img src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png">
                                <div class="description">
                                    <a href="online-activities.html?playlistId=${element.id}">
                                        <h5>${element.title}</h5>
                                    </a>
                                </div>
                            </div>`;
                
                if (counter == 2) {
                    playlistHTML += `<div></div>`;
                    overviewHTML +=  `<div></div>`;
                    imageHTML +=  `<div></div>`;
                    counter = 0;
                }
            });
            var coursesProgress = JSON.parse(localStorage.getItem('coursesProgress'));
            var activeCourse = localStorage.getItem('activeCourse')
            response.playlists.forEach((element) => {
                element.activities.forEach((activity) => {
                    activities.push(activity.h5p_content.id);
                });
            });
            //Update object's property.
            // coursesProgress[coursesProgress.findIndex((obj => obj.id == activeCourse))].activities = activities;
            // localStorage.setItem('coursesProgress', JSON.stringify(coursesProgress));
            playlistContainer.html(playlistHTML);
            overviewContainer.html(overviewHTML);
            imageContainer.html(imageHTML);
        },
    });

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