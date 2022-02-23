document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  const getUrlParams = location.search.split("activityId="),
    activityId = getUrlParams[1];
  console.log(activityId);
  const buttons = `<div class="prv-next-btn">
    <div style="margin-top:37px !important; margin-left:42px !important" class="btn green-btn prv-btn">Previous</div>
    <div style="margin-top:37px !important; margin-left:42px !important" class="btn green-btn nxt-btn">Next</div>
   </div>`;

  let allIds = [];
  getActivity(activityId, (activity) => {
    console.log("activity ----> ", activity);
    let embededCode = activity.activity.h5p.embed_code;
    let allActivitites = activity.playlist.activities;
    allActivitites.forEach(element => {
      allIds.push(element.id);
    });
    $("#mainBody").append(embededCode);
    $("#mainBody").append(buttons);

    // $(document).on("click",  (evt) => {
    //     for(let i = 0; i < allIds.length; i++){
    //       if(allIds.length == i + 1){
    //         console.log("last element of array");
    //       }
    //       else{
    //         console.log("still there are more elements");
    //         let newUrl = `file://${window.location.pathname}?activityId=${allIds[i]}`
    //         window.location.assign(newUrl);
    //       }
    //     }
    // });

    const scripts = `<script src="js/h5p/h5p-core/js/jquery.js"></script>
                <script src="js/h5p/h5p-core/js/h5p.js"></script>
                <script src="js/h5p/h5p-event-dispatcher.js"></script>
                <script src="js/h5p/h5p-x-api.js"></script>
                <script src="js/h5p/h5p-x-api-event.js"></script>
                <script src="js/h5p/h5p-content-type.js"></script>
                <script src="js/h5p/DocumentsUpload.js"></script>`;
    $("body").append(scripts);
  });
  var current = 0;
  $(document).on("click", '.nxt-btn', (evt) => {
    console.log("next",allIds);
    
    // let newUrl = `file://${window.location.pathname}?activityId=${allIds++}`
    // window.location.assign(newUrl);
  });
  $(document).on("click", '.prv-btn', (evt) => {
    console.log("next",allIds);
  });
}
