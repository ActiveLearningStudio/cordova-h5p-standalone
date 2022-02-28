document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    let activities = [];
    let current;
    let buttons = `<div class="prv-next-btn mt-5">`;
    var getUrlParams = location.search.split("activityPath="), activityPath = getUrlParams[1], splitActivitypath = activityPath.split("/");;
    
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
        fs.root.getFile("offlineActivitiesCount.json", { create: false, exclusive: false }, function(fileEntry) {
            readLoacalJsonFile(fileEntry, (file) => {
                activities = JSON.parse(file);
                activities.forEach((element,i)=>{
                    if(element.id == splitActivitypath[16]){
                        current = i;
                        if (i !== 0 && i !== activities.length - 1) {
                            buttons += `<button id="${activities[i - 1].path}" 
                              class="btn green-btn prv-btn">Previous
                            </button>
                            <button id= "${activities[i + 1].path}" 
                              class="btn green-btn nxt-btn">Next
                            </button>
                            </div>`;
                        } else if (i === 0 && activities.length !== 1) {
                        buttons += `<button id="${activities[i + 1].path}" class="btn green-btn">
                        Next</button></div>`;
                        } else if (i !== 0 && i == activities.length - 1 ) {
                        buttons += `<button id="${activities[i - 1].path}" class="btn green-btn">
                        Prev</button></div>`;
                        } else if (i === 0 && activities.length === 1) {
                        buttons += `</div>`;
                        }
                    }
                })
                $("#offlineactiveButton").append(buttons);

            });
        }, onErrorCreateFile = (err) => { console.log(err) });
    }, onErrorLoadFs = (err) => { console.log("err------> ",err) })

    window.resolveLocalFileSystemURL(activityPath, function success(fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                var playlistJSON = JSON.parse(evt.target.result);
                var setting = playlistJSON.settings,
                html = playlistJSON.embed_code,
                width = 'width=100%',
                splitHTML = html.split("<iframe"),
                iframeHTML = splitHTML[0] + "<iframe " + width + splitHTML[1];
                window.H5PIntegration = {...setting}
                $('#h5p-container').append(iframeHTML);
                var scripts = `<script src="js/h5p/jquery.js"></script>
                <script src="js/h5p/offline-h5p.js"></script>
                <script src="js/h5p/h5p-event-dispatcher.js"></script>
                <script src="js/h5p/h5p-x-api.js"></script>
                <script src="js/h5p/h5p-x-api-event.js"></script>
                <script src="js/h5p/h5p-content-type.js"></script>
                <script src="js/handle-xapi.js"></script>`;
                $("body").append(scripts);
                var loading = $(".loading");
                loading.delay(200).slideUp();
            }
            reader.readAsText(file);
        })
    }, (err) => {console.log("error>>>", err)});

    $(document).on("click", '.green-btn', (evt) => {
        let newUrl = `offline-activity.html?activityPath=${evt.target.id}`
        window.location.href = newUrl; 
    });

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] == value);
    }
}
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);
var dataFileEntry;

function onOnline() {
    // Handle the online event
    var networkState = navigator.connection.type;
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
        fs.root.getFile("user-response-offline.txt", { create: false, exclusive: false }, function(fileEntry) {
            readFile(fileEntry);
        }, onErrorCreateFile = (err) => { console.log(err) });
    }, onErrorLoadFs = (err) => { console.log(err) })
}

