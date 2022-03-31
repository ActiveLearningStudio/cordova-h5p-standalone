document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  if (device.platform === "iOS") {
    $(".activity-page").css({ "margin-top": "40px" });
    $(".close-btn").css({ top: "40px" });
  }

  let embededCode = "<h2>raja</h2>";
  $("#mainBody").append(embededCode);

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
}
