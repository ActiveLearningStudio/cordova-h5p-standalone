document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    const CurrikiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzMiLCJqdGkiOiJlNGUyZTgyZDM4ODkwOGUyOTcyZGUxMzEwOTc4MWJiYzcyZTAwMmEwM2JjZjY5NGNjNzhhZTgyZWU2NThhZGY3MzcyNjRlYTk5YzZlN2Y2MyIsImlhdCI6MTYzMjgwNDQwMCwibmJmIjoxNjMyODA0NDAwLCJleHAiOjE2NjQzNDA0MDAsInN1YiI6IjE0MzciLCJzY29wZXMiOltdfQ.ANU71Nl9syFSa7zKN4XIzEX5rnJ6cJ1g8SsFSz5EDActwpVwuxzpgf_HdpsdOcCwzTwPdy-18kx0HAHKsXE0tsbYY8Ncyf9tYuTlxcKXxXTA4YI29y7-ACAjLHpdTi29hwsTxYltwYYx-TxUYrEjOSrBOPOhluhn56F3DvdGw3JPS40aHZ7bpnJojLw8Ysv5Kpm4wFCjLQewoNpLfu7p53wYQ3jjusR4UDFE3M6I1nrmj3Pfsik4q9uKhimas0nm8PXhGSRbfaJPzTlNOVAcNdZuOMMnLIQt8ENThNZ_9z0HLLSvPc0jjzHEDRyu-khPGEPeFH56Kjm6GUYXwxl3LRPxTMWRcRP6q-JcphfOXkUaUfWilNRJ3jndzvta1vTqmgVUTO6xH3EoNGo_oYhA56b1Gm4UVc50Z3K2jG3Q4omzdkZlufLN9JB5H6eH6cQEEEP9rrSOX_lDRUchbqLDbBC9dghMr7E5R6uDlA9PAT5pcsPsydEvjTcPbv3aa5jRfvO31oixkR2JXGlHi3mTIAxI60eB_3NcgUEehtSwyx7o-epMDE6T6FL2fsBo5Kz_Bi4Cb-2Mem0umbD92kgFny1RBF7Vxj7eosMZXkdI6US6lIiC0bLVwr4bUnOVJ2lR5MNboIqw9IFT7JTLR8qaVfyUs4kTxi4que8JXmmYyDU';
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE) {
        var getOpenedTime = {};
        H5P.externalDispatcher.on('xAPI', function (event) {
            console.log("thissss", event.getVerb());
            var contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']);
        // console.log("contentID", contentId);
            if (event.getVerb() === 'attempted') {
                getOpenedTime[contentId] = new Date();
            }
            if ((event.getVerb() === 'completed' || event.getVerb() === 'answered') && !event.getVerifiedStatementValue(['context', 'contextActivities', 'parent'])) {
                console.log("im here");
                var score = event.getScore(),
                maxScore = event.getMaxScore(),
                contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']),
                email = localStorage.getItem("LOGGED_USER_EMAIL"),
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
                console.log("online", data);

                if (data) {
                    $.ajax({
                        url: "https://lite.curriki.org/api/api/v1/h5p/ajax/reader/finish",
                        type: "POST",
                        headers: {
                            Authorization: "Bearer " + CurrikiToken,
                        },
                        data: data,
                        success: function(result) {
                            console.log(result)
                        }
                    });
                }
            }
        });
    }
}