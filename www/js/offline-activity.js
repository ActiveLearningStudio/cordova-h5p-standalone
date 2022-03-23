document.addEventListener('deviceready', onDeviceReady, false);
var H5P = window.H5P = window.H5P || {};
var getUrlParams = location.search.split("activityPath="), 
    activityPath = getUrlParams[1], 
    splitActivitypath = activityPath.split("/");
    let id = splitActivitypath[16];
    let activity_id = id.split('-');
function onDeviceReady() {
    let activities = [];
    let current;
    let buttons = `<div class="prv-next-btn mt-5">`;
    var getUrlParams = location.search.split("activityPath="), 
    activityPath = getUrlParams[1], 
    splitActivitypath = activityPath.split("/");
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

    if (device.platform === "iOS") {
        $(".activity-page").css({"margin-top": "40px"})
        $(".close-btn").css({"top": "40px"});
    }

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
                window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) { 
                fs.root.getFile("user-response-offline.json", { create: false, exclusive: false }, function(fileEntry) { 
                    readLoacalJsonFile(fileEntry, (file) => { 
                        activities = JSON.parse(file);
                        var activity = activities.filter(activities => activities.contentId == activity_id[0])
                        console.log('activity', activity);
                        if(activity.length > 0){
                            $('#h5p-container').append(`<div class="activity-modal">
                                <div class="activity-modal-content">
                                    <p>Max Score: ${activity[0].score}/${activity[0].maxScore}</p>
                                </div>
                            </div>`);
                        }else{
                            $('#h5p-container').append(iframeHTML);
                            window.H5PIntegration = {...setting}
                            var scripts = `<script src="js/h5p/jquery.js"></script>
                            <script src="js/h5p/offline-h5p.js"></script>
                            <script src="js/h5p/h5p-event-dispatcher.js"></script>
                            <script src="js/h5p/h5p-x-api.js"></script>
                            <script src="js/h5p/h5p-x-api-event.js"></script>
                            <script src="js/h5p/h5p-content-type.js"></script>
                            <script src="js/handle-xapi.js"></script>`;
                            $("body").append(scripts);
                        }
                    })
                }, onErrorReadFile = (err) =>{
                    $('#h5p-container').append(iframeHTML);
                    window.H5PIntegration = {...setting}
                    var scripts = `<script src="js/h5p/jquery.js"></script>
                    <script src="js/h5p/offline-h5p.js"></script>
                    <script src="js/h5p/h5p-event-dispatcher.js"></script>
                    <script src="js/h5p/h5p-x-api.js"></script>
                    <script src="js/h5p/h5p-x-api-event.js"></script>
                    <script src="js/h5p/h5p-content-type.js"></script>
                    <script src="js/handle-xapi.js"></script>`;
                    $("body").append(scripts);
                })
                })
                window.H5PIntegration = {...setting}
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
    }, (err) => {
        let json = JSON.stringify(activityPath);
        const blob = new Blob([json], {type:"application/json"});
        console.log("blob", blob);
        let fileUploaded = new FileReader();
        fileUploaded.readAsText(blob);
        console.log("My File--",fileUploaded);
        console.log("error>>>", err);
        var loading = $(".loading");
        loading.delay(200).slideUp();
    });

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
        fs.root.getFile("user-response-offline.json", { create: false, exclusive: false }, function(fileEntry) {
            readFile(fileEntry);
        }, onErrorCreateFile = (err) => { console.log(err) });
    }, onErrorLoadFs = (err) => { console.log(err) })
}

function onOffline() {
    // Handle the offline event
    var data;
    var getOpenedTime = {};
    H5P.externalDispatcher.on('xAPI', function(event) {
        console.log("Api hit");
        var contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']);
        
        if (event.getVerb() === 'attempted') {
            getOpenedTime[contentId] = new Date();
            console.log('getOpenedTime[contentId]', getOpenedTime[contentId]);
        }
        if ((event.getVerb() === 'completed' || event.getVerb() === 'answered') && !event.getVerifiedStatementValue(['context', 'contextActivities', 'parent'])) {
            var score = event.getScore(),
            maxScore = event.getMaxScore(),
            contentId = contentId
            email = event.data.statement.actor.mbox,
            toUnix = function (date) {
                if(date){
                    return Math.round(date.getTime() / 1000);
                }else{
                    return new Date()
                }
                
            };
            console.log('maxScore', maxScore);
            if(maxScore > 0) {
                storeActivityScore(contentId, score, maxScore, toUnix(getOpenedTime[contentId]), toUnix(new Date()), email)
            }
             //   // Post the results
            // const data = {
            //     contentId: contentId,
            //     score: score,
            //     maxScore: maxScore,
            //     opened: toUnix(getOpenedTime[contentId]),
            //     finished: toUnix(new Date()),
            //     time: "",
            //     email: email
            // };
            // console.log("data", data);
            // const stringData = JSON.stringify(data);
            // window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
            //     createFile(fs.root, "user-response-offline.json", false, data);
            // }, onErrorLoadFs = (err) => { console.log(err) });
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