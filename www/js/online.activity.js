document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  const getUrlParams = location.search.split("activityId="),
    activityId = getUrlParams[1];
  let buttons = `<div class="prv-next-btn mt-5">`;

  let allIds = [];
  let current;

  if (device.platform === "iOS") {
    $(".activity-page").css({"margin-top": "40px"})
    $(".close-btn").css({"top": "40px"});
  }

  getActivity(activityId, (activity) => {
    let embededCode = activity.activity.h5p.embed_code;
    let allActivitites = activity.playlist.activities;
    $("#mainBody").append(embededCode);
    allActivitites.forEach((element,i) => {
      allIds.push({key: i,id:element.id});
      if(element.id == activityId){
        current = i;
        if (i !== 0 && i !== allActivitites.length - 1) {
          buttons += `<button id="${allActivitites[i - 1].id}" 
            class="btn green-btn prv-btn">Previous
          </button>
          <button id= "${allActivitites[i + 1].id}" 
            class="btn green-btn nxt-btn">Next
          </button>
          </div>`;
        } else if (i === 0 && allActivitites.length !== 1) {
          buttons += `<button id="${allActivitites[i + 1].id}" class="btn green-btn">
          Next</button></div>`;
        } else if (i !== 0 && i == allActivitites.length - 1 ) {
          buttons += `<button id="${allActivitites[i - 1].id}" class="btn green-btn">
          Prev</button></div>`;
        } else if (i === 0 && allActivitites.length === 1) {
          buttons += `</div>`;
        }
      }
    });
    $("#mainBody").append(buttons);
    
    const scripts = `<script src="js/h5p/h5p-core/js/jquery.js"></script>
      <script src="js/h5p/h5p-core/js/h5p.js"></script>
      <script src="js/h5p/h5p-event-dispatcher.js"></script>
      <script src="js/h5p/h5p-x-api.js"></script>
      <script src="js/h5p/h5p-x-api-event.js"></script>
      <script src="js/h5p/h5p-content-type.js"></script>
      <script src="js/h5p/DocumentsUpload.js"></script>`;
    $("body").append(scripts);
    var loading = $(".loading");
    loading.delay(200).slideUp();
  });
  
  $(document).on("click", '.green-btn', (evt) => {
    newUrl = `online-activity.html?activityId=${evt.target.id}`;
    window.location.assign(newUrl); 
  });

}
