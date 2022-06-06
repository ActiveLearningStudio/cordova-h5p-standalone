document.addEventListener('deviceready', onDeviceReady, false);

var H5P = window.H5P = window.H5P || {};

var getUrlParams = location.search.split("activities"), 
    activityPath = getUrlParams[1], 
    splitActivitypath = activityPath.split("/");
    let id = splitActivitypath[2];
    console.log("id0",  activityPath);
    console.log("id1",  splitActivitypath[2]);
    let activity_id = id.split('-');
function onDeviceReady() {
    let iframeHTML,setting, activities = [];
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
        console.log('activityPath', activityPath);
        fileEntry.file(function (file) {
            console.log('file', file);
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                var playlistJSON = JSON.parse(evt.target.result);
                console.log('playlistJSON', playlistJSON);
                setting = playlistJSON.settings
                var html = playlistJSON.embed_code,
                width = 'width=100%',
                splitHTML = html.split("<iframe");
                iframeHTML = splitHTML[0] + "<iframe " + width + splitHTML[1];
                console.log('activity_id', activity_id[0]);

                window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) { 
                    window.resolveLocalFileSystemURL(`${fs.root.nativeURL}${activity_id[0]}` ,(entry) => { 
                        var reader = entry.createReader();
                            reader.readEntries((listProjects) => {
                                console.log('listProjects[0].nativeURL', listProjects[0].nativeURL);
                                setting.videoPath = listProjects[0].nativeURL;
                        });
                    })
                    fs.root.getFile(`${activity_id[0]}-Offline.json`, { create: false, exclusive: false }, function(fileEntry) { 
                        readLoacalJsonFile(fileEntry, (file) => { 
                            activities = JSON.parse(file);
                            let filterData = activities.filter(function(value){
                                if(value.answer) 
                                  return value
                            })

                            const resultData = activities[activities.length -1];
                            if(filterData && filterData.length){
                                let title = filterData[0].title && filterData[0].title['en-US'];
                                let  response = filterData[0].answer && filterData[0].answer['response'];
                                let newTitle;
                                if(title && title.includes('\n')){
                                  newTitle = title && title.split('\n');
                                  console.log('else 1', newTitle);
                                  newTitle = newTitle[1] === "" ? newTitle : newTitle.shift()
                                }else{
                                  newTitle = title
                                }
                               
                                var html = `<div class="activity-modal">
                                      <div class="activity-modal-content">
                                        <p>Your result: </p>`;
                                for(var i = 0; i < filterData.length; i++){
                                    if(filterData[i].title){
                                        html += `<div class="result-data">
                                            <div class="column"><p>${filterData[i].title && filterData[i].title['en-US']}</p></div>
                                            <div class="column"><p>${filterData[i].answer && filterData[i].answer.response}</p></div>
                                            <div class="column">
                                                ${filterData[i].answer.score && `<p>${filterData[i].answer.score.raw}/${filterData[i].answer.score.max}</p>`}
                                                ${filterData[0].answer.duration && `<p>${filterData[0].answer.duration}</p>`}
                                                
                                            </div>
                                            </div>`
                                    }
                                }
                                html += `<button type="button" id="${resultData.object && resultData.object.definition.extensions['http://h5p.org/x-api/h5p-local-content-id']}" class="btn green-btn1 remove-activityId">Retry</button>
                                </div> </div>`
                                $("#h5p-container").append(html);
                            }
                            
                            else{
                               
                                $('#h5p-container').append(iframeHTML);
                                window.H5PIntegration = {...setting}
                                let scripts = `<script src="js/h5p/jquery.js"></script>
                                <script src="js/h5p/offline-h5p.js"></script>
                                <script src="js/h5p/h5p-event-dispatcher.js"></script>
                                <script src="js/h5p/h5p-x-api.js"></script>
                                <script src="js/h5p/h5p-x-api-event.js"></script>
                                <script src="js/h5p/h5p-content-type.js"></script>
                                <script src="js/h5p/ejs_production.js"></script>
                                <script src="js/h5p/h5p-action-bar.js"></script>
                                <script src="js/h5p/h5p-confirmation-dialog.js"></script>
                                <script src="js/handle-xapi.js"></script>`;
                                $("body").append(scripts);
                                    
                            }
                        })
                    }, onErrorReadFile = (err) =>{
                        console.log('not able to read file');
                        $('#h5p-container').append(iframeHTML);
                        window.H5PIntegration = {...setting};
                        let scripts = `<script src="js/h5p/jquery.js"></script>
                        <script src="js/h5p/offline-h5p.js"></script>
                        <script src="js/h5p/h5p-event-dispatcher.js"></script>
                        <script src="js/h5p/h5p-x-api.js"></script>
                        <script src="js/h5p/h5p-x-api-event.js"></script>
                        <script src="js/h5p/h5p-content-type.js"></script>
                        <script src="js/h5p/ejs_production.js"></script>
                        <script src="js/h5p/h5p-action-bar.js"></script>
                        <script src="js/h5p/h5p-confirmation-dialog.js"></script>
                        <script src="js/handle-xapi.js"></script>`;
                        $("body").append(scripts);
                    })    
                })
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

    $(document).on("click", ".remove-activityId", (evt) => {
        window.resolveLocalFileSystemURL(`file:///storage/emulated/0/Android/data/com.curriki.reader/cache/${activity_id[0]}-Offline.json`,function (fileEntry) {
            fileEntry.remove(
              function () {console.log("File is removed.");},
              function (error) { console.log("Unable to remove file. " + error); }
            );
        },function (error) { console.log('error', error);});
        window.location.reload();
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
    console.log('networkState', networkState);
    // window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
    //     fs.root.getFile("user-response-offline.json", { create: false, exclusive: false }, function(fileEntry) {
    //         readFile(fileEntry);
    //     }, onErrorCreateFile = (err) => { console.log(err) });
    // }, onErrorLoadFs = (err) => { console.log(err) })
}

function onOffline() {
    // Handle the offline event
    var data;
    var getOpenedTime = {};
    if (window.H5PIntegration) {
        let statements = [];
        H5P.externalDispatcher.on('xAPI', function(event) {
            var contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']);
            console.log('event.getVerb()', event.getVerb());
            statements.push(event.data.statement)
            if(event.data.statement.result && event.data.statement.object.definition.description){
                let summary = {
                     answer: event.data.statement.result,
                     title: event.data.statement.object.definition.description
                 };
                 statements.push(event.data.statement, summary);
            }
            if(event.getVerb() === 'completed'){
                console.log("completed called");
                $('#myModal').attr('style', `display: block !important`)
                $('.h5p-iframe-wrapper').attr('style', `z-index: unset !important`);
                var saveScore = document.getElementById('yes');
                var retryActivity = document.getElementById('no');
                saveScore.addEventListener('click', function() {
                    // console.log("yes");
                    $('#myModal').attr('style', `display: none !important`)
                    $('.h5p-iframe-wrapper').attr('style', `z-index: 999 !important`);
                    // window.location.reload();
                }, false);
                retryActivity.addEventListener('click', function() {
                    window.resolveLocalFileSystemURL(`file:///storage/emulated/0/Android/data/com.curriki.reader/cache/${contentId}-Offline.json`,function (fileEntry) {
                          fileEntry.remove(
                            function () {console.log("File is removed.");},
                            function (error) { console.log("Unable to remove file. " + error); }
                          );
                    },function (error) { console.log('error', error);});
                    //   window.location.reload();
                }, false);
                    
            }
            window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) { 
                createFile(fs.root, `${contentId}-Offline.json`, true, statements);
            })

            console.log('statements', statements);
        });
    }
}

function createFile(dirEntry, fileName, isAppend, data) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {
        writeFile(fileEntry, data);
    }, onErrorCreateFile = (err) => { console.log(err) });

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
                    console.log('result ---', result);
                }
            });
        };
        reader.readAsText(file);

    }, onErrorReadFile = (err) => { console.log(err) });
}