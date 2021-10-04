document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var localStorage = window.localStorage,
    token = localStorage.getItem("token"),
    courseContainer = $("#courseContainer");
    console.log(token)
    if (token) {
        $.ajax({
            url: "https://map-lms.curriki.org/webservice/rest/server.php?",
            data: {
                "wstoken": token,
                "moodlewsrestformat": "json",
                "wsfunction": "core_course_get_enrolled_courses_by_timeline_classification",
                "classification": "inprogress"
            },
            success: (response) => {
                // console.log(response)
                var courseWraper = '<div class="row mt-3 mb-3">';
                response.courses.forEach(course => {
                    courseWraper += `
                    <div class="col-12">
                    <a href="playlist.html?courseId=${course.id}"><h4>${course.fullname}</h4></a>
                    <img src="${course.courseimage}" class="img-fluid">
                    <button type="button" id="download">Download</button>
                    </div>`;
                });
                courseWraper += '</div>';
                courseContainer.html(courseWraper);
            }
        })
    } else {
        window.location.href = 'index.html';
    }

    $(document).on('click', "#download", (e) => {
       var spinnerOptions = { dimBackground: true };
        SpinnerPlugin.activityStart("Downloading...", spinnerOptions);
        console.log("in download")
        var dl = new download();
        dl.Initialize({
            fileSystem : cordova.file.externalDataDirectory,
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
            // alert(cordova.file.externalDataDirectory);
            console.log("yej");
            processZip(cordova.file.externalDataDirectory+ "projects/sample-project.zip", cordova.file.externalDataDirectory+ "projects")
            SpinnerPlugin.activityStop();
        }
    });

    $("#logout").on("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    $("#myDownloads").on('click', (e) => {
        e.preventDefault();
        window.resolveLocalFileSystemURI(cordova.file.externalDataDirectory+ "projects", (entry) => {
            var projectReader = entry.createReader();
            projectReader.readEntries(getProjects = (listProjects) => {
                listProjects.forEach((project, folderIndex) => {
                if(project.isDirectory) {
                    console.log(project);
                    return window.location.href = "offline-project.html";
                    // return false;
                } else {
                    var spinnerOptions = { dimBackground: true };
                    SpinnerPlugin.activityStart("Downloading...", spinnerOptions);
                    var dl = new download();
                    dl.Initialize({
                        fileSystem : cordova.file.externalDataDirectory,
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
                        processZip(cordova.file.externalDataDirectory+ "projects/sample-project.zip", cordova.file.externalDataDirectory+ "projects")
                        SpinnerPlugin.activityStop();
                    }
                }
            });
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