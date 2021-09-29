document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var localStorage = window.localStorage,
    token = localStorage.getItem("token"),
    courseContainer = $("#courseContainer");
    console.log(token)
    if (token) {
        $.ajax({
            url: "https://map-lms.curriki.org/webservice/rest/server.php?",
            data: {
                "wstoken": token,
                "moodlewsrestformat": "json",
                "wsfunction": "core_course_get_enrolled_courses_by_timeline_classification",
                "classification": "inprogress"
            },
            success: (response) => {
                console.log(response)
                var courseWraper = '<div class="row mt-3 mb-3">';
                response.courses.forEach(course => {
                    courseWraper += `
                    <div class="col-12">
                    <a href="playlist.html?courseId=${course.id}"><h4>${course.fullname}</h4></a>
                    <img src="${course.courseimage}" class="img-fluid">
                    </div>`;
                });
                courseWraper += '</div>';
                courseContainer.html(courseWraper);
            }
        })
    } else {
        window.location.href = 'index.html';
    }
    $("#logout").on("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    })
}