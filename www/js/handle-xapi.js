document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    const CurrikiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMDkiLCJqdGkiOiJlMjdmOGE1N2IxZWE4NjU2OWJkMjJiMzcwYjViNTZlMDY1NmU3YTNkNzEwYTk4NTEwNTBhN2ZmYjAyOTIzMDRkYzk1YzliNGI3NTYwNDEyYSIsImlhdCI6MTYzNjYxOTUyMSwibmJmIjoxNjM2NjE5NTIxLCJleHAiOjE2NjgxNTU1MjEsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.bSeltFjyT2KHSvkxhBVPNw6sPlAHpx5avAe2gIjzeOFe4cP0VkaHZENBqXKELpcVydbeLnefxzlFX2aAhGvA5y6S_2IDIhSYtuJcVPODZQRHZgJ4eSVSiGHEiR8XtqaXplXtcSgMCL_NqH9DQ8n1D-9DHv2QsAlpwzi_6caDHkCrNeLWHY6PUgbFBOyDnMCtt3kb_oXWg7sSzk0DpuUUnb7mhOaEYGOl5ySYBFsl2l7GZbgusrH0epPjkpmty7m0R5EQm05mDGOX7bcqPRtnKMLSvySMT00NMlgj8u-pcchZ_jzmyGXkcybIxH0Z_jvYjw37rsResJVSWSxN03SMIy6YEJuZ9QGZyCirbUYskC4FY6WKRwkUfiSZH6tM493Ig2bDt0gBsMeyEeBtBp5jxbGrpvEwNh6p9lod_Yy66w_CRTCD4a5JPqwM3GbqUO-CaStdMMzacSagxAqY5eBqPu-mOzr-5psTfpwK4G3kS-6Yp5158HtsVsuQNDKTdv51EzZ71EAp2-QKv3rNcNfhd079u3vQOgtyvnfU8-NEhQucG605_HIFG-ih5VV2RQGx5tr7ztTD2eOcQ3YuoLIpRF5gtnGj1ofLTvwKXc8bMjlGhQUxOTjd2db2c2QM8SsdjZcEOx_hxIVKgZgBujUqaVeqrj3fMv5OtMf4ZJZspls';
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE) {
        var getOpenedTime = {};
        H5P.externalDispatcher.on('xAPI', function (event) {
            console.log(event.data.statement);
            var contentId = event.getVerifiedStatementValue(['object', 'definition', 'extensions', 'http://h5p.org/x-api/h5p-local-content-id']);
        // console.log("contentID", contentId);
            if (event.getVerb() === 'attempted') {
                getOpenedTime[contentId] = new Date();
            }
            if ((event.getVerb() === 'completed' || event.getVerb() === 'answered') && !event.getVerifiedStatementValue(['context', 'contextActivities', 'parent'])) {
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
                        url: "http://localhost:30400/api/v1/h5p/mobile-app-ajax/finish",
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