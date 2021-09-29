/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log(window.localStorage)
    window.sqlitePlugin.echoTest(function() {
        console.log('ECHO test OK');
    });

    $.ajax({
        url: "https://seminary-tools.000webhostapp.com/api/contentjson.php",
        success: (res) => {
            var data = JSON.parse(res);
            var filtered = data.filtered.toString();
            console.log(data)
        }
    })

    const el = document.getElementById('h5p-container');
    const options = {
        h5pJsonPath:  'https://lnwebworks.com/work/quiz',
        frameJs: '../plugins/h5p-standalone/dist/frame.bundle.js',
        frameCss: '../plugins/h5p-standalone/dist/styles/h5p.css',
    }
    new H5PStandalone.H5P(el, options);

    H5P.externalDispatcher.on('xAPI', function (event) {
        switch (event.getVerb()) {
            case 'completed':
                var obtainedScores = event.getScore(),
                maxScores = event.getMaxScore(),
                uuid = device.uuid;
                $.ajax({
                    url: "https://seminary-tools.000webhostapp.com/api/save_data.php",
                    data: {'obtainedScore' : obtainedScores, 'maxScores' : maxScores, 'uuid' : uuid},
                    success: function(result) {
                        console.log(result)
                    }
                });
            break;
        }
    });

    document.getElementById("downloadActivity").addEventListener("click", () => {
        var options = { dimBackground: true };
        SpinnerPlugin.activityStart("Loading...", options);
        var dl = new download();
        dl.Initialize({
            fileSystem : cordova.file.externalDataDirectory,
            folder: "downloaded-activities",
            unzip: false,
            remove: false,
            timeout: 0,
            success: DownloaderSuccess,
            error: DownloaderError,
        });
        dl.Get("https://lite.curriki.org/api/api/v1/h5p/export/35382");
        function DownloaderError(err) {
            console.log("download error: " + err);
            alert("download error: " + err);
        }
        function DownloaderSuccess(evt) {
            console.log(evt)
            function moveFile(fileUri) {
                window.resolveLocalFileSystemURL(fileUri,
                    function(fileEntry){
                        newFileUri  = cordova.file.externalDataDirectory + "downloaded-activities/";
                        oldFileUri  = fileUri;
                        fileExt     = "." + "zip";
        
                        newFileName = "35382" + fileExt;
                        window.resolveLocalFileSystemURL(newFileUri,
                            function(dirEntry) {
                                // move the file to a new directory and rename it
                                fileEntry.moveTo(dirEntry, newFileName, successCallback = (evt) => {
                                    console.log(evt.nativeURL)
                                    processZip(evt.nativeURL, cordova.file.externalDataDirectory + "h5p-libraries/35382")
                                    SpinnerPlugin.activityStop();
                                }, errorCallback);
                            },
                            errorCallback = (err) => {console.log(err)}
                        );
                    },
                    errorCallback = (err) => {console.log(err)}
                );
            }
            moveFile(cordova.file.externalDataDirectory + "downloaded-activities/35382")
            console.log(cordova.file.externalDataDirectory);
        }
        function processZip(zipSource, destination) {
            // Handle the progress event
            var progressHandler = function(progressEvent){
                var percent =  Math.round((progressEvent.loaded / progressEvent.total) * 100);
                // Display progress in the console : 8% ...
                console.log(percent + "%");
            };
            // Proceed to unzip the file
            window.zip.unzip(zipSource, destination, (status) => {
                if(status == 0){
                    console.log("Files succesfully decompressed");
                    window.resolveLocalFileSystemURL (zipSource, 
                        function (fileEntry) { 
                            fileEntry.remove(
                                function () { 
                                    console.log('File is removed.'); 
                                }, 
                                function (error) {
                                    alert('Unable to remove file.');
                                }
                            ); 
                        }, function (error) {console.log(error)}
                     );
                }
                if(status == -1){
                    console.error("Oops, cannot decompress files");
                }
            }, progressHandler);
        }
    })
}
