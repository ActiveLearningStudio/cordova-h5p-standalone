document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var getUrlParams = location.search.split("courseId="),
    courseId = getUrlParams[1];

    var localStorage = window.localStorage,
    dashboardImage = localStorage.getItem(courseId),
    customApiToken = localStorage.getItem("CUSTOM_API_TOKEN"),
    moodleBaseURL = localStorage.getItem("MOODLE_BASE_API_URL"),
    currikiToken = localStorage.getItem("CURRIKI_TOKEN"),
    currikiBaseURL = localStorage.getItem("CURRIKI_BASE_API_URL");
    
    localStorage.setItem('activeCourse', courseId);
    document.getElementById('onlineImage').src = dashboardImage;
    console.log("dashboard image is", dashboardImage)
    $.ajax({
        url: moodleBaseURL,
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
                url: `${currikiBaseURL}projects/${projectID}/playlists?skipContent=false`,
                headers: {
                    Authorization: "Bearer " + currikiToken,
                },
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
        }
    });
}