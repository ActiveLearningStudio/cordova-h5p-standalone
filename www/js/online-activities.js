document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzMiLCJqdGkiOiJlNGUyZTgyZDM4ODkwOGUyOTcyZGUxMzEwOTc4MWJiYzcyZTAwMmEwM2JjZjY5NGNjNzhhZTgyZWU2NThhZGY3MzcyNjRlYTk5YzZlN2Y2MyIsImlhdCI6MTYzMjgwNDQwMCwibmJmIjoxNjMyODA0NDAwLCJleHAiOjE2NjQzNDA0MDAsInN1YiI6IjE0MzciLCJzY29wZXMiOltdfQ.ANU71Nl9syFSa7zKN4XIzEX5rnJ6cJ1g8SsFSz5EDActwpVwuxzpgf_HdpsdOcCwzTwPdy-18kx0HAHKsXE0tsbYY8Ncyf9tYuTlxcKXxXTA4YI29y7-ACAjLHpdTi29hwsTxYltwYYx-TxUYrEjOSrBOPOhluhn56F3DvdGw3JPS40aHZ7bpnJojLw8Ysv5Kpm4wFCjLQewoNpLfu7p53wYQ3jjusR4UDFE3M6I1nrmj3Pfsik4q9uKhimas0nm8PXhGSRbfaJPzTlNOVAcNdZuOMMnLIQt8ENThNZ_9z0HLLSvPc0jjzHEDRyu-khPGEPeFH56Kjm6GUYXwxl3LRPxTMWRcRP6q-JcphfOXkUaUfWilNRJ3jndzvta1vTqmgVUTO6xH3EoNGo_oYhA56b1Gm4UVc50Z3K2jG3Q4omzdkZlufLN9JB5H6eH6cQEEEP9rrSOX_lDRUchbqLDbBC9dghMr7E5R6uDlA9PAT5pcsPsydEvjTcPbv3aa5jRfvO31oixkR2JXGlHi3mTIAxI60eB_3NcgUEehtSwyx7o-epMDE6T6FL2fsBo5Kz_Bi4Cb-2Mem0umbD92kgFny1RBF7Vxj7eosMZXkdI6US6lIiC0bLVwr4bUnOVJ2lR5MNboIqw9IFT7JTLR8qaVfyUs4kTxi4que8JXmmYyDU";
    $.ajax({
        url: "https://lite.curriki.org/api/api/v1/projects/3694/playlists?skipContent=false",
        headers: {
            Authorization: "Bearer " + token,
        },
        success: (response) => {
            console.log(response);
            var activitiesContainer = $("#activitiesContainer"),
            activitiesHTML = "",
            activityId = "",
            saveActivityId = {},
            counterId = 0;

            response.playlists.forEach((element) => {
                element.activities.forEach((activity) => {
                    $.each(activity.h5p_content, (key, h5pActivity) => {
                        switch (key) {
                            case "id":
                                activityId = h5pActivity;
                                saveActivityId[counterId] = h5pActivity;
                                counterId++;
                            break;
                        }
                    });
                    activitiesHTML += `
                    <div class="row mt-3 mb-3">
                        <div class = "col-10 m-auto">
                            <a href="online-activity.html?activityId=${activityId}">
                                <h4 class="text-center">${activity.title}</h4>
                            </a>
                            <img src="${activity.thumb_url}" class="img-fluid">
                        </div>
                    </div>`;
                });
            });
            activitiesContainer.html(activitiesHTML);
            console.log(saveActivityId)
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
        fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function() {
                console.log("Successful file write..." + this.result);
            };
            fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };
            // If data object is not passed in,
            // create a new Blob instead.
            if (!dataObj) {           
                dataObj = new Blob([stringData], { type: 'text/plain' });
            }
            fileWriter.write(dataObj);
        });
    }
}