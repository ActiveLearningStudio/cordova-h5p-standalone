document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log(device.platform);
    var fileSystem = '';
    var progress;
    switch (device.platform) {
        case "iOS":
            fileSystem = cordova.file.dataDirectory;
            break;
        case "Android":
            fileSystem = cordova.file.externalDataDirectory;
            break;
    }
    var localStorage = window.localStorage,
        token = localStorage.getItem("token"),
        courseContainer = $("#courseContainer"),
        limit = 0,
        offset = 0;

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



                    localStorage.setItem(course.id, course.courseimage);
                    console.log(course.fullname)
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
        console.log("in download")
        var modal = document.getElementById("myModal");
        // Get the button that opens the modal
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 

        modal.style.display = "block";
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
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
        dl.Get("https://lnwebworks.com/updated-project.zip");

        function DownloaderError(err) {
            console.log("download error: " + err);
            alert("download error: " + err);
        }

        function DownloaderSuccess(evt) {
            // alert(fileSystem);
            console.log("yej");
            processZip(fileSystem + "projects/updated-project.zip", fileSystem + "projects")
                //SpinnerPlugin.activityStop();
        }
    });

    $("#logout").on("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    // function createDirectory(rootDirEntry) {
    //     rootDirEntry.getDirectory('NewDirInRoot', { create: true }, function(dirEntry) {
    //         dirEntry.getDirectory('images', { create: true }, function(subDirEntry) {
    //             createFile(subDirEntry, "fileInNewSubDir.txt");
    //         }, onErrorGetDir);
    //     }, onErrorGetDir);
    // }
    window.resolveLocalFileSystemURL(fileSystem, (entry) => {
        entry.getDirectory('Documents', { create: true }, function(dirEntry) {
            console.log(dirEntry)
        })
    })
    $("#myDownloads").on('click', (e) => {
        e.preventDefault();

        window.resolveLocalFileSystemURL(fileSystem + "projects", (entry) => {
            var projectReader = entry.createReader();
            projectReader.readEntries(getProjects = (listProjects) => {
                console.log(listProjects);
                if (listProjects.length <= 0) {
                    //var spinnerOptions = { dimBackground: true };
                    //SpinnerPlugin.activityStart("Downloading...", spinnerOptions);

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
                    dl.Get("https://lnwebworks.com/updated-project.zip");

                    function DownloaderError(err) {
                        console.log("download error: " + err);
                        //alert("download error: " + err);
                    }

                    function DownloaderSuccess(evt) {
                        console.log("yej");

                        processZip(fileSystem + "projects/sample-project.zip", fileSystem + "projects")
                            //SpinnerPlugin.activityStop();

                    }
                } else {
                    listProjects.forEach((project, folderIndex) => {
                        if (project.isDirectory) {
                            console.log(project);
                            return window.location.href = "offline-project.html";
                            // return false;
                        } else {
                            console.log(project)
                            moveFile(project.nativeURL, activityName[0], fileSystem + "projects");
                        }
                    })
                }
            });
        }, (err) => { console.log(err) })

    });

    function processZip(zipSource, destination) {
        // Handle the progress event
        var progressHandler = function(progressEvent) {
                var percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                // const myProgressBar = document.querySelector(".progress");
                // progressBar.querySelector(".progress__fill").style.width = `${value}%`;
                // progressBar.querySelector(".progress__text").textContent = `${value}%`;
                // const myProgressBar = document.querySelector(".progress");
                // value = document.getElementById("dene").innerHTML.toString();
                // updateProgressBar(myProgressBar, value);
                // console.log("progress bar", myProgressBar)
                console.log(percent + "%");
                if (percent == 100) {
                    setTimeout(() => {
                        window.location.href = "offline-project.html";
                    }, 2000);
                }
            }
            //updateProgressBar(myProgressBar, percent);

        // function moveFile(fileUri, name, activityPath) {
        //     window.resolveLocalFileSystemURL(fileUri,
        //         function(fileEntry) {
        //             newFileUri = activityPath;
        //             oldFileUri = fileUri;
        //             fileExt = "." + "zip";

        //             newFileName = name + fileExt;
        //             window.resolveLocalFileSystemURL(newFileUri,
        //                 function(dirEntry) {
        //                     // move the file to a new directory and rename it
        //                     fileEntry.moveTo(dirEntry, newFileName, successCallback = (evt) => {
        //                         processZip(evt.nativeURL, newFileUri + name);
        //                     }, errorCallback);
        //                 },
        //                 errorCallback = (err) => { console.log(err) }
        //             );
        //         },
        //         errorCallback = (err) => { console.log(err) }
        //     );
        //     const myProgressBar = document.querySelector(".progress");
        //     updateProgressBar(myProgressBar, percent);
        //     console.log(percent + "%");
        //     if (percent == 100) {
        //         setTimeout(() => {
        //             window.location.href = "offline-project.html";
        //         }, 2000);
        //     }

        // };
        // Proceed to unzip the file
        window.zip.unzip(zipSource, destination, (status) => {
            if (status == 0) {
                console.log("Files succesfully decompressed");
                window.resolveLocalFileSystemURL(zipSource,
                    function(fileEntry) {
                        fileEntry.remove(
                            function() {
                                console.log('File is removed.');
                            },
                            function(error) {
                                alert('Unable to remove file.');
                            }
                        );
                    },
                    function(error) { console.log(error) }
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
        function(fileEntry) {
            newFileUri = activityPath;
            oldFileUri = fileUri;
            fileExt = "." + "zip";

            newFileName = name + fileExt;
            window.resolveLocalFileSystemURL(newFileUri,
                function(dirEntry) {
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