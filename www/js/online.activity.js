document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var getUrlParams = location.search.split("activityId="),
    activityId = getUrlParams[1], activityIdObj = {}, currentActivityKey = '';
    console.log(activityId);

    handlePlayActivity(activityId);

    function handlePlayActivity(activityId) {
        $.ajax({
            url: `https://lite.curriki.org/api/api/v1/h5p/${activityId}`,
            headers: {
                Authorization: 'Bearer '+ CurrikiToken
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
                window.H5PIntegration = {...setting}
                console.log(window.H5PIntegration)
                var width = 'width=100%';
                var splitHTML = html.split("<iframe")
                var iframeHTML = splitHTML[0] + "<iframe " + width + splitHTML[1];
                console.log(iframeHTML)
                $("#mainBody").append(iframeHTML);
                var scripts = `<script src="js/h5p/jquery.js"></script>
                <script src="js/h5p/h5p.js"></script>
                <script src="js/h5p/h5p-event-dispatcher.js"></script>
                <script src="js/h5p/h5p-x-api.js"></script>
                <script src="js/h5p/h5p-x-api-event.js"></script>
                <script src="js/h5p/h5p-content-type.js"></script>
                <script src="js/h5p/DocumentsUpload.js"></script>`;
                $("#mainBody").append(scripts);
                $(document).on("load", ".h5p-iframe", () => {
                    console.log("success")
                })

                H5P.externalDispatcher.on('xAPI', function (event) {
                    // console.log(event.setObject(event.data.statement.object))
                    if(event.data.statement.result) {
                        var xapiRes = JSON.stringify(event.data);
                        console.log(xapiRes)
                        $.ajax({
                            type: "POST",
                            url: "https://lite.curriki.org/api/api/v1/xapi/statements",
                            headers: {
                                Authorization: 'Bearer '+ CurrikiToken,
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                            },
                            data: JSON.stringify(event.data),
                            success: (res) => {
                                console.log(res)
                            },
                            error: (jqXHr, err) => {console.log(err)}
                        })
                    }
                });
            }
        });
    }

    db.transaction(function (tx) { 
        tx.executeSql('SELECT * FROM activities_id', [], function (tx, results) {
            tx.executeSql('SELECT ID FROM activities_id WHERE activity_id = ' + activityId, [], (tx, ids) => {
                console.log("ids", ids.rows[0].id);
                currentActivityKey = ids.rows[0].id;
                var totalActivity = results.rows.length,
                buttonsHTML = `
                <div class="d-flex justify-content-between">
                    <button class="btn btn-info" id="prevButton" ${currentActivityKey == 1 ? "disabled" : ""}>Prev</button>
                    <button class="btn btn-info" id="nextButton" ${currentActivityKey == totalActivity ? "disabled" : ""}>Next</button>
                </div>`;
                $("#mainBody").append(buttonsHTML);
            })
            var allRows = results.rows;
            $.each(results.rows, (key, element) => {
                var activityuKeys = element.id;
                activityIdObj[activityuKeys] = element.activity_id; 
            })
        }, null); 
     });

    $(document).on("click", "#prevButton", () => {
        prevActivityId = parseInt(currentActivityKey) - 1;
        console.log(activityIdObj[prevActivityId]);
        window.location.href = `online-activity.html?activityId=${activityIdObj[prevActivityId]}`;
    })
    $(document).on("click", "#nextButton", () => {
        nextActivityId = parseInt(currentActivityKey) + 1;
        console.log(activityIdObj[nextActivityId]);
        window.location.href = `online-activity.html?activityId=${activityIdObj[nextActivityId]}`;
        // handlePlayActivity(activityIdObj[nextActivityId])
    });
}