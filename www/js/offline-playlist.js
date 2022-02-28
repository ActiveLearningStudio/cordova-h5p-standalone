document.addEventListener("deviceready", onDeviceReady, false);

const removeLastDirectoryPartOf = (the_url) => {
  var the_arr = the_url.split("/");
  the_arr.pop();
  return the_arr.join("/");
};

function onDeviceReady() {
  getUrlParams = new URLSearchParams(location.search);
  playlistPath = getUrlParams.get("playlistPath");
  const overview_tab = document.getElementById("course-title");
  const descriptionTab = document.getElementById("course-description");
  const thumb_url = document.getElementById("course-image");

  courseId = getUrlParams.get("courseId");
  localStorage.setItem("activeOfflineCourse", courseId);
  var offlinePlaylistHTML = "",
    activitiesPath = "";
  counter = 0;

  window.resolveLocalFileSystemURL(
    removeLastDirectoryPartOf(playlistPath),
    function success(project) {
      var projectReader = project.createReader();
      projectReader.readEntries((projectFolders) => {
        projectFolders.forEach((projectItem) => {
          if (projectItem.isDirectory == false) {
            /**
             * TODO: Read Project.Json file
             */
            window.resolveLocalFileSystemURL(
              projectItem.nativeURL,
              function (fileEntry) {
                fileEntry.file((file) => {
                  var reader = new FileReader();
                  reader.readAsText(file);
                  reader.onloadend = function (evt) {
                    var projectJSON = JSON.parse(evt.target.result);
                    let imgURL = projectJSON.thumb_url
                    overview_tab.innerHTML = `${projectJSON.name}`;
                    descriptionTab.innerHTML = `${projectJSON.description}`;
                    thumb_url.src = imgURL.includes("https://") ? 'img/course-list-img.png' : imgURL;
                  };
                });
              },
              (err) => {
                console.log(err);
              }
            );
          }
        });
      });
    },
    (err) => {
      console.log(err);
    }
  );

  window.resolveLocalFileSystemURL(playlistPath, function success(playlist) {
    var playlistReader = playlist.createReader();

    playlistReader.readEntries(
      (getPlaylists = (playlistFolders) => {
        playlistFolders.forEach((playlistFolder) => {
          if (playlistFolder.isDirectory) {
            // ----- Project Sub Folder -----
            window.resolveLocalFileSystemURL(
              playlistFolder.nativeURL,
              function success(playlistContainer) {
                var playlistContainerReader = playlistContainer.createReader();
                playlistContainerReader.readEntries(
                  (getplaylistContainer = (allPlaylists) => {
                    var activities = [];
                    allPlaylists.forEach((allPlaylist) => {
                      if (allPlaylist.isDirectory) {
                        // --------- Playlist Folder ---------
                        activitiesPath = allPlaylist;
                      } else {
                        window.resolveLocalFileSystemURL(
                          allPlaylist.nativeURL,
                          function success(fileEntry) {
                              let fileName = encodeURIComponent(fileEntry.name);
                              const activitiesRoute = fileEntry.nativeURL.replace(fileName, "activities");
                            fileEntry.file(
                              function (file) {
                                var reader = new FileReader();
                                reader.onloadend = function (evt) {
                                  var playlistJSON = JSON.parse(
                                    evt.target.result
                                  );
                                  playlistJSON.activities.forEach((activity, key) => {
                                    let activityRoute = `${activitiesRoute}/${activity.title}/${activity.h5p_content_id}-h5p.json`
                                    activities.push({key: key, id:`${activity.h5p_content_id}-h5p.json`, path: activityRoute});
                                  });
                                  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
                                    createFile(fs.root, "offlineActivitiesCount.json", false, activities);  
                                  }, onErrorLoadFs = (err) => {console.log(err)});
                                  counter++;
                                  offlinePlaylistHTML += `<div class="card">
                                    <div class="card-header" id="faqhead${counter}">
                                        <a
                                        href="#"
                                        class="btn btn-header-link"
                                        data-toggle="collapse"
                                        data-target="#faq${counter}"
                                        aria-expanded="true"
                                        aria-controls="faq${counter}">
                                        ${playlistJSON.title}
                                        </a>
                                    </div>
                                    <div
                                        id="faq${counter}"
                                        class="collapse 
                                        ${counter == 1 ? "show" : ""}"
                                        aria-labelledby="faqhead${counter}"
                                        data-parent="#faq"
                                    >
                                    <div class="card-body">
                                        <ul>`;
                                  for (const activity of playlistJSON.activities) {
                                      let activityRoute = `${activitiesRoute}/${activity.title}/${activity.h5p_content_id}-h5p.json`
                                    offlinePlaylistHTML += `
                                    <li class='activities-list-items'>
                                        <a href="offline-activity.html?activityPath=${activityRoute}"><img src="img/Vector.svg" />${activity.title}</a>
                                    </li>`;
                                  }
                                  offlinePlaylistHTML += `</ul> </div> </div>`;
                                  $(".accordion").html(offlinePlaylistHTML);
                                  var loading = $(".loading");
                                  loading.delay(200).slideUp();
                                };
                                reader.readAsText(file);
                              },
                              (onErrorReadFile = (err) => {
                                console.log(err);
                              })
                            );
                          }
                        );
                      }
                    });
                  })
                );
              }
            );
          } else {
            // ------ Project.json address here -----
            // variable = playlistFolder
          }
        });
      })
    );
  });
}
