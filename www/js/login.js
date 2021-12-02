document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var localStorage = window.localStorage,
    adminToken =  localStorage.getItem("ADITIONAL_TOKEN");
    // userToken = localStorage.getItem("USER_TOKEN");
    // if(userToken) {
    //     window.location.href = 'dashboard.html';
    // }
    // console.log("sdfs", ADMIN_TOKEN);
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
                        localStorage.setItem("USER_TOKEN", response.token);
                        console.log("userName", userName);
                        $.ajax({
                            url: "https://map-lms.curriki.org/webservice/rest/server.php?",
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