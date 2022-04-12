document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  const getUrlParams = location.search.split("activityId="),
    activityId = getUrlParams[1];
  let buttons = `<div class="prv-next-btn mt-5">`;

  let allIds = [];
  let current;
  console.log('activityId', activityId);

  if (device.platform === "iOS") {
    $(".activity-page").css({"margin-top": "40px"})
    $(".close-btn").css({"top": "40px"});
  }
  let embededCode, settings, allJsFiles, allCssFiles ;
  getActivity(activityId, async(activity) => {
    
    embededCode = activity.activity.h5p.embed_code;
    settings = activity.activity.h5p.settings;
    allJsFiles = activity.activity.h5p.settings.loadedJs;
    let filename = [];
    // console.log('allJsFiles', allJsFiles);
    for(var i =0 ;i < allJsFiles.length; i++){
      let file = allJsFiles[i].split('libraries');
      filename.push(file[1]);
    }
    allCssFiles = activity.activity.h5p.settings.loadedCss;
    let styles ;
    for(var i =0 ;i < allCssFiles.length; i++){
      styles += `<link href="${allCssFiles[i]}" type="text/css" rel="stylesheet">`
    }
    $("head").append(styles);

    let script = `<script src="js/h5p/h5p-core/js/jquery.js"></script>
    <script src="js/h5p/h5p-core/js/h5p.js"></script>
    <script src="js/h5p/h5p-event-dispatcher.js"></script>
    <script src="js/h5p/h5p-x-api.js"></script>
    <script src="js/h5p/h5p-x-api-event.js"></script>
    <script src="js/h5p/h5p-content-type.js"></script>
    <script src="js/h5p/DocumentsUpload.js"></script>
    <script src="js/h5p/ejs_production.js"></script>` ;
    for(var i =0 ;i < filename.length; i++){
      script += `<script src="activities${filename[i]}"></script>`
    }
    $("body").append(script);

    let allActivitites = activity.playlist.activities;

    let embed_code = activity.activity.h5p.embed_code
    let index = embed_code.search('content-id=');
    let content_id = embed_code.substr(index+12, 5);

    if(allActivitites.length > 0){
      for(var i = 0; i < allActivitites.length ; i++){
        if(allActivitites[i].id == activityId){
          if(allActivitites[i].source_url == null){
            getScore(content_id, (data) => {
            if(data.length > 0 && data[0].content_id == content_id){
              $("#mainBody").append(`<div class="activity-modal">
                  <div class="activity-modal-content">
                      <p>Max Score: ${data[0].score}/${data[0].max_score}</p>
                      <button id="${data[0].content_id}" class="btn green-btn1 remove-activityId">Retry</button>
                  </div>
              </div>`);
            }else{
              $("#mainBody").append(embededCode);
              window.H5PIntegration = {...activity.activity.h5p.settings}
              const scripts = `<script src="js/h5p/h5p-core/js/jquery.js"></script>
              <script src="js/h5p/h5p-core/js/h5p.js"></script>
              <script src="js/h5p/h5p-event-dispatcher.js"></script>
              <script src="js/h5p/h5p-x-api.js"></script>
              <script src="js/h5p/h5p-x-api-event.js"></script>
              <script src="js/h5p/h5p-content-type.js"></script>
              <script src="js/h5p/DocumentsUpload.js"></script>`;
              
            $("body").append(scripts);
            }
            });
          }else{
            $("#mainBody").append(embededCode);
              window.H5PIntegration = {...activity.activity.h5p.settings}
              const scripts = `<script src="js/h5p/h5p-core/js/jquery.js"></script>
              <script src="js/h5p/h5p-core/js/h5p.js"></script>
              <script src="js/h5p/h5p-event-dispatcher.js"></script>
              <script src="js/h5p/h5p-x-api.js"></script>
              <script src="js/h5p/h5p-x-api-event.js"></script>
              <script src="js/h5p/h5p-content-type.js"></script>
              <script src="js/h5p/DocumentsUpload.js"></script>`;
              
            $("body").append(scripts);
          }
        }else{}
      }
    }
    
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
    var loading = $(".loading");
    loading.delay(200).slideUp();

  });

  
   $(document).on("click", ".remove-activityId", (evt) => {
      console.log('remove id', evt.target.id);
      $(".activity-modal").remove();
      $("#mainBody").append(embededCode);
        window.H5PIntegration = {...settings}
        const scripts = `<script src="js/h5p/h5p-core/js/jquery.js"></script>
        <script src="js/h5p/h5p-core/js/h5p.js"></script>
        <script src="js/h5p/h5p-event-dispatcher.js"></script>
        <script src="js/h5p/h5p-x-api.js"></script>
        <script src="js/h5p/h5p-x-api-event.js"></script>
        <script src="js/h5p/h5p-content-type.js"></script>
        <script src="js/h5p/DocumentsUpload.js"></script>`;
        
      $("body").append(scripts);
    });

  $(document).on("click", '.green-btn', (evt) => {
    newUrl = `online-activity.html?activityId=${evt.target.id}`;
    window.location.assign(newUrl); 
  });
}
