document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var getUrlParams = location.search.split("courseId="),
    courseId = getUrlParams[1];
    console.log("courseId-->", courseId);

    var localStorage = window.localStorage,
    dashboardImage = localStorage.getItem(courseId),
    customApiToken = localStorage.getItem("CUSTOM_API_TOKEN"),
    moodleBaseURL = localStorage.getItem("MOODLE_BASE_API_URL"),
    currikiToken = localStorage.getItem("CURRIKI_TOKEN"),
    imageUrl = localStorage.getItem("CURRIKI_BASE_IMAGE_URL"),
    currikiBaseURL = localStorage.getItem("CURRIKI_BASE_API_URL");
    
    localStorage.setItem('activeCourse', courseId);
    document.getElementById('onlineImage').src = dashboardImage;
    console.log("dashboard image is", dashboardImage)
   
    $.ajax({
        url: `${currikiBaseURL}projects/${courseId}/playlists?skipContent=false`,
        headers: {
            Authorization: "Bearer " + currikiToken,
        },
        success: (response) => {
            var playlistContainer = $("#playlistContainer");
            var overviewContainer = $("#overviewContainer");
            var imageContainer = $("#onlineImageShow");

            var playlistHTML = "";
            var overviewHTML = "";
            var imageHTML= "";
                counter = 0, activities = [];
            
            overviewHTML +=     
                `<div>
                    <h3>Introduction to<br> ${response.playlists[0].project.name}</h3>
                    <p>${response.playlists[0].project.description}</p>
                    
                </div>`;
            imageHTML += `<img src="${response.playlists[0].project.thumb_url.includes('https') ? response.playlists[0].project.thumb_url : imageUrl+response.playlists[0].project.thumb_url}" id="onlineImage">`

            response.playlists.forEach((element, index) => {
                // console.log("index--->", index);
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
                    playlistHTML += `<div></div>`;
                    overviewHTML +=  `<div></div>`;
                    imageHTML +=  `<div></div>`;
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
            // coursesProgress[coursesProgress.findIndex((obj => obj.id == activeCourse))].activities = activities;
            // localStorage.setItem('coursesProgress', JSON.stringify(coursesProgress));
            playlistContainer.html(playlistHTML);
            overviewContainer.html(overviewHTML);
            imageContainer.html(imageHTML);
        },
    });
       
}