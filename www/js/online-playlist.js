document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  var getUrlParams = location.search.split("projectId="),
    projectId = getUrlParams[1];
  console.log("courseId-->", projectId);
  const localStorage = window.localStorage,
    imageBaseUrl = localStorage.getItem("CURRIKI_BASE_IMAGE_URL");
  class PlaylistHtml {
    constructor(allPlaylists) {
      this.playlistsWrapper = "";
      let count = 0;
      overviewHtml(allPlaylists.playlists[0].project);
      for (const playlist of allPlaylists.playlists) {
        count++;
        this.playlistsWrapper += `<div class="card">
                <div class="card-header" id="faqhead${count}">
                  <a
                    href="#"
                    class="btn btn-header-link"
                    data-toggle="collapse"
                    data-target="#faq${count}"
                    aria-expanded="true"
                    aria-controls="faq${count}"
                    >${playlist.title}</a
                  >
                </div>
                <div
                    id="faq${count}"
                    class="collapse ${count == 1 ? "show" : ""}"
                    aria-labelledby="faqhead${count}"
                    data-parent="#faq"
                  >
                    <div class="card-body">
                      <ul>`;
        for (const activity of playlist.activities) {
          this.playlistsWrapper += `
            <li>
              <a href="online-activity.html?activityId=${activity.id}"><img src="img/play.png" />${activity.title}</a>
            </li>`;
        }
        this.playlistsWrapper += `</ul> </div> </div>`;
      }
    }
  }
  const overviewHtml = (project) => {
    let imgURL = project.thumb_url.includes("http") && project.thumb_url || imageBaseUrl + project.thumb_url;
    $("#course-title").html(project.name);
    $("#course-image").attr("src", imgURL);
    $("#course-description").html(project.description);
  };

  getPlaylists(projectId, (playlists) => {
    const playlistsHTML = new PlaylistHtml(playlists);
    $(".accordion").html(playlistsHTML.playlistsWrapper);
    var loading = $(".loading");
    loading.delay(200).slideUp();
  });
}
