const imageBaseUrl = localStorage.getItem("CURRIKI_BASE_IMAGE_URL");
class CourseHtml {
    constructor(allCourses) {
      this.courseWrapper = "";
      allCourses.forEach((course) => {
        this.courseWrapper += `<div class="course-card">
            <div class="card-head-wrap">
              <img src="${course.thumb_url.includes("http") ? course.thumb_url : imageBaseUrl + "/" + course.thumb_url}" />
              <p><a href="playlist.html?projectId=${course.id}">${course.name}</a></p>
            </div>
            <div class="card-footer-wrap">
              <div class="text-list">
                <ul>
                  <li><a href="#">4 Playlists</a></li>
                  <li><a href="#">30 Activities</a></li>
                </ul>
              </div>
              <div class="card-btn">
                <button class="btn green-btn download-project" id="${course.id}">
                  <img src="img/download-vector.svg" /> Download
                </button>
              </div>
            </div>
          </div>`;
      });
    }
  }