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
    const CurrikiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzMiLCJqdGkiOiJlNGUyZTgyZDM4ODkwOGUyOTcyZGUxMzEwOTc4MWJiYzcyZTAwMmEwM2JjZjY5NGNjNzhhZTgyZWU2NThhZGY3MzcyNjRlYTk5YzZlN2Y2MyIsImlhdCI6MTYzMjgwNDQwMCwibmJmIjoxNjMyODA0NDAwLCJleHAiOjE2NjQzNDA0MDAsInN1YiI6IjE0MzciLCJzY29wZXMiOltdfQ.ANU71Nl9syFSa7zKN4XIzEX5rnJ6cJ1g8SsFSz5EDActwpVwuxzpgf_HdpsdOcCwzTwPdy-18kx0HAHKsXE0tsbYY8Ncyf9tYuTlxcKXxXTA4YI29y7-ACAjLHpdTi29hwsTxYltwYYx-TxUYrEjOSrBOPOhluhn56F3DvdGw3JPS40aHZ7bpnJojLw8Ysv5Kpm4wFCjLQewoNpLfu7p53wYQ3jjusR4UDFE3M6I1nrmj3Pfsik4q9uKhimas0nm8PXhGSRbfaJPzTlNOVAcNdZuOMMnLIQt8ENThNZ_9z0HLLSvPc0jjzHEDRyu-khPGEPeFH56Kjm6GUYXwxl3LRPxTMWRcRP6q-JcphfOXkUaUfWilNRJ3jndzvta1vTqmgVUTO6xH3EoNGo_oYhA56b1Gm4UVc50Z3K2jG3Q4omzdkZlufLN9JB5H6eH6cQEEEP9rrSOX_lDRUchbqLDbBC9dghMr7E5R6uDlA9PAT5pcsPsydEvjTcPbv3aa5jRfvO31oixkR2JXGlHi3mTIAxI60eB_3NcgUEehtSwyx7o-epMDE6T6FL2fsBo5Kz_Bi4Cb-2Mem0umbD92kgFny1RBF7Vxj7eosMZXkdI6US6lIiC0bLVwr4bUnOVJ2lR5MNboIqw9IFT7JTLR8qaVfyUs4kTxi4que8JXmmYyDU';
    var localStorage = window.localStorage,
        token = localStorage.getItem("USER_TOKEN"),
        userID = localStorage.getItem("USER_ID"),
        adminToken = localStorage.getItem("ADMIN_TOKEN"),
        customApiToken = localStorage.getItem("CUSTOM_API_TOKEN"),
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
                "wstoken": adminToken,
                "moodlewsrestformat": "json",
                "wsfunction": "core_enrol_get_users_courses",
                "userid": userID
            },
            success: (response) => {

                console.log(response)
                offset = response.nextoffset;
                var courseWraper = '<div class="row">',
                    counter = 0;
                response.forEach(course => {

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
                          <button type="button" id="downloadProject" data-course-id="${course.id}" class="btn btn-primary">Download</button>                         
                        </div>
                    </div>`;
                    //set image in localstorage
                    localStorage.setItem(course.id, course.courseimage);
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
        var courseID = e.target.getAttribute("data-course-id");
        $.ajax({
            url: "https://map-lms.curriki.org/webservice/rest/server.php",
            type: "get",
            data: {
                "moodlewsrestformat": "json",
                "course_id": courseID,
                "wsfunction": "local_curriki_moodle_plugin_fetch_project",
                "wstoken": customApiToken
            },
            success: (project) => {
                console.log("project", project);
                var projectID = project.projectid;
                // var modal = document.getElementById("myModal");
                // // Get the <span> element that closes the modal
                // var span = document.getElementsByClassName("close")[0];
                // modal.style.display = "block";
                // // When the user clicks on <span> (x), close the modal
                // span.onclick = function() {
                //     modal.style.display = "none";
                // }
                //     // When the user clicks anywhere outside of the modal, close it
                // window.onclick = function(event) {
                //     if (event.target == modal) {
                //         modal.style.display = "none";
                //     }
                // }
                if (projectID != null) {
                var spinnerOptions = { dimBackground: true };
                SpinnerPlugin.activityStart("Preparing for Download", spinnerOptions);
                $.ajax({
                    url: `https://lite.curriki.org/api/api/v1/suborganization/1/projects/${projectID}/offline-project`,
                    headers: {
                        Authorization: "Bearer " + CurrikiToken,
                    },
                    success: (res) => {
                        SpinnerPlugin.activityStop();
                        var getProjectpath = res.split('exports/'),
                        projectName = getProjectpath[1],
                        downloadPath = "https://lite.curriki.org/api/storage/exports/" + projectName;
                        console.log("projectName>>>", downloadPath);
                        // return false;
                        var confirmation = confirm('The project is ready to download. Click OK to download');
                        if (confirmation) {
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
                            dl.Get(downloadPath);
        
                            function DownloaderSuccess() {
                                // alert(fileSystem);
                                // modal.style.display = "none";
                                console.log("project>>", projectName);
                                console.log("projectFull >>", fileSystem+ "projects/" + projectName);
                                console.log("yej");
                                window.resolveLocalFileSystemURL(fileSystem + "projects/", (entry) => {
                                    var reader = entry.createReader();
                                    reader.readEntries(getProjects = (listProjects) => {
                                        console.log("list>>",listProjects);
                                    })
                                }, (err) => {console.log(err)})
                                processZip(fileSystem + "projects/" + projectName, fileSystem + "projects", projectName)
                                SpinnerPlugin.activityStop();
                            }
        
                            function DownloaderError(err) {
                                console.log("download error: " + err);
                                alert("download error: " + err);
                            }
                        }
                    }
                });
            }
            }
        })
    //    return false;
    // return false;
    // var spinnerOptions = { dimBackground: true };
    //     SpinnerPlugin.activityStart("Downloading...", spinnerOptions);
    //     console.log("in download")
    //     var dl = new download();
    //     dl.Initialize({
    //         fileSystem : fileSystem,
    //         folder: "projects",
    //         unzip: false,
    //         remove: false,
    //         timeout: 0,
    //         success: DownloaderSuccess,
    //         error: DownloaderError,
    //     });
    //     dl.Get("http://localhost:30400/api/v1/suborganization/1/projects/49/h5p-project");
        function DownloaderError(err) {
            console.log("download error: " + err);
            alert("download error: " + err);
        }
        function DownloaderSuccess(projectName) {
            // alert(fileSystem);
            console.log("project>>", projectName);
            console.log("projectFull >>", fileSystem+ "projects/" + projectName);
            console.log("yej");
            window.resolveLocalFileSystemURL(fileSystem + "projects/", (entry) => {
                var reader = entry.createReader();
                reader.readEntries(getProjects = (listProjects) => {
                    console.log("list>>",listProjects);
                })
            }, (err) => {console.log(err)})
            processZip(fileSystem + "projects/" + projectName, fileSystem + "projects")
            SpinnerPlugin.activityStop();
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
        entry.getDirectory('Documents', { create: true }, function(dirEntry) {})
    })
    $("#myDownloads").on('click', (e) => {
        e.preventDefault();
        window.resolveLocalFileSystemURL(fileSystem + "projects", (entry) => {
            var projectReader = entry.createReader();
            projectReader.readEntries(getProjects = (listProjects) => {
                console.log(listProjects);
                if (listProjects.length <= 0) {
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
                    }

                    function DownloaderSuccess(evt) {
                        console.log("yej");

                        processZip(fileSystem + "projects/sample-project.zip", fileSystem + "projects")

                    }
                } else {
                    listProjects.forEach((project, folderIndex) => {
                        if (project.isDirectory) {
                            console.log(project);
                            return window.location.href = "offline-project.html";

                        } else {

                            moveFile(project.nativeURL, activityName[0], fileSystem + "projects");
                        }
                    })
                }
            });
        }, (err) => { console.log(err) })

    });

    function processZip(zipSource, destination, projectName) {
        // Handle the progress event
        var progressHandler = function(progressEvent) {
            var percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);

            function updateProgressBar(progressBar, value) {
                value = Math.round(value);
                progressBar.querySelector(".progress__fill").style.width = `${value}%`;
                progressBar.querySelector(".progress__text").textContent = `${value}%`;
            }
            const myProgressBar = document.querySelector(".progress");
            updateProgressBar(myProgressBar, percent);
            console.log(percent + "%");
            if (percent == 100) {
                var projectNameArr = projectName.split(".");
                setTimeout(() => {
                    $.ajax({
                        url: "https://lite.curriki.org/api/api/v1/project/delete/" + projectNameArr[0],
                        headers: {
                            Authorization: "Bearer " + CurrikiToken,
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
            console.log("zip", zipSource);
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