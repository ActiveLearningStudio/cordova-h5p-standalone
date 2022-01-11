document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // getUrlParams = location.search.split("playlistPath=");
    // playlistPath = getUrlParams[0];
    getUrlParams = new URLSearchParams(location.search);
    playlistPath = getUrlParams.get("playlistPath");
    courseId = getUrlParams.get("courseId");
    localStorage.setItem("activeOfflineCourse", courseId);
    var offlinePlaylistHTML = '',
        activitiesPath = ''
    counter = 0;
    window.resolveLocalFileSystemURL(playlistPath, function success(playlist) {
        console.log(playlist);
        var playlistReader = playlist.createReader();
        playlistReader.readEntries(getPlaylists = (playlistFolders) => {
            playlistFolders.forEach((playlistFolder) => {
                if (playlistFolder.isDirectory) {
                    // ----- Project Sub Folder -----
                    window.resolveLocalFileSystemURL(playlistFolder.nativeURL, function success(playlistContainer) {
                        var playlistContainerReader = playlistContainer.createReader();
                        playlistContainerReader.readEntries(getplaylistContainer = (allPlaylists) => {
                            console.log(allPlaylists);
                            var offlineCoursesProgress = JSON.parse(localStorage.getItem('offlineCoursesProgress'));
                            var activities = [];
                            allPlaylists.forEach((allPlaylist) => {
                                if (allPlaylist.isDirectory) {
                                    // --------- Playlist Folder ---------
                                    console.log("allPlaylist", allPlaylist);
                                    activitiesPath = allPlaylist;
                                } else {
                                    // --------- If any file inside sub project folder address here. ---------
                                    // variable = allPlaylist
                                    var playlistFolderPath = allPlaylist.nativeURL,
                                    getPlaylistPath = playlistFolderPath.split("/");
                                    getPlaylistPath.pop();
                                    var newPlaylistFolderPath = getPlaylistPath.join("/")
                                    // console.log("getPlaylistPath", newPlaylistFolderPath);
                                    // console.log("activitiesPath >>>>>>", activitiesPath.nativeURL);
                                    // console.log("filePath >>>>>>", allPlaylist.nativeURL);
                                    // console.log("file>>>>>>", allPlaylist);
                                    window.resolveLocalFileSystemURL(allPlaylist.nativeURL, function success(fileEntry) {
                                        fileEntry.file(function(file) {
                                            var reader = new FileReader();
                                            reader.onloadend = function(evt) {
                                                var playlistJSON = JSON.parse(evt.target.result);
                                                console.log(playlistJSON);
                                                playlistJSON.activities.forEach((activity) => {
                                                    activities.push(activity.h5p_content_id);
                                                });
                                                if(offlineCoursesProgress[offlineCoursesProgress.findIndex((obj => obj.id == courseId))] != null) {
                                                    offlineCoursesProgress[offlineCoursesProgress.findIndex((obj => obj.id == courseId))].activities = activities;
                                                    localStorage.setItem('offlineCoursesProgress', JSON.stringify(offlineCoursesProgress));
                                                }
                                                counter++;
                                                if (counter == 1) {
                                                    offlinePlaylistHTML += `<div class="grid-card-block">
                                                    <div class="grid-wrapper">`;
                                                }
                                                offlinePlaylistHTML += `                                                
                                                <div class="grid-card-box"> 
                                                    <img src="">
                                                    <div class="description">
                                                        <a href="offline-activities.html?activitiesPath=${newPlaylistFolderPath}/activities">
                                                            <h5>${playlistJSON.title}</h5>
                                                        </a>
                                                    </div>                                              
                                                </div>
                                            </section>`;

                                                if (counter == 2) {
                                                    offlinePlaylistHTML += '</div></div>';
                                                    counter = 0;
                                                }
                                                $("#offlinePlaylistContainer").html(offlinePlaylistHTML);
                                            };
                                            reader.readAsText(file);
                                        }, onErrorReadFile = (err) => { console.log(err) });
                                    });
                                }
                            })
                        })
                    })
                } else {
                    // ------ Project.json address here -----
                    // variable = playlistFolder
                }
            })
        })

    })

}