function onOffline() {
    // Handle the offline event
    var data;
    var getOpenedTime = {};
    H5P.externalDispatcher.on('xAPI', function(event) {
        var contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']);
        
        if (event.getVerb() === 'attempted') {
            getOpenedTime[contentId] = new Date();
        }
        if ((event.getVerb() === 'completed' || event.getVerb() === 'answered') && !event.getVerifiedStatementValue(['context', 'contextActivities', 'parent'])) {
            var score = event.getScore(),
            maxScore = event.getMaxScore(),
            contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']),
            offlineCoursesProgress = JSON.parse(localStorage.getItem('offlineCoursesProgress'));
            activeOfflineCourse = offlineCoursesProgress[offlineCoursesProgress.findIndex((obj => obj.id == localStorage.getItem('activeOfflineCourse')))],
            completed_activities = activeOfflineCourse.completed_activities;
            if(completed_activities.indexOf(contentId) === -1) {
                completed_activities.push(contentId);
            }
            activeOfflineCourse.progress = ((completed_activities.length)*100)/activeOfflineCourse.activities.length;
            localStorage.setItem('offlineCoursesProgress', JSON.stringify(offlineCoursesProgress));
            email = event.data.statement.actor.mbox,
            toUnix = function (date) {
                return Math.round(date.getTime() / 1000);
            };
              // Post the results
            const data = {
                contentId: contentId,
                score: score,
                maxScore: maxScore,
                opened: toUnix(getOpenedTime[contentId]),
                finished: toUnix(new Date()),
                time: "",
                email: email
            };
                // const stringData = JSON.stringify(data);
            window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
                createFile(fs.root, "user-response-offline.txt", false, data);
            }, onErrorLoadFs = (err) => { console.log(err) });
        }
    });
}

function createFile(dirEntry, fileName, isAppend, data) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {
        writeFile(fileEntry, data);
    }, onErrorCreateFile = (err) => { console.log(err) });

}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function() {
        };
        fileWriter.onerror = function(e) {
        };
        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob([stringData], { type: 'text/plain' });
        }
        fileWriter.write(dataObj);
    });
}

function readFile(fileEntry) {
    const currikiToken = localStorage.getItem("CURRIKI_TOKEN"),
    currikiBaseURL = localStorage.getItem("CURRIKI_BASE_API_URL");
    // const CurrikiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzMiLCJqdGkiOiJlNGUyZTgyZDM4ODkwOGUyOTcyZGUxMzEwOTc4MWJiYzcyZTAwMmEwM2JjZjY5NGNjNzhhZTgyZWU2NThhZGY3MzcyNjRlYTk5YzZlN2Y2MyIsImlhdCI6MTYzMjgwNDQwMCwibmJmIjoxNjMyODA0NDAwLCJleHAiOjE2NjQzNDA0MDAsInN1YiI6IjE0MzciLCJzY29wZXMiOltdfQ.ANU71Nl9syFSa7zKN4XIzEX5rnJ6cJ1g8SsFSz5EDActwpVwuxzpgf_HdpsdOcCwzTwPdy-18kx0HAHKsXE0tsbYY8Ncyf9tYuTlxcKXxXTA4YI29y7-ACAjLHpdTi29hwsTxYltwYYx-TxUYrEjOSrBOPOhluhn56F3DvdGw3JPS40aHZ7bpnJojLw8Ysv5Kpm4wFCjLQewoNpLfu7p53wYQ3jjusR4UDFE3M6I1nrmj3Pfsik4q9uKhimas0nm8PXhGSRbfaJPzTlNOVAcNdZuOMMnLIQt8ENThNZ_9z0HLLSvPc0jjzHEDRyu-khPGEPeFH56Kjm6GUYXwxl3LRPxTMWRcRP6q-JcphfOXkUaUfWilNRJ3jndzvta1vTqmgVUTO6xH3EoNGo_oYhA56b1Gm4UVc50Z3K2jG3Q4omzdkZlufLN9JB5H6eH6cQEEEP9rrSOX_lDRUchbqLDbBC9dghMr7E5R6uDlA9PAT5pcsPsydEvjTcPbv3aa5jRfvO31oixkR2JXGlHi3mTIAxI60eB_3NcgUEehtSwyx7o-epMDE6T6FL2fsBo5Kz_Bi4Cb-2Mem0umbD92kgFny1RBF7Vxj7eosMZXkdI6US6lIiC0bLVwr4bUnOVJ2lR5MNboIqw9IFT7JTLR8qaVfyUs4kTxi4que8JXmmYyDU';
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
            var data = JSON.parse(this.result)
            $.ajax({
                url: `${currikiBaseURL}h5p/ajax/reader/finish`,
                type: "POST",
                headers: {
                    Authorization: "Bearer " + currikiToken,
                },
                data: data,
                success: function(result) {
                }
            });
        };
        reader.readAsText(file);

    }, onErrorReadFile = (err) => { console.log(err) });
}