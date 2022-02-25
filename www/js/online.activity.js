document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  const getUrlParams = location.search.split("activityId="),
    activityId = getUrlParams[1];
  const buttons = `<div class="prv-next-btn">
    <button id= "prvBtn" style="margin-top:37px !important; margin-left:42px !important" class="btn green-btn prv-btn">
      Previous
    </button>
    <button id= "nxtBtn" style="margin-top:37px !important; margin-left:42px !important" class="btn green-btn nxt-btn">
      Next
    </button>
   </div>`;

  let allIds = [];
  let current;
  getActivity(activityId, (activity) => {
    let embededCode = activity.activity.h5p.embed_code;
    let allActivitites = activity.playlist.activities;
    $("#mainBody").append(embededCode);
    $("#mainBody").append(buttons);

    allActivitites.forEach((element,i) => {
      allIds.push({key: i,id:element.id});
      if(element.id == activityId){
        current = i;
      }
    });
    
    if(current == allIds.length - 1){
      document.getElementById('nxtBtn').disabled = true;;
    }
    else if(current == allIds[0].key){
      document.getElementById('prvBtn').disabled = true;;
    }

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
  
  $(document).on("click", '.nxt-btn', (evt) => {
    let newUrl ; 
    if(allIds[current].key == 0){
      current = current + 1;
    }
    newUrl = `online-activity.html?activityId=${allIds[current].id}`;
    window.location.assign(newUrl); 
  });
  
  $(document).on("click", '.prv-btn', (evt) => {
    let newUrl ; 
    if(allIds[current].key !== 0){
      current = current - 1;
    }
    newUrl = `online-activity.html?activityId=${allIds[current].id}`;
    window.location.assign(newUrl);
  });
}
