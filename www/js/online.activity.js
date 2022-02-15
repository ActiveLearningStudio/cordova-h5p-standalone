document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  const getUrlParams = location.search.split("activityId="),
    activityId = getUrlParams[1];
  console.log(activityId);

  getActivity(activityId, (activity) => {
    console.log("activity ----> ", activity);
    let embededCode = activity.activity.h5p.embed_code;
    $("#mainBody").html(embededCode);
    const scripts = `<script src="js/h5p/h5p-core/js/jquery.js"></script>
                <script src="js/h5p/h5p-core/js/h5p.js"></script>
                <script src="js/h5p/h5p-event-dispatcher.js"></script>
                <script src="js/h5p/h5p-x-api.js"></script>
                <script src="js/h5p/h5p-x-api-event.js"></script>
                <script src="js/h5p/h5p-content-type.js"></script>
                <script src="js/h5p/DocumentsUpload.js"></script>`;
    $("body").append(scripts);
  });
}
