document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    const currikiToken = localStorage.getItem("CURRIKI_TOKEN"),
    currikiBaseURL = localStorage.getItem("CURRIKI_BASE_API_URL");
    // const CurrikiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzMiLCJqdGkiOiJlNGUyZTgyZDM4ODkwOGUyOTcyZGUxMzEwOTc4MWJiYzcyZTAwMmEwM2JjZjY5NGNjNzhhZTgyZWU2NThhZGY3MzcyNjRlYTk5YzZlN2Y2MyIsImlhdCI6MTYzMjgwNDQwMCwibmJmIjoxNjMyODA0NDAwLCJleHAiOjE2NjQzNDA0MDAsInN1YiI6IjE0MzciLCJzY29wZXMiOltdfQ.ANU71Nl9syFSa7zKN4XIzEX5rnJ6cJ1g8SsFSz5EDActwpVwuxzpgf_HdpsdOcCwzTwPdy-18kx0HAHKsXE0tsbYY8Ncyf9tYuTlxcKXxXTA4YI29y7-ACAjLHpdTi29hwsTxYltwYYx-TxUYrEjOSrBOPOhluhn56F3DvdGw3JPS40aHZ7bpnJojLw8Ysv5Kpm4wFCjLQewoNpLfu7p53wYQ3jjusR4UDFE3M6I1nrmj3Pfsik4q9uKhimas0nm8PXhGSRbfaJPzTlNOVAcNdZuOMMnLIQt8ENThNZ_9z0HLLSvPc0jjzHEDRyu-khPGEPeFH56Kjm6GUYXwxl3LRPxTMWRcRP6q-JcphfOXkUaUfWilNRJ3jndzvta1vTqmgVUTO6xH3EoNGo_oYhA56b1Gm4UVc50Z3K2jG3Q4omzdkZlufLN9JB5H6eH6cQEEEP9rrSOX_lDRUchbqLDbBC9dghMr7E5R6uDlA9PAT5pcsPsydEvjTcPbv3aa5jRfvO31oixkR2JXGlHi3mTIAxI60eB_3NcgUEehtSwyx7o-epMDE6T6FL2fsBo5Kz_Bi4Cb-2Mem0umbD92kgFny1RBF7Vxj7eosMZXkdI6US6lIiC0bLVwr4bUnOVJ2lR5MNboIqw9IFT7JTLR8qaVfyUs4kTxi4que8JXmmYyDU';
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE) {
        var getOpenedTime = {};
        let fileName, statements = [];
        H5P.externalDispatcher.on('xAPI', function (event) {
            console.log("thissss", event.getVerb());
            console.log('event', event);
            var contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']);
            fileName = contentId
            statements.push(event.data.statement)
            if(event.getVerb() === 'submitted-curriki'){
                $('#myModal').attr('style', `display: block !important`)
                $('.h5p-iframe-wrapper').attr('style', `z-index: unset !important`);
                var saveScore = document.getElementById('yes');
                var retryActivity = document.getElementById('no');
                saveScore.addEventListener('click', function() {
                    $('#myModal').attr('style', `display: none !important`)
                    $('.h5p-iframe-wrapper').attr('style', `z-index: 999 !important`);
                }, false);
                retryActivity.addEventListener('click', function() {
                    window.location.reload();
                }, false);
            }
            window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) { 
                createFile(fs.root, `${contentId}.json`, true, statements);
            })
            // var score = event.getScore(),
            // maxScore = event.getMaxScore(),
            // contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']),
            // email = localStorage.getItem("LOGGED_USER_EMAIL"),
            // toUnix = function (date) {
            //     return Math.round(date.getTime() / 1000);
            // };
            // // Post the results
            // const data = {
            //     contentId: contentId,
            //     score: score,
            //     maxScore: maxScore,
            //     opened: toUnix(getOpenedTime[contentId]),
            //     finished: toUnix(new Date()),
            //     time: "",
            //     email: email
            // };
            // console.log("online---", data);
            // let dd = {"actor":{"objectType":"Agent","account":{"homePage":"home page","name":"1133054333"}},"verb":{"id":"http://adlnet.gov/expapi/verbs/submitted-curriki","display":{"en-US":"submitted-curriki"}},"object":{"id":"http://dev.currikistudio.org/h5p/embed/53889","objectType":"Activity","definition":{"extensions":{"http://h5p.org/x-api/h5p-local-content-id":53889,"http://currikistudio.org/x-api/gclass-alternate-course-id":"https://classroom.google.com/c/NTIxMDQxMjEzMzYw","http://currikistudio.org/x-api/course-name":"Test 3277"},"name":{"en-US":"1758"}}},"context":{"contextActivities":{"category":[{"id":"http://h5p.org/libraries/H5P.Column-1.13","objectType":"Activity"}],"other":[{"objectType":"Activity","id":"https://dev.currikistudio.org/activity/61332/submission/Cg4I7bnYwusNEPX94IOVDw/1653384167030"},{"objectType":"Activity","id":"https://dev.currikistudio.org/activity/61332/submission/Cg4I7bnYwusNEPX94IOVDw"},{"objectType":"Activity","id":"https://dev.currikistudio.org/gclass/521041213360"},{"objectType":"Activity","id":"https://dev.currikistudio.org/lti/521041213360"}]},"platform":"Google Classroom"},"result":{"score":{"min":0,"max":5,"raw":5,"scaled":1},"completion":false,"duration":"PT917.17S"}}
            // if (data) {
            //     $.ajax({
            //         url: `${currikiBaseURL}h5p/ajax/reader/finish`,
            //         type: "POST",
            //         headers: {
            //             Authorization: "Bearer " + currikiToken,
            //         },
            //         data: data,
            //         success: function(result) {
            //             $('#myModal').attr('style', `display: block !important`)
            //             $('.h5p-iframe-wrapper').attr('style', `z-index: unset !important`);
            //             var saveScore = document.getElementById('yes');
            //             var retryActivity = document.getElementById('no');
            //             saveScore.addEventListener('click', function() {
            //                 $('#myModal').attr('style', `display: none !important`)
            //                 $('.h5p-iframe-wrapper').attr('style', `z-index: 999 !important`);
            //             }, false);
            //             retryActivity.addEventListener('click', function() {
            //                 window.location.reload();
            //             }, false);
            //         }
            //     });
            // }
        });
       
    }
}

function createFile(dirEntry, fileName, isAppend, data) {
    // Creates a new file or returns the file if it already exists.
    console.log('dirEntry', dirEntry, fileName, data);
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
        writeFile(fileEntry, data, isAppend);
    }, onErrorCreateFile = (err) => {
        console.log(err);
    });
}

function writeFile(fileEntry, dataObj, isAppend) {
// Create a FileWriter object for our FileEntry (log.txt).
fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function() {
        console.log("Successful file write...");
    };
    fileWriter.onerror = function (e) {
        console.log("Failed file write: ", e);
    };
    // If data object is not passed in,
    // create a new Blob instead.
    // if (isAppend) {
    //     try {
    //         fileWriter.seek(fileWriter.length);
    //     }
    //     catch (e) {
    //         console.log("file doesn't exist!");
    //     }
    // }
    if (!dataObj) {           
        dataObj = new Blob([stringData], { type: 'application/json' });
    }
    fileWriter.write(dataObj);
});
}