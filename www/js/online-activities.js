document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var customApiToken = localStorage.getItem("CUSTOM_API_TOKEN"),
    getUrlParams = location.search.split("playlistId="),
    playlistId = getUrlParams[1],
    currikiToken = localStorage.getItem("CURRIKI_TOKEN"),
    currikiBaseURL = localStorage.getItem("CURRIKI_BASE_API_URL");
    
    $.ajax({
        url: `${currikiBaseURL}playlists/${playlistId}/activities`,
        headers: {
            Authorization: "Bearer " + currikiToken,
        },
        success: (response) => {
            console.log(response);
            var activitiesContainer = $("#activitiesContainer"),
            activitiesHTML = "",
            activityId = "",
            saveActivityId = [],
            counterId = 0
            counter = 0;
            activities = [];
            // db.transaction(tx => {
            //     tx.executeSql('DELETE FROM activities_id');
            // })
            response.activities.forEach((activity) => {
                $.each(activity.h5p_content, (key, h5pActivity) => {
                    switch (key) {
                        case "id":
                            activityId = h5pActivity;
                            // console.log("counter", counterId);
                            saveActivityId[counterId] = h5pActivity;
                            // db.transaction((tx) => {
                            //     tx.executeSql('INSERT INTO activities_id (activity_id) VALUES (' + h5pActivity + ')'); 
                            // })
                            counterId++;
                        break;
                    }
                });
                counter++;
                if (counter == 1) {
                    activitiesHTML += `<div class="grid-card-block">
                    <div class="grid-wrapper">`;
                }
                activitiesHTML += `
                <div class="grid-card-box">
                    <img src="">
                    <div class="description">
                        <a href="online-activity.html?activityId=${activityId}">
                            <h5>${activity.title}</h5>
                        </a>
                    </div>
                </div>`;

                if (counter == 2) {
                    activitiesHTML += '</div></div>';
                    counter = 0;
                }
            });
            activitiesContainer.html(activitiesHTML);
            window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
                console.log('file system open: ' + fs.name);
                createFile(fs.root, "activitiesId.txt", false, saveActivityId);  
            }, onErrorLoadFs = (err) => {console.log(err)});
        },
    });
    function createFile(dirEntry, fileName, isAppend, data) {
        // Creates a new file or returns the file if it already exists.
        dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
            writeFile(fileEntry, data);
        }, onErrorCreateFile = (err) => {console.log(err)});
    }

    function writeFile(fileEntry, dataObj) {
        // Create a FileWriter object for our FileEntry (log.txt).
        var data = dataObj = new Blob([dataObj], { type: 'application/json' });
        fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function() {
                console.log("Successful file write..." + this.result);
            };
            fileWriter.onerror = function (e) {
                console.log("Failed file write: ", e);
            };
            // If data object is not passed in,
            // create a new Blob instead.
            if (!dataObj) {           
                dataObj = new Blob([dataObj], { type: 'text/plain' });
            }
            fileWriter.write(data);
        });
    }
}