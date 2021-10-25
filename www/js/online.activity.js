document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    const CurrikiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzMiLCJqdGkiOiJlNGUyZTgyZDM4ODkwOGUyOTcyZGUxMzEwOTc4MWJiYzcyZTAwMmEwM2JjZjY5NGNjNzhhZTgyZWU2NThhZGY3MzcyNjRlYTk5YzZlN2Y2MyIsImlhdCI6MTYzMjgwNDQwMCwibmJmIjoxNjMyODA0NDAwLCJleHAiOjE2NjQzNDA0MDAsInN1YiI6IjE0MzciLCJzY29wZXMiOltdfQ.ANU71Nl9syFSa7zKN4XIzEX5rnJ6cJ1g8SsFSz5EDActwpVwuxzpgf_HdpsdOcCwzTwPdy-18kx0HAHKsXE0tsbYY8Ncyf9tYuTlxcKXxXTA4YI29y7-ACAjLHpdTi29hwsTxYltwYYx-TxUYrEjOSrBOPOhluhn56F3DvdGw3JPS40aHZ7bpnJojLw8Ysv5Kpm4wFCjLQewoNpLfu7p53wYQ3jjusR4UDFE3M6I1nrmj3Pfsik4q9uKhimas0nm8PXhGSRbfaJPzTlNOVAcNdZuOMMnLIQt8ENThNZ_9z0HLLSvPc0jjzHEDRyu-khPGEPeFH56Kjm6GUYXwxl3LRPxTMWRcRP6q-JcphfOXkUaUfWilNRJ3jndzvta1vTqmgVUTO6xH3EoNGo_oYhA56b1Gm4UVc50Z3K2jG3Q4omzdkZlufLN9JB5H6eH6cQEEEP9rrSOX_lDRUchbqLDbBC9dghMr7E5R6uDlA9PAT5pcsPsydEvjTcPbv3aa5jRfvO31oixkR2JXGlHi3mTIAxI60eB_3NcgUEehtSwyx7o-epMDE6T6FL2fsBo5Kz_Bi4Cb-2Mem0umbD92kgFny1RBF7Vxj7eosMZXkdI6US6lIiC0bLVwr4bUnOVJ2lR5MNboIqw9IFT7JTLR8qaVfyUs4kTxi4que8JXmmYyDU';
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
                // console.log(window.H5PIntegration)
                var width = 'width=100%';
                var splitHTML = html.split("<iframe")
                var iframeHTML = splitHTML[0] + "<iframe " + width + splitHTML[1];
                // console.log(iframeHTML)
                window.H5PIntegration = {...setting}
                $("#mainBody").append(iframeHTML);
                var scripts = `<script src="js/h5p/jquery.js"></script>
                <script src="js/h5p/h5p.js"></script>
                <script src="js/h5p/h5p-event-dispatcher.js"></script>
                <script src="js/h5p/h5p-x-api.js"></script>
                <script src="js/h5p/h5p-x-api-event.js"></script>
                <script src="js/h5p/h5p-content-type.js"></script>
                <script src="js/h5p/DocumentsUpload.js"></script>`;
                $("body").append(scripts);

                // H5P.externalDispatcher.on('xAPI', function (event) {
                //     // console.log(event.setObject(event.data.statement.object))
                //     if(event.data.statement.result) {
                //         var xapiRes = JSON.stringify(event.data);
                //         console.log(xapiRes)
                //         $.ajax({
                //             type: "POST",
                //             url: "https://lite.curriki.org/api/api/v1/xapi/statements",
                //             headers: {
                //                 Authorization: 'Bearer '+ CurrikiToken,
                //                 "Content-Type": "application/json",
                //                 "Accept": "application/json",
                //             },
                //             data: JSON.stringify(event.data),
                //             success: (res) => {
                //                 console.log(res)
                //             },
                //             error: (jqXHr, err) => {console.log(err)}
                //         })
                //     }
                // });
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