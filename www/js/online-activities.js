document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    CurrikiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzMiLCJqdGkiOiJlNGUyZTgyZDM4ODkwOGUyOTcyZGUxMzEwOTc4MWJiYzcyZTAwMmEwM2JjZjY5NGNjNzhhZTgyZWU2NThhZGY3MzcyNjRlYTk5YzZlN2Y2MyIsImlhdCI6MTYzMjgwNDQwMCwibmJmIjoxNjMyODA0NDAwLCJleHAiOjE2NjQzNDA0MDAsInN1YiI6IjE0MzciLCJzY29wZXMiOltdfQ.ANU71Nl9syFSa7zKN4XIzEX5rnJ6cJ1g8SsFSz5EDActwpVwuxzpgf_HdpsdOcCwzTwPdy-18kx0HAHKsXE0tsbYY8Ncyf9tYuTlxcKXxXTA4YI29y7-ACAjLHpdTi29hwsTxYltwYYx-TxUYrEjOSrBOPOhluhn56F3DvdGw3JPS40aHZ7bpnJojLw8Ysv5Kpm4wFCjLQewoNpLfu7p53wYQ3jjusR4UDFE3M6I1nrmj3Pfsik4q9uKhimas0nm8PXhGSRbfaJPzTlNOVAcNdZuOMMnLIQt8ENThNZ_9z0HLLSvPc0jjzHEDRyu-khPGEPeFH56Kjm6GUYXwxl3LRPxTMWRcRP6q-JcphfOXkUaUfWilNRJ3jndzvta1vTqmgVUTO6xH3EoNGo_oYhA56b1Gm4UVc50Z3K2jG3Q4omzdkZlufLN9JB5H6eH6cQEEEP9rrSOX_lDRUchbqLDbBC9dghMr7E5R6uDlA9PAT5pcsPsydEvjTcPbv3aa5jRfvO31oixkR2JXGlHi3mTIAxI60eB_3NcgUEehtSwyx7o-epMDE6T6FL2fsBo5Kz_Bi4Cb-2Mem0umbD92kgFny1RBF7Vxj7eosMZXkdI6US6lIiC0bLVwr4bUnOVJ2lR5MNboIqw9IFT7JTLR8qaVfyUs4kTxi4que8JXmmYyDU';
    $.ajax({
        url: "https://lite.curriki.org/api/api/v1/projects/3694/playlists?skipContent=false",
        headers: {
            Authorization: "Bearer " + CurrikiToken,
        },
        success: (response) => {
            console.log(response);
            var activitiesContainer = $("#activitiesContainer"),
            activitiesHTML = "",
            activityId = "",
            saveActivityId = [],
            counterId = 0
            counter = 0;

            // db.transaction(tx => {
            //     tx.executeSql('DELETE FROM activities_id');
            // })
            response.playlists.forEach((element) => {
                element.activities.forEach((activity) => {
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
            });
            activitiesContainer.html(activitiesHTML);
            console.log(saveActivityId);
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