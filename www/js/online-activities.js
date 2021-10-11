document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    $.ajax({
        url: "https://lite.curriki.org/api/api/v1/projects/3694/playlists?skipContent=false",
        headers: {
            Authorization: "Bearer " + CurrikiToken,
        },
        success: (response) => {
            console.log(response);
            var activitiesContainer = $("#activitiesContainer"),
            activitiesHTML = "",
            activityId = "",
            saveActivityId = {},
            counterId = 0
            counter = 0;

            db.transaction(tx => {
                tx.executeSql('DELETE FROM activities_id');
            })
            response.playlists.forEach((element) => {
                element.activities.forEach((activity) => {
                    $.each(activity.h5p_content, (key, h5pActivity) => {
                        switch (key) {
                            case "id":
                                activityId = h5pActivity;
                                saveActivityId[counterId] = h5pActivity;
                                db.transaction((tx) => {
                                    tx.executeSql('INSERT INTO activities_id (activity_id) VALUES (' + h5pActivity + ')'); 
                                })
                                counterId++;
                            break;
                        }
                    });
                    counter++;
                    if (counter == 1) {
                        activitiesHTML += `<div class="grid-card-block">
                        <div class="grid-wrapper">`;
                    }
                    activitiesHTML += `
                    <div class="grid-card-box">
                        <img src="">
                        <div class="description">
                            <a href="online-activity.html?activityId=${activityId}">
                                <h5>${activity.title}</h5>
                            </a>
                        </div>
                    </div>`;

                    if (counter == 2) {
                        activitiesHTML += '</div></div>';
                        counter = 0;
                    }
                });
            });
            activitiesContainer.html(activitiesHTML);
            console.log(saveActivityId)
        },
    });
}