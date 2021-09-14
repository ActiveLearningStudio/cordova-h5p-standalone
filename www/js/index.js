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
    const el = document.getElementById('h5p-container');
    const options = {
    h5pJsonPath:  'https://lnwebworks.com/work/quiz',
    frameJs: '../plugins/h5p-standalone/dist/frame.bundle.js',
    frameCss: '../plugins/h5p-standalone/dist/styles/h5p.css',
    }
    new H5PStandalone.H5P(el, options);

    document.getElementById("downloadActivity").addEventListener("click", () => {
        var dl = new download();
        dl.Initialize({
            fileSystem : cordova.file.externalDataDirectory,
            folder: "h5p-libraries",
            unzip: false,
            remove: false,
            timeout: 0,
            success: DownloaderSuccess,
            error: DownloaderError,
        });
        dl.Get("https://lnwebworks.com/work/quiz.zip");
        function DownloaderError(err) {
            console.log("download error: " + err);
            alert("download error: " + err);
        }
        function DownloaderSuccess() {
            console.log(cordova.file.externalDataDirectory);
            processZip(cordova.file.externalDataDirectory + "h5p-libraries/quiz.zip", cordova.file.externalDataDirectory + "h5p-libraries")
        }
        function processZip(zipSource, destination){
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
                    window.resolveLocalFileSystemURL (cordova.file.externalDataDirectory + "h5p-libraries/quiz.zip", 
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
