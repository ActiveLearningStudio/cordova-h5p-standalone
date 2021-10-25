document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    console.log(device.platform);
    var fileSystem = '';
    switch (device.platform) {
        case "iOS":
            fileSystem = cordova.file.syncedDataDirectory;
        break;
        case "Android":
            fileSystem = cordova.file.externalDataDirectory;
        break;
    }
    var localStorage = window.localStorage,
    token = localStorage.getItem("token"),
    courseContainer = $("#courseContainer"),
    limit = 0, offset = 0;

    if (token) {
        handleDashboard(token, limit, offset)
    } else {
        window.location.href = 'index.html';
    }
    

    function handleDashboard(token, limit, offset) {
        $.ajax({
            url: "https://map-lms.curriki.org/webservice/rest/server.php?",
            data: {
                "wstoken": token,
                "moodlewsrestformat": "json",
                "wsfunction": "core_course_get_enrolled_courses_by_timeline_classification",
                "classification": "inprogress",
                "limit": limit,
                "offset": offset
            },
            success: (response) => {
                console.log(response)
                offset = response.nextoffset;
                var courseWraper = '<div class="row">',
                counter = 0;
                response.courses.forEach(course => {
                    counter++;
                    if (counter == 1) {
                        courseWraper += `<div class="grid-card-block">
                        <div class="grid-wrapper">`;
                    }
                    courseWraper += `
                    <div class="grid-card-box">
                        <img src="${course.courseimage}">
                        <div class="description">
                            <a href="playlist.html?courseId=${course.id}">
                                <h5>${course.fullname}</h5>
                            </a>
                            <button type="button" id="downloadProject" class="btn btn-primary">Download</button>
                        </div>
                    </div>`;

                    if (counter == 2) {
                        courseWraper += '</div></div>';
                        counter = 0;
                    }
                });
                courseWraper += '</div>';
                courseContainer.html(courseWraper);
            }
        })
    }
    $(document).on('click', "#downloadProject", (e) => {
       var spinnerOptions = { dimBackground: true };
        SpinnerPlugin.activityStart("Downloading...", spinnerOptions);
        console.log("in download")
        var dl = new download();
        dl.Initialize({
            fileSystem : fileSystem,
            folder: "projects",
            unzip: false,
            remove: false,
            timeout: 0,
            success: DownloaderSuccess,
            error: DownloaderError,
        });
        dl.Get("https://lnwebworks.com/sample-project.zip");
        function DownloaderError(err) {
            console.log("download error: " + err);
            alert("download error: " + err);
        }
        function DownloaderSuccess(evt) {
            // alert(fileSystem);
            console.log("yej");
            processZip(fileSystem+ "projects/sample-project.zip", fileSystem+ "projects")
            SpinnerPlugin.activityStop();
        }
    });

    $("#logout").on("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    function createDirectory(rootDirEntry) {
        rootDirEntry.getDirectory('NewDirInRoot', { create: true }, function (dirEntry) {
            dirEntry.getDirectory('images', { create: true }, function (subDirEntry) {
    
                createFile(subDirEntry, "fileInNewSubDir.txt");
    
            }, onErrorGetDir);
        }, onErrorGetDir);
    }

    window.resolveLocalFileSystemURL(fileSystem, (entry) => {
        entry.getDirectory('Documents', { create: true }, function (dirEntry) {
            console.log(dirEntry)
        })
    })

    $("#myDownloads").on('click', (e) => {
        e.preventDefault();
        
        window.resolveLocalFileSystemURL(fileSystem+ "projects", (entry) => {
            var projectReader = entry.createReader();
            projectReader.readEntries(getProjects = (listProjects) => {
                if (listProjects.length <= 0) {
                    var spinnerOptions = { dimBackground: true };
                    SpinnerPlugin.activityStart("Downloading...", spinnerOptions);
                    var dl = new download();
                    dl.Initialize({
                        fileSystem : fileSystem,
                        folder: "projects",
                        unzip: false,
                        remove: false,
                        timeout: 0,
                        success: DownloaderSuccess,
                        error: DownloaderError,
                    });
                    dl.Get("https://lnwebworks.com/sample-project.zip");
                    function DownloaderError(err) {
                        console.log("download error: " + err);
                        alert("download error: " + err);
                    }
                    function DownloaderSuccess(evt) {
                        console.log("yej");
                        processZip(fileSystem+ "projects/sample-project.zip", fileSystem+ "projects")
                        SpinnerPlugin.activityStop();
                    }
                } else {
                    listProjects.forEach((project, folderIndex) => {
                        if(project.isDirectory) {
                            console.log(project);
                            return window.location.href = "offline-project.html";
                            // return false;
                        } else {
                        }
                    })
                }
            });
        }, (err) => {console.log(err)})

    });

    function processZip(zipSource, destination) {
                // Handle the progress event
                var progressHandler = function(progressEvent){
                    var percent =  Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    // Display progress in the console : 8% ...
                    console.log(percent + "%");
                    if (percent == 100) {
                        setTimeout(() => {
                            window.location.href = "offline-project.html";
                        }, 2000);
                    }
                };
                // Proceed to unzip the file
                window.zip.unzip(zipSource, destination, (status) => {
                    if(status == 0){
                        console.log("Files succesfully decompressed");
                        window.resolveLocalFileSystemURL (zipSource,
                            function (fileEntry) {
                                fileEntry.remove(
                                    function () {
                                        console.log('File is removed.');
                                    },
                                    function (error) {
                                        alert('Unable to remove file.');
                                    }
                                );
                            }, function (error) {console.log(error)}
                         );
                    }
                    if(status == -1){
                        console.error("Oops, cannot decompress files");
                    }
                }, progressHandler);
            }
}