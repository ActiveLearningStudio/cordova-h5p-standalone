document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var getUrlParams = location.search.split("activityId="),
    activityId = getUrlParams[1], activityIdObj = {}, currentActivityKey = '',
    currikiToken = localStorage.getItem("CURRIKI_TOKEN"),
    currikiBaseURL = localStorage.getItem("CURRIKI_BASE_API_URL");
    console.log(activityId);

    handlePlayActivity(activityId);

    function handlePlayActivity(activityId) {
        $.ajax({
            url: `${currikiBaseURL}h5p/${activityId}`,
            headers: {
                Authorization: 'Bearer '+ currikiToken
            },
            success: (res) => {
                console.log(res.settings);
                var setting = res.settings;
                var user = res.user;
                var html = '';
                var obj = '';
                $.each(res, (key, val) => {
                    if (typeof val == "object") {
                        obj += val;
                    } else if (typeof val == "string") {
                        html += val;
                    }
                });
                var userObj = {};
                userObj["user"] = {...user};
                // console.log(window.H5PIntegration)
                var width = 'width=100%';
                var splitHTML = html.split("<iframe")
                var iframeHTML = splitHTML[0] + "<iframe " + width + splitHTML[1];
                // console.log(iframeHTML)
                window.H5PIntegration = {...setting}
                $("#mainBody").append(iframeHTML);
                var scripts = `<script src="js/h5p/h5p-core/js/jquery.js"></script>
                <script src="js/h5p/h5p-core/js/h5p.js"></script>
                <script src="js/h5p/h5p-event-dispatcher.js"></script>
                <script src="js/h5p/h5p-x-api.js"></script>
                <script src="js/h5p/h5p-x-api-event.js"></script>
                <script src="js/h5p/h5p-content-type.js"></script>
                <script src="js/h5p/DocumentsUpload.js"></script>`;
                $("body").append(scripts);
                
                H5P.externalDispatcher.on('xAPI', function(event) {
                    if ((event.getVerb() === 'completed' || event.getVerb() === 'answered') && !event.getVerifiedStatementValue(['context', 'contextActivities', 'parent'])) {
                        var contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']);
                        var coursesProgress = JSON.parse(localStorage.getItem('coursesProgress'));
                        var activeCourse = coursesProgress[coursesProgress.findIndex((obj => obj.id == localStorage.getItem('activeCourse')))];
                        var completed_activities = activeCourse.completed_activities;
                        if(completed_activities.indexOf(contentId) === -1) {
                            completed_activities.push(contentId);
                        }
                        activeCourse.progress = ((completed_activities.length)*100)/activeCourse.activities.length;
                        localStorage.setItem('coursesProgress', JSON.stringify(coursesProgress));
                    }
                });
            }
        });
    }

    // db.transaction(function (tx) { 
    //     tx.executeSql('SELECT * FROM activities_id', [], function (tx, results) {
    //         tx.executeSql('SELECT ID FROM activities_id WHERE activity_id = ' + activityId, [], (tx, ids) => {
    //             console.log("ids", ids.rows[0].id);
    //             currentActivityKey = ids.rows[0].id;
    //             var totalActivity = results.rows.length,
    //             buttonsHTML = `
    //             <div class="d-flex justify-content-between">
    //                 <button class="btn btn-info" id="prevButton" ${currentActivityKey == 1 ? "disabled" : ""}>Prev</button>
    //                 <button class="btn btn-info" id="nextButton" ${currentActivityKey == totalActivity ? "disabled" : ""}>Next</button>
    //             </div>`;
    //             $("#mainBody").append(buttonsHTML);
    //         })
    //         var allRows = results.rows;
    //         $.each(results.rows, (key, element) => {
    //             var activityuKeys = element.id;
    //             activityIdObj[activityuKeys] = element.activity_id; 
    //         })
    //     }, null); 
    //  });

    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
        fs.root.getFile("activitiesId.txt", {create: false, exclusive: false}, function(fileEntry) {
            // console.log("file", fileEntry)
            readFile(fileEntry);
        }, onErrorCreateFile = (err) => {console.log(err)});
    }, onErrorLoadFs = (err) => {console.log(err)})
    
    function readFile(fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();
            // console.log("reader", reader);
            reader.onloadend = function() {
                // console.log("blob", this.result)
                activityIdObj = this.result.split(",")

                var currentActivity = getKeyByValue(activityIdObj, activityId),
                countActivity = Object.keys(activityIdObj).length,
                totalActivity = countActivity - 1,
                buttonsHTML = `
                <div class="d-flex justify-content-between btn-wrap pb-3">
                    <button class="btn btn-info" id="prevButton" ${currentActivity == 0 ? "disabled" : ""}>Prev</button>
                    <button class="btn btn-info" id="nextButton" ${currentActivity == totalActivity ? "disabled" : ""}>Next</button>
                </div>`;
                $("#mainBody").append(buttonsHTML);
            };
            reader.readAsText(file);
    
        }, onErrorReadFile = (err) => {console.log(err)});
    }

    // $(document).on("click", "#prevButton", () => {
    //     prevActivityId = parseInt(currentActivityKey) - 1;
    //     console.log(activityIdObj[prevActivityId]);
    //     window.location.href = `online-activity.html?activityId=${activityIdObj[prevActivityId]}`;
    // })
    // $(document).on("click", "#nextButton", () => {
    //     nextActivityId = parseInt(currentActivityKey) + 1;
    //     console.log(activityIdObj[nextActivityId]);
    //     window.location.href = `online-activity.html?activityId=${activityIdObj[nextActivityId]}`;
    //     // handlePlayActivity(activityIdObj[nextActivityId])
    // });

    $(document).on("click", "#prevButton", () => {
        var currentActivityId = getKeyByValue(activityIdObj, activityId),
        prevActivityId = parseInt(currentActivityId) - 1;
        console.log(activityIdObj[prevActivityId]);
        window.location.href = `online-activity.html?activityId=${activityIdObj[prevActivityId]}`;
    })
    $(document).on("click", "#nextButton", () => {
        var currentActivityId = getKeyByValue(activityIdObj, activityId),
        nextActivityId = parseInt(currentActivityId) + 1;
        console.log(activityIdObj[nextActivityId]);
        window.location.href = `online-activity.html?activityId=${activityIdObj[nextActivityId]}`;
        // handlePlayActivity(activityIdObj[nextActivityId])
    })

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] == value);
    }

    
}