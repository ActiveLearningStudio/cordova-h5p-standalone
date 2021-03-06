document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    // Get Global varibales
    var localStorage = window.localStorage,
    adminToken =  localStorage.getItem("ADITIONAL_TOKEN"),
    moodleLoginURL = localStorage.getItem("MOODLE_LOGIN_URL"),
    moodleBaseURL = localStorage.getItem("MOODLE_BASE_API_URL");

    $("#loginButton").on('click', function() {
        var userName = $("#userName").val(),
        password = $("#password").val();

        if (userName || password) {
            $.ajax({
                url: moodleLoginURL,
                dataType: "json",
                data: {"username" : userName, "password": password, "service": "moodle_mobile_app"},
                success: (response) => {
                    console.log(response);
                    if(response.token) {
                        localStorage.setItem("USER_TOKEN", response.token);
                        console.log("userName", userName);
                        $.ajax({
                            url: moodleBaseURL,
                            dataType: "json",
                            data: {
                                "wstoken": adminToken,
                                "wsfunction": "core_user_get_users",
                                "criteria[0][key]": "username",
                                "criteria[0][value]": userName,
                                "moodlewsrestformat": "json"
                            },
                            success: (userData) => {
                                var userID = userData.users[0].id,
                                userFullName = userData.users[0].fullname,
                                userEmail = userData.users[0].email;
                                localStorage.setItem("USER_ID", userID);
                                localStorage.setItem("LOGGED_USERNAME", userFullName);
                                localStorage.setItem("LOGGED_USER_EMAIL", userEmail);
                                window.location.href = 'dashboard.html';
                            }
                        })
                    }
                    response.error && alert(response.error);
                }
            })
        } else {
            alert("Both fields are required")
        }
    })
}