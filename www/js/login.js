document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  // Get Global varibales
  var localStorage = window.localStorage,
    token = localStorage.getItem("USER_TOKEN");
  console.log("token: " + token);
  if(token != null) window.location.href = 'dashboard.html';

  document.addEventListener(
    "offline",
    () => {
      $("#network-warning").removeClass("d-none");
    },
    false
  );
  document.addEventListener(
    "online",
    function () {
      // device went online
      $("#network-warning").addClass("d-none");
    },
    false
  );

  $("#username").on("blur", () => {
    if ($(".error-message").hasClass("d-inline"))
      $(".error-message").removeClass("d-inline");
  });

  $("#loginButton").on("click", function (e) {
    e.preventDefault();
    var userName = $("#username").val(),
      password = $("#PWD").val();
    if (userName || password) {
      userLogin(userName, password, (data) => {
        console.log(data);
        if (data.token) window.location.href = "dashboard.html";
        if (data.error) $(".error-message").addClass("d-inline");
      });
    } else {
      $(".error-message").addClass("d-inline");
    }
  });
}
