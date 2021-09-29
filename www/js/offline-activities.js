document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    getUrlParams = location.search.split("activitiesPath=");
    activitiesPath = getUrlParams[1];
    console.log(activitiesPath)

    var offlineActivitiesHTML = '';
    window.resolveLocalFileSystemURL(activitiesPath, function success(activities) {
        var activitiesReader = activities.createReader();
        activitiesReader.readEntries(getPlaylists = (activitiesFolders) => {
            activitiesFolders.forEach((activitiesFolder) => {
                if(activitiesFolder.isDirectory) {
                    console.log("dir",activitiesFolder);
                    offlineActivitiesHTML += `
                    <div class= "row mt-3 mb-3">
                        <div class="col-12">
                            <a href="offline-activity.html?activityPath=${activitiesFolder.nativeURL}">
                                <h4 class="text-center">${activitiesFolder.name}</h4>
                            </a>
                        </div>
                    </div>`;
                    $("#offlineActivitiesContainer").html(offlineActivitiesHTML);

                } else {
                    // ------ Project.json address here -----
                    // variable = playlistFolder
                    console.log(activitiesFolder)
                } 
            }) 
        })
    })
}