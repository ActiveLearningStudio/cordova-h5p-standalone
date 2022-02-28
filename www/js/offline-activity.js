document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    var getUrlParams = location.search.split("activityPath="),
        activityPath = getUrlParams[1],
        activityId = "",
        splitActivitypath = activityPath.split("/");
    splitActivitypath.splice(splitActivitypath.length - 1, 1),
        newActivityPath = splitActivitypath.join('/');
    var generateNewActivityPath = newActivityPath + "/";

    window.resolveLocalFileSystemURL(activityPath, function success(fileEntry) {
        console.log("fileEntry", fileEntry);
        fileEntry.file(function (file) {
            // console.log("im here>>>>", file);
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
                // console.log("setting>>>>", window.H5PIntegration);
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

    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
        fs.root.getFile("offlineActivitiesCount.json", { create: false, exclusive: false }, function(fileEntry) {
            readLoacalJsonFile(fileEntry, (file) => { 
                console.log("🚀 ~ file: offline-activity.js ~ line 46 ~ readLoacalJsonFile ~ file", file)
                let activities = JSON.parse(file);
                console.log("readLoacalJsonFile", activities);

            });
        }, onErrorCreateFile = (err) => { console.log(err) });
    }, onErrorLoadFs = (err) => { console.log("err------> ",err) })





    $(document).on("click", "#prevButton", () => {
        var currentActivityId = getKeyByValue(activityIdObj, generateNewActivityPath),
            prevActivityId = parseInt(currentActivityId) - 1;
        window.resolveLocalFileSystemURL(activityIdObj[prevActivityId], function success(activities) {
            // console.log("activity object--", activityIdObj)
            var activitiesReader = activities.createReader();
            activitiesReader.readEntries(getPlaylists = (activitiesFiles) => {
                activitiesFiles.forEach((activitiesFile) => {


                    if (activitiesFile.isFile) {
                        if (activitiesFile.name.includes('h5p.json')) {
                            console.log("file", activitiesFile);
                            window.location.href = `offline-activity.html?activityPath=${activitiesFile.nativeURL}`;
                            //console.log("location---", window.location.href)
                            //console.log("file", activitiesFile);
                            window.location.href = `offline-activity.html?activityPath=${activitiesFile.nativeURL}`;
                            console.log("location---", window.location.href)
                        }
                    }
                })
            })
        })

    })
    $(document).on("click", "#nextButton", () => {
            // console.log(">>>>>>>>>>", activityIdObj)
            // console.log(">>>>>>>>>>", newActivityPath)
            var currentActivityId = getKeyByValue(activityIdObj, generateNewActivityPath),
                nextActivityId = parseInt(currentActivityId) + 1;

            window.resolveLocalFileSystemURL(activityIdObj[nextActivityId], function success(activities) {
                var activitiesReader = activities.createReader();
                activitiesReader.readEntries(getPlaylists = (activitiesFiles) => {
                    activitiesFiles.forEach((activitiesFile) => {
                        // console.log("activities files==", activitiesFile)
                        if (activitiesFile.isFile) {
                            if (activitiesFile.name.includes('h5p.json')) {
                                // console.log("file", activitiesFile);
                                window.location.href = `offline-activity.html?activityPath=${activitiesFile.nativeURL}`;
                                // console.log("location---", window.location.href)
                            }
                        }
                    })
                })
            })
    })
        // handlePlayActivity(activityIdObj[nextActivityId])  })

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
    console.log("lost connection");
    var getOpenedTime = {};
    H5P.externalDispatcher.on('xAPI', function(event) {
        var contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']);
        // console.log("contentID", contentId);
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
            console.log("dddddd", data);
                // const stringData = JSON.stringify(data);
            window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
                console.log('file system open: ' + fs.name);
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
            console.log("Successful file write..." + this.result);
        };
        fileWriter.onerror = function(e) {
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

function readFile(fileEntry) {
    const currikiToken = localStorage.getItem("CURRIKI_TOKEN"),
    currikiBaseURL = localStorage.getItem("CURRIKI_BASE_API_URL");
    // const CurrikiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzMiLCJqdGkiOiJlNGUyZTgyZDM4ODkwOGUyOTcyZGUxMzEwOTc4MWJiYzcyZTAwMmEwM2JjZjY5NGNjNzhhZTgyZWU2NThhZGY3MzcyNjRlYTk5YzZlN2Y2MyIsImlhdCI6MTYzMjgwNDQwMCwibmJmIjoxNjMyODA0NDAwLCJleHAiOjE2NjQzNDA0MDAsInN1YiI6IjE0MzciLCJzY29wZXMiOltdfQ.ANU71Nl9syFSa7zKN4XIzEX5rnJ6cJ1g8SsFSz5EDActwpVwuxzpgf_HdpsdOcCwzTwPdy-18kx0HAHKsXE0tsbYY8Ncyf9tYuTlxcKXxXTA4YI29y7-ACAjLHpdTi29hwsTxYltwYYx-TxUYrEjOSrBOPOhluhn56F3DvdGw3JPS40aHZ7bpnJojLw8Ysv5Kpm4wFCjLQewoNpLfu7p53wYQ3jjusR4UDFE3M6I1nrmj3Pfsik4q9uKhimas0nm8PXhGSRbfaJPzTlNOVAcNdZuOMMnLIQt8ENThNZ_9z0HLLSvPc0jjzHEDRyu-khPGEPeFH56Kjm6GUYXwxl3LRPxTMWRcRP6q-JcphfOXkUaUfWilNRJ3jndzvta1vTqmgVUTO6xH3EoNGo_oYhA56b1Gm4UVc50Z3K2jG3Q4omzdkZlufLN9JB5H6eH6cQEEEP9rrSOX_lDRUchbqLDbBC9dghMr7E5R6uDlA9PAT5pcsPsydEvjTcPbv3aa5jRfvO31oixkR2JXGlHi3mTIAxI60eB_3NcgUEehtSwyx7o-epMDE6T6FL2fsBo5Kz_Bi4Cb-2Mem0umbD92kgFny1RBF7Vxj7eosMZXkdI6US6lIiC0bLVwr4bUnOVJ2lR5MNboIqw9IFT7JTLR8qaVfyUs4kTxi4que8JXmmYyDU';
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            // console.log(fileEntry.fullPath + ": " + this.result);
            var data = JSON.parse(this.result)
            console.log(data)
            $.ajax({
                url: `${currikiBaseURL}h5p/ajax/reader/finish`,
                type: "POST",
                headers: {
                    Authorization: "Bearer " + currikiToken,
                },
                data: data,
                success: function(result) {
                    console.log(result)
                }
            });
        };
        reader.readAsText(file);

    }, onErrorReadFile = (err) => { console.log(err) });
}