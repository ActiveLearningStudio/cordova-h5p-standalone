document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  // Get Global varibales
  var localStorage = window.localStorage,
    token = localStorage.getItem("USER_TOKEN");
  console.log("token: " + token);
  if(token != null) window.location.href = 'dashboard.html';

  document.addEventListener("offline",() => {
    let networkWarning = new NetworkWarnings();
    $("#network-warning").html(networkWarning.alertContent);
  },false);

  document.addEventListener("online",() => {
      // device went online
    $("#network-warning").html("");
  },false);

  $("#username").on("blur", () => {
    if ($(".error-message").hasClass("d-inline"))
      $(".error-message").removeClass("d-inline");
  });

  $("#loginButton").on("click", function (e) {
    $(".main-wrapper").append('<div class="loading"></div>')
    e.preventDefault();
    var userName = $("#username").val(),
      password = $("#PWD").val();
    if (userName || password) {
      userLogin(userName, password, (data) => {
        console.log("data-->", data);
        var loading = $(".loading");
        loading.delay(200).slideUp();
        if (data.token) window.location.href = "dashboard.html";
        if (data.error) {
          console.log("error while login");
          $(".error-message").addClass("d-inline");
        }
      });
    } else {
      console.log("error while login 2");
      $(".error-message").addClass("d-inline");
    }
  });

  $("#reset-password-text").on('click', () => {
    let resetAlert = new ResetPasswordAlertHtml();
    $("#reset-alert").html(resetAlert.alertContent);
  })
}
