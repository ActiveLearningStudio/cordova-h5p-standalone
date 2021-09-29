document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var localStorage = window.localStorage;
    // token = localStorage.getItem("token");
    // if(token) {
    //     window.location.href = 'dashboard.html';
    // }

    $("#loginButton").on('click', function() {
        var userName = $("#userName").val(),
        password = $("#password").val();

        if (userName || password) {
            $.ajax({
                url: "https://map-lms.curriki.org/login/token.php?",
                dataType: "json",
                data: {"username" : userName, "password": password, "service": "moodle_mobile_app"},
                success: (response) => {
                    console.log(response);
                    if(response.token) {
                        localStorage.setItem("token", response.token);
                        window.location.href = 'dashboard.html';
                    }
                    response.error && alert(response.error);
                }
            })
        } else {
            alert("Both fields are required")
        }
    })
}