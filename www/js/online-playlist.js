getUrlParams = location.search.split("courseId=");
courseId = getUrlParams[1];
var localStorage = window.localStorage,
    adminToken = localStorage.getItem("ADMIN_TOKEN");
var dashboardImage = localStorage.getItem(courseId);
document.getElementById('onlineImage').src = dashboardImage;
console.log("dashboard image is", dashboardImage)
$.ajax({
    url: "https://map-lms.curriki.org/webservice/rest/server.php?",
    data: {
        wstoken: adminToken,
        moodlewsrestformat: "json",
        wsfunction: "core_course_get_contents",
        courseid: courseId,
    },
    success: (response) => {
        var playlistContainer = $("#playlistContainer");
        var playlistHTML = "",
            counter = 0;
        response.forEach((element) => {
            if (element.name == "Playlists") {
                element.modules.forEach((module) => {
                    // playlistHTML += `
                    // <div class="row mt-3 mb-3">
                    //     <div class = "col-10 m-auto">
                    //         <a href="online-activities.html">
                    //             <h4 class="text-center">${module.name}</h4>
                    //         </a>
                    //     </div>
                    // </div>`;

                    counter++;

                    if (counter == 1) {
                        playlistHTML += `
                        
                        <div class="grid-card-block">
                                    <div class="grid-wrapper">
`;
                    }
                    playlistHTML += `
                                
                                <div class="grid-card-box">
                                    <img src="">
                                    <div class="description">
                                        <a href="online-activities.html">
                                            <h5>${module.name}</h5>
                                        </a>
                                    </div>
                                </div>`;

                    if (counter == 2) {
                        playlistHTML += "</div></div>";
                        counter = 0;
                    }
                });
            }
        });
        playlistContainer.html(playlistHTML);


    },
});