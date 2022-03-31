document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  if (device.platform === "iOS") {
    $(".activity-page").css({ "margin-top": "40px" });
    $(".close-btn").css({ top: "40px" });
  }

  let embededCode =
    '<div id="unity-container" class="unity-desktop">' +
    '<canvas id="unity-canvas" width=960 height=600></canvas>' +
    '<div id="unity-loading-bar">' +
    '<div id="unity-logo"></div>' +
    '<div id="unity-progress-bar-empty">' +
    '<div id="unity-progress-bar-full"></div>' +
    "</div>" +
    "</div>" +
    '<div id="unity-warning"> </div>' +
    '<div id="unity-footer">' +
    '<div id="unity-webgl-logo"></div>' +
    '<div id="unity-fullscreen-button"></div>' +
    '<div id="unity-build-title">Curriki3D</div>' +
    "</div>" +
    "</div>";
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
