document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    getUrlParams = location.search.split("activityPath=");
    activityPath = getUrlParams[1];
    console.log(activityPath)

    const offlineElement = document.getElementById('h5p-container');
    const options = {
        h5pJsonPath:  activityPath,
        frameJs: 'plugins/h5p-standalone/dist/mod.frame.bundle.js',
        frameCss: 'plugins/h5p-standalone/dist/styles/h5p.css',
    }
    new H5PStandalone.H5P(offlineElement, options);
}