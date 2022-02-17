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
  console.log(playlistPath);

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
            console.log({ projectItem });
            console.log({ native_url: projectItem.nativeURL });

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
                    overview_tab.innerHTML = `${projectJSON.name}`;
                    descriptionTab.innerHTML = `${projectJSON.description}`;
                    thumb_url.src = projectJSON.thumb_url;
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

    console.log({ playlistReader });

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
                    console.log({ allPlaylists });
                    var offlineCoursesProgress = JSON.parse(
                      localStorage.getItem("offlineCoursesProgress")
                    );
                    var activities = [];
                    allPlaylists.forEach((allPlaylist) => {
                      if (allPlaylist.isDirectory) {
                        // --------- Playlist Folder ---------
                        console.log("allPlaylist", allPlaylist);
                        activitiesPath = allPlaylist;
                      } else {
                        // --------- If any file inside sub project folder address here. ---------
                        // variable = allPlaylist
                        var playlistFolderPath = allPlaylist.nativeURL,
                          getPlaylistPath = playlistFolderPath.split("/");
                        getPlaylistPath.pop();
                        var newPlaylistFolderPath = getPlaylistPath.join("/");
                        // console.log("getPlaylistPath", newPlaylistFolderPath);
                        // console.log("activitiesPath >>>>>>", activitiesPath.nativeURL);
                        // console.log("filePath >>>>>>", allPlaylist.nativeURL);
                        // console.log("file>>>>>>", allPlaylist);
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
                                  console.log(playlistJSON);
                                  playlistJSON.activities.forEach(
                                    (activity) => {
                                      activities.push(activity.h5p_content_id);
                                    }
                                  );
                                  if (
                                    offlineCoursesProgress[
                                      offlineCoursesProgress.findIndex(
                                        (obj) => obj.id == courseId
                                      )
                                    ] != null
                                  ) {
                                    offlineCoursesProgress[
                                      offlineCoursesProgress.findIndex(
                                        (obj) => obj.id == courseId
                                      )
                                    ].activities = activities;
                                    localStorage.setItem(
                                      "offlineCoursesProgress",
                                      JSON.stringify(offlineCoursesProgress)
                                    );
                                  }
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
                                    <li>
                                        <a href="offline-activity.html?activityPath=${activityRoute}"><img src="img/play.png" />${activity.title}</a>
                                    </li>`;
                                  }
                                  offlinePlaylistHTML += `</ul> </div> </div>`;
                                  $(".accordion").html(offlinePlaylistHTML);
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
