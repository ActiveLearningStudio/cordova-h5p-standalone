document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var getUrlParams = location.search.split("courseId="),
    courseId = getUrlParams[1];
    var localStorage = window.localStorage,
        adminToken = localStorage.getItem("ADMIN_TOKEN");
    var dashboardImage = localStorage.getItem(courseId);
    customApiToken = localStorage.getItem("CUSTOM_API_TOKEN"),
    CurrikiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzMiLCJqdGkiOiJlNGUyZTgyZDM4ODkwOGUyOTcyZGUxMzEwOTc4MWJiYzcyZTAwMmEwM2JjZjY5NGNjNzhhZTgyZWU2NThhZGY3MzcyNjRlYTk5YzZlN2Y2MyIsImlhdCI6MTYzMjgwNDQwMCwibmJmIjoxNjMyODA0NDAwLCJleHAiOjE2NjQzNDA0MDAsInN1YiI6IjE0MzciLCJzY29wZXMiOltdfQ.ANU71Nl9syFSa7zKN4XIzEX5rnJ6cJ1g8SsFSz5EDActwpVwuxzpgf_HdpsdOcCwzTwPdy-18kx0HAHKsXE0tsbYY8Ncyf9tYuTlxcKXxXTA4YI29y7-ACAjLHpdTi29hwsTxYltwYYx-TxUYrEjOSrBOPOhluhn56F3DvdGw3JPS40aHZ7bpnJojLw8Ysv5Kpm4wFCjLQewoNpLfu7p53wYQ3jjusR4UDFE3M6I1nrmj3Pfsik4q9uKhimas0nm8PXhGSRbfaJPzTlNOVAcNdZuOMMnLIQt8ENThNZ_9z0HLLSvPc0jjzHEDRyu-khPGEPeFH56Kjm6GUYXwxl3LRPxTMWRcRP6q-JcphfOXkUaUfWilNRJ3jndzvta1vTqmgVUTO6xH3EoNGo_oYhA56b1Gm4UVc50Z3K2jG3Q4omzdkZlufLN9JB5H6eH6cQEEEP9rrSOX_lDRUchbqLDbBC9dghMr7E5R6uDlA9PAT5pcsPsydEvjTcPbv3aa5jRfvO31oixkR2JXGlHi3mTIAxI60eB_3NcgUEehtSwyx7o-epMDE6T6FL2fsBo5Kz_Bi4Cb-2Mem0umbD92kgFny1RBF7Vxj7eosMZXkdI6US6lIiC0bLVwr4bUnOVJ2lR5MNboIqw9IFT7JTLR8qaVfyUs4kTxi4que8JXmmYyDU';
    localStorage.setItem('activeCourse', courseId);
    document.getElementById('onlineImage').src = dashboardImage;
    console.log("dashboard image is", dashboardImage)
    $.ajax({
        url: "https://map-lms.curriki.org/webservice/rest/server.php",
        type: "get",
        data: {
            "moodlewsrestformat": "json",
            "course_id": courseId,
            "wsfunction": "local_curriki_moodle_plugin_fetch_project",
            "wstoken": customApiToken
        },
        success: (project) => {
            console.log("project", project);
            var projectID = project.projectid;
            $.ajax({
                url: `https://lite.curriki.org/api/api/v1/projects/${projectID}/playlists?skipContent=false`,
                headers: {
                    Authorization: "Bearer " + CurrikiToken,
                },
        // url: "https://map-lms.curriki.org/webservice/rest/server.php?",
        // data: {
        //     wstoken: adminToken,
        //     moodlewsrestformat: "json",
        //     wsfunction: "core_course_get_contents",
        //     courseid: courseId,
        // },
        success: (response) => {
            var playlistContainer = $("#playlistContainer");
            var playlistHTML = "",
                counter = 0, activities = [];
            response.playlists.forEach((element) => {
                counter++;
                if (counter == 1) {
                    playlistHTML += `
                    <div class="grid-card-block">
                    <div class="grid-wrapper">`;
                }
                playlistHTML += `
                            <div class="grid-card-box">
                                <img src="">
                                <div class="description">
                                    <a href="online-activities.html?playlistId=${element.id}">
                                        <h5>${element.title}</h5>
                                    </a>
                                </div>
                            </div>`;

                if (counter == 2) {
                    playlistHTML += "</div></div>";
                    counter = 0;
                }
            });
            var coursesProgress = JSON.parse(localStorage.getItem('coursesProgress'));
            var activeCourse = localStorage.getItem('activeCourse')
            response.playlists.forEach((element) => {
                element.activities.forEach((activity) => {
                    activities.push(activity.h5p_content.id);
                });
            });
            //Update object's property.
            coursesProgress[coursesProgress.findIndex((obj => obj.id == activeCourse))].activities = activities;
            localStorage.setItem('coursesProgress', JSON.stringify(coursesProgress));
            playlistContainer.html(playlistHTML);
        },
    });
    }});
}