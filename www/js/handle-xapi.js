document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    var networkState = navigator.connection.type;
    if (networkState != Connection.NONE) {
        H5P.externalDispatcher.on('xAPI', function (event) {
            console.log(event.data.statement)
        });
    }
}