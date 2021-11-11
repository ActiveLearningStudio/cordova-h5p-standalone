document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    getUrlParams = location.search.split("playlistPath=");
    playlistPath = getUrlParams[1];

    var offlinePlaylistHTML = '',
    activitiesPath = ''
    counter = 0;
    window.resolveLocalFileSystemURL(playlistPath, function success(playlist) {
        var playlistReader = playlist.createReader();
        playlistReader.readEntries(getPlaylists = (playlistFolders) => {
            playlistFolders.forEach((playlistFolder) => {
                if(playlistFolder.isDirectory) {
                    // ----- Project Sub Folder -----
                    window.resolveLocalFileSystemURL(playlistFolder.nativeURL, function success(playlistContainer) {
                        var playlistContainerReader = playlistContainer.createReader();
                        playlistContainerReader.readEntries(getplaylistContainer = (allPlaylists) => {
                            allPlaylists.forEach((allPlaylist) => {
                                if(allPlaylist.isDirectory) {
                                    // --------- Playlist Folder ---------
                                    console.log("allPlaylist", allPlaylist)
                                    activitiesPath = allPlaylist;
                                } else {
                                    // --------- If any file inside sub project folder address here. ---------
                                    // variable = allPlaylist
                                    console.log("file>>>>>>", allPlaylist);
                                    window.resolveLocalFileSystemURL(allPlaylist.nativeURL, function success(fileEntry) {
                                        fileEntry.file(function (file) {
                                            var reader = new FileReader();
                                            reader.onloadend = function(evt) {
                                                var playlistJSON = JSON.parse(evt.target.result);
                                                counter++;
                                                if (counter == 1) {
                                                    offlinePlaylistHTML += `<div class="grid-card-block">
                                                    <div class="grid-wrapper">`;
                                                }
                                                offlinePlaylistHTML += `
                                                <div class="grid-card-box">
                                                    <img src="">
                                                    <div class="description">
                                                        <a href="offline-activities.html?activitiesPath=${activitiesPath.nativeURL}">
                                                            <h5>${playlistJSON.title}</h5>
                                                        </a>
                                                    </div>
                                                </div>`;

                                                if (counter == 2) {
                                                    offlinePlaylistHTML += '</div></div>';
                                                    counter = 0;
                                                }
                                                $("#offlinePlaylistContainer").html(offlinePlaylistHTML);
                                            };
                                            reader.readAsText(file);
                                        }, onErrorReadFile = (err) => {console.log(err)});
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