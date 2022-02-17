document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    getProjects('preview', (project) => {
        const courseWrapper = new CourseHtml(project);
        $("#online-project-container").html(courseWrapper.courseWrapper)
    })
}