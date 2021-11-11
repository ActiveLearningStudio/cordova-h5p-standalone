document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    function moveFile(fileUri, name, activityPath) {
        window.resolveLocalFileSystemURL(fileUri,
            function(fileEntry){
                newFileUri  = activityPath;
                oldFileUri  = fileUri;
                fileExt     = "." + "json";

                newFileName = name + fileExt;
                window.resolveLocalFileSystemURL(newFileUri,
                    function(dirEntry) {
                        // move the file to a new directory and rename it
                        fileEntry.copyTo(dirEntry, newFileName, successCallback = (evt) => {
                            console.log(evt)
                        }, errorCallback);
                    },
                    errorCallback = (err) => {console.log(err)}
                );
            },
            errorCallback = (err) => {console.log(err)}
        );
    }
    // moveFile(cordova.file.applicationDirectory + "www/h5p.json", "h5p", cordova.file.dataDirectory);
    window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/h5p.json", function success(fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                var playlistJSON = JSON.parse(evt.target.result);
                console.log(playlistJSON.settings);
                var setting = playlistJSON.settings;
                console.log(setting);
                window.H5PIntegration = {...setting}
                var scripts = `<script src="js/h5p/jquery.js"></script>
                <script src="js/h5p/h5p.js"></script>
                <script src="js/h5p/h5p-event-dispatcher.js"></script>
                <script src="js/h5p/h5p-x-api.js"></script>
                <script src="js/h5p/h5p-x-api-event.js"></script>
                <script src="js/h5p/h5p-content-type.js"></script>
                <script src="js/h5p/DocumentsUpload.js"></script>`;
                $("body").append(scripts);
            }
            reader.readAsText(file);
        })
    })
    // window.H5PIntegration = {
    //     // "settings": {
    //         "baseUrl": "",
    //         "url": "",
    //         "postUserStatistics": true,
    //         "ajax": {
    //             "setFinished": "",
    //             "contentUserData": ""
    //         },
    //         "saveFreq": 7,
    //         "siteUrl": "",
    //         "l10n": {
    //             "H5P": {
    //                 "fullscreen": "Fullscreen",
    //                 "disableFullscreen": "Disable fullscreen",
    //                 "download": "Download",
    //                 "copyrights": "Rights of use",
    //                 "embed": "Embed",
    //                 "reuseDescription": "Reuse this content.",
    //                 "size": "Size",
    //                 "showAdvanced": "Show advanced",
    //                 "hideAdvanced": "Hide advanced",
    //                 "advancedHelp": "Include this script on your website if you want dynamic sizing of the embedded content:",
    //                 "copyrightInformation": "Rights of use",
    //                 "close": "Close",
    //                 "title": "Title",
    //                 "author": "Author",
    //                 "year": "Year",
    //                 "source": "Source",
    //                 "license": "License",
    //                 "thumbnail": "Thumbnail",
    //                 "noCopyrights": "No copyright information available for this content.",
    //                 "downloadDescription": "Download this content as a H5P file.",
    //                 "copyrightsDescription": "View copyright information for this content.",
    //                 "embedDescription": "View the embed code for this content.",
    //                 "h5pDescription": "Visit H5P.org to check out more cool content.",
    //                 "contentChanged": "This content has changed since you last used it.",
    //                 "startingOver": "You'll be starting over.",
    //                 "confirmDialogHeader": "Confirm action",
    //                 "confirmDialogBody": "Please confirm that you wish to proceed. This action is not reversible.",
    //                 "cancelLabel": "Cancel",
    //                 "confirmLabel": "Confirm",
    //                 "reuse": "Reuse",
    //                 "reuseContent": "Reuse Content"
    //             }
    //         },
    //         "hubIsEnabled": false,
    //         "reportingIsEnabled": true,
    //         "user": {
    //             "name": "Shikha Dawar",
    //             "mail": "shikhawebworks@gmail.com"
    //         },
    //         "editor": {
    //             "filesPath": "",
    //             "fileIcon": {
    //                 "path": "",
    //                 "width": 50,
    //                 "height": 50
    //             },
    //             "ajaxPath": "",
    //             "libraryUrl": "",
    //             "copyrightSemantics": {
    //                 "name": "copyright",
    //                 "type": "group",
    //                 "label": "Copyright information",
    //                 "fields": [
    //                     {
    //                         "name": "title",
    //                         "type": "text",
    //                         "label": "Title",
    //                         "placeholder": "La Gioconda",
    //                         "optional": true
    //                     },
    //                     {
    //                         "name": "author",
    //                         "type": "text",
    //                         "label": "Author",
    //                         "placeholder": "Leonardo da Vinci",
    //                         "optional": true
    //                     },
    //                     {
    //                         "name": "year",
    //                         "type": "text",
    //                         "label": "Year(s)",
    //                         "placeholder": "1503 - 1517",
    //                         "optional": true
    //                     },
    //                     {
    //                         "name": "source",
    //                         "type": "text",
    //                         "label": "Source",
    //                         "placeholder": "",
    //                         "optional": true,
    //                         "regexp": {
    //                             "pattern": "^http[s]?://.+",
    //                             "modifiers": "i"
    //                         }
    //                     },
    //                     {
    //                         "name": "license",
    //                         "type": "select",
    //                         "label": "License",
    //                         "default": "U",
    //                         "options": [
    //                             {
    //                                 "value": "U",
    //                                 "label": "Undisclosed"
    //                             },
    //                             {
    //                                 "value": "CC BY",
    //                                 "label": "Attribution",
    //                                 "versions": [
    //                                     {
    //                                         "value": "4.0",
    //                                         "label": "4.0 International"
    //                                     },
    //                                     {
    //                                         "value": "3.0",
    //                                         "label": "3.0 Unported"
    //                                     },
    //                                     {
    //                                         "value": "2.5",
    //                                         "label": "2.5 Generic"
    //                                     },
    //                                     {
    //                                         "value": "2.0",
    //                                         "label": "2.0 Generic"
    //                                     },
    //                                     {
    //                                         "value": "1.0",
    //                                         "label": "1.0 Generic"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "value": "CC BY-SA",
    //                                 "label": "Attribution-ShareAlike",
    //                                 "versions": [
    //                                     {
    //                                         "value": "4.0",
    //                                         "label": "4.0 International"
    //                                     },
    //                                     {
    //                                         "value": "3.0",
    //                                         "label": "3.0 Unported"
    //                                     },
    //                                     {
    //                                         "value": "2.5",
    //                                         "label": "2.5 Generic"
    //                                     },
    //                                     {
    //                                         "value": "2.0",
    //                                         "label": "2.0 Generic"
    //                                     },
    //                                     {
    //                                         "value": "1.0",
    //                                         "label": "1.0 Generic"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "value": "CC BY-ND",
    //                                 "label": "Attribution-NoDerivs",
    //                                 "versions": [
    //                                     {
    //                                         "value": "4.0",
    //                                         "label": "4.0 International"
    //                                     },
    //                                     {
    //                                         "value": "3.0",
    //                                         "label": "3.0 Unported"
    //                                     },
    //                                     {
    //                                         "value": "2.5",
    //                                         "label": "2.5 Generic"
    //                                     },
    //                                     {
    //                                         "value": "2.0",
    //                                         "label": "2.0 Generic"
    //                                     },
    //                                     {
    //                                         "value": "1.0",
    //                                         "label": "1.0 Generic"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "value": "CC BY-NC",
    //                                 "label": "Attribution-NonCommercial",
    //                                 "versions": [
    //                                     {
    //                                         "value": "4.0",
    //                                         "label": "4.0 International"
    //                                     },
    //                                     {
    //                                         "value": "3.0",
    //                                         "label": "3.0 Unported"
    //                                     },
    //                                     {
    //                                         "value": "2.5",
    //                                         "label": "2.5 Generic"
    //                                     },
    //                                     {
    //                                         "value": "2.0",
    //                                         "label": "2.0 Generic"
    //                                     },
    //                                     {
    //                                         "value": "1.0",
    //                                         "label": "1.0 Generic"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "value": "CC BY-NC-SA",
    //                                 "label": "Attribution-NonCommercial-ShareAlike",
    //                                 "versions": [
    //                                     {
    //                                         "value": "4.0",
    //                                         "label": "4.0 International"
    //                                     },
    //                                     {
    //                                         "value": "3.0",
    //                                         "label": "3.0 Unported"
    //                                     },
    //                                     {
    //                                         "value": "2.5",
    //                                         "label": "2.5 Generic"
    //                                     },
    //                                     {
    //                                         "value": "2.0",
    //                                         "label": "2.0 Generic"
    //                                     },
    //                                     {
    //                                         "value": "1.0",
    //                                         "label": "1.0 Generic"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "value": "CC BY-NC-ND",
    //                                 "label": "Attribution-NonCommercial-NoDerivs",
    //                                 "versions": [
    //                                     {
    //                                         "value": "4.0",
    //                                         "label": "4.0 International"
    //                                     },
    //                                     {
    //                                         "value": "3.0",
    //                                         "label": "3.0 Unported"
    //                                     },
    //                                     {
    //                                         "value": "2.5",
    //                                         "label": "2.5 Generic"
    //                                     },
    //                                     {
    //                                         "value": "2.0",
    //                                         "label": "2.0 Generic"
    //                                     },
    //                                     {
    //                                         "value": "1.0",
    //                                         "label": "1.0 Generic"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "value": "GNU GPL",
    //                                 "label": "General Public License",
    //                                 "versions": [
    //                                     {
    //                                         "value": "v3",
    //                                         "label": "Version 3"
    //                                     },
    //                                     {
    //                                         "value": "v2",
    //                                         "label": "Version 2"
    //                                     },
    //                                     {
    //                                         "value": "v1",
    //                                         "label": "Version 1"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "value": "PD",
    //                                 "label": "Public Domain",
    //                                 "versions": [
    //                                     {
    //                                         "value": "-",
    //                                         "label": "-"
    //                                     },
    //                                     {
    //                                         "value": "CC0 1.0",
    //                                         "label": "CC0 1.0 Universal"
    //                                     },
    //                                     {
    //                                         "value": "CC PDM",
    //                                         "label": "Public Domain Mark"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "value": "C",
    //                                 "label": "Copyright"
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "name": "version",
    //                         "type": "select",
    //                         "label": "License Version",
    //                         "options": []
    //                     }
    //                 ]
    //             },
    //             "metadataSemantics": [
    //                 {
    //                     "name": "title",
    //                     "type": "text",
    //                     "label": "Title",
    //                     "placeholder": "La Gioconda"
    //                 },
    //                 {
    //                     "name": "license",
    //                     "type": "select",
    //                     "label": "License",
    //                     "default": "U",
    //                     "options": [
    //                         {
    //                             "value": "U",
    //                             "label": "Undisclosed"
    //                         },
    //                         {
    //                             "type": "optgroup",
    //                             "label": "Creative Commons",
    //                             "options": [
    //                                 {
    //                                     "value": "CC BY",
    //                                     "label": "Attribution (CC BY)",
    //                                     "versions": [
    //                                         {
    //                                             "value": "4.0",
    //                                             "label": "4.0 International"
    //                                         },
    //                                         {
    //                                             "value": "3.0",
    //                                             "label": "3.0 Unported"
    //                                         },
    //                                         {
    //                                             "value": "2.5",
    //                                             "label": "2.5 Generic"
    //                                         },
    //                                         {
    //                                             "value": "2.0",
    //                                             "label": "2.0 Generic"
    //                                         },
    //                                         {
    //                                             "value": "1.0",
    //                                             "label": "1.0 Generic"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "value": "CC BY-SA",
    //                                     "label": "Attribution-ShareAlike (CC BY-SA)",
    //                                     "versions": [
    //                                         {
    //                                             "value": "4.0",
    //                                             "label": "4.0 International"
    //                                         },
    //                                         {
    //                                             "value": "3.0",
    //                                             "label": "3.0 Unported"
    //                                         },
    //                                         {
    //                                             "value": "2.5",
    //                                             "label": "2.5 Generic"
    //                                         },
    //                                         {
    //                                             "value": "2.0",
    //                                             "label": "2.0 Generic"
    //                                         },
    //                                         {
    //                                             "value": "1.0",
    //                                             "label": "1.0 Generic"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "value": "CC BY-ND",
    //                                     "label": "Attribution-NoDerivs (CC BY-ND)",
    //                                     "versions": [
    //                                         {
    //                                             "value": "4.0",
    //                                             "label": "4.0 International"
    //                                         },
    //                                         {
    //                                             "value": "3.0",
    //                                             "label": "3.0 Unported"
    //                                         },
    //                                         {
    //                                             "value": "2.5",
    //                                             "label": "2.5 Generic"
    //                                         },
    //                                         {
    //                                             "value": "2.0",
    //                                             "label": "2.0 Generic"
    //                                         },
    //                                         {
    //                                             "value": "1.0",
    //                                             "label": "1.0 Generic"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "value": "CC BY-NC",
    //                                     "label": "Attribution-NonCommercial (CC BY-NC)",
    //                                     "versions": [
    //                                         {
    //                                             "value": "4.0",
    //                                             "label": "4.0 International"
    //                                         },
    //                                         {
    //                                             "value": "3.0",
    //                                             "label": "3.0 Unported"
    //                                         },
    //                                         {
    //                                             "value": "2.5",
    //                                             "label": "2.5 Generic"
    //                                         },
    //                                         {
    //                                             "value": "2.0",
    //                                             "label": "2.0 Generic"
    //                                         },
    //                                         {
    //                                             "value": "1.0",
    //                                             "label": "1.0 Generic"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "value": "CC BY-NC-SA",
    //                                     "label": "Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)",
    //                                     "versions": [
    //                                         {
    //                                             "value": "4.0",
    //                                             "label": "4.0 International"
    //                                         },
    //                                         {
    //                                             "value": "3.0",
    //                                             "label": "3.0 Unported"
    //                                         },
    //                                         {
    //                                             "value": "2.5",
    //                                             "label": "2.5 Generic"
    //                                         },
    //                                         {
    //                                             "value": "2.0",
    //                                             "label": "2.0 Generic"
    //                                         },
    //                                         {
    //                                             "value": "1.0",
    //                                             "label": "1.0 Generic"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "value": "CC BY-NC-ND",
    //                                     "label": "Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)",
    //                                     "versions": [
    //                                         {
    //                                             "value": "4.0",
    //                                             "label": "4.0 International"
    //                                         },
    //                                         {
    //                                             "value": "3.0",
    //                                             "label": "3.0 Unported"
    //                                         },
    //                                         {
    //                                             "value": "2.5",
    //                                             "label": "2.5 Generic"
    //                                         },
    //                                         {
    //                                             "value": "2.0",
    //                                             "label": "2.0 Generic"
    //                                         },
    //                                         {
    //                                             "value": "1.0",
    //                                             "label": "1.0 Generic"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "value": "CC0 1.0",
    //                                     "label": "Public Domain Dedication (CC0)"
    //                                 },
    //                                 {
    //                                     "value": "CC PDM",
    //                                     "label": "Public Domain Mark (PDM)"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "value": "GNU GPL",
    //                             "label": "General Public License v3"
    //                         },
    //                         {
    //                             "value": "PD",
    //                             "label": "Public Domain"
    //                         },
    //                         {
    //                             "value": "ODC PDDL",
    //                             "label": "Public Domain Dedication and Licence"
    //                         },
    //                         {
    //                             "value": "C",
    //                             "label": "Copyright"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "name": "licenseVersion",
    //                     "type": "select",
    //                     "label": "License Version",
    //                     "options": [
    //                         {
    //                             "value": "4.0",
    //                             "label": "4.0 International"
    //                         },
    //                         {
    //                             "value": "3.0",
    //                             "label": "3.0 Unported"
    //                         },
    //                         {
    //                             "value": "2.5",
    //                             "label": "2.5 Generic"
    //                         },
    //                         {
    //                             "value": "2.0",
    //                             "label": "2.0 Generic"
    //                         },
    //                         {
    //                             "value": "1.0",
    //                             "label": "1.0 Generic"
    //                         }
    //                     ],
    //                     "optional": true
    //                 },
    //                 {
    //                     "name": "yearFrom",
    //                     "type": "number",
    //                     "label": "Years (from)",
    //                     "placeholder": "1991",
    //                     "min": "-9999",
    //                     "max": "9999",
    //                     "optional": true
    //                 },
    //                 {
    //                     "name": "yearTo",
    //                     "type": "number",
    //                     "label": "Years (to)",
    //                     "placeholder": "1992",
    //                     "min": "-9999",
    //                     "max": "9999",
    //                     "optional": true
    //                 },
    //                 {
    //                     "name": "source",
    //                     "type": "text",
    //                     "label": "Source",
    //                     "placeholder": "https://",
    //                     "optional": true
    //                 },
    //                 {
    //                     "name": "authors",
    //                     "type": "list",
    //                     "field": {
    //                         "name": "author",
    //                         "type": "group",
    //                         "fields": [
    //                             {
    //                                 "label": "Author's name",
    //                                 "name": "name",
    //                                 "optional": true,
    //                                 "type": "text"
    //                             },
    //                             {
    //                                 "name": "role",
    //                                 "type": "select",
    //                                 "label": "Author's role",
    //                                 "default": "Author",
    //                                 "options": [
    //                                     {
    //                                         "value": "Author",
    //                                         "label": "Author"
    //                                     },
    //                                     {
    //                                         "value": "Editor",
    //                                         "label": "Editor"
    //                                     },
    //                                     {
    //                                         "value": "Licensee",
    //                                         "label": "Licensee"
    //                                     },
    //                                     {
    //                                         "value": "Originator",
    //                                         "label": "Originator"
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     "name": "licenseExtras",
    //                     "type": "text",
    //                     "widget": "textarea",
    //                     "label": "License Extras",
    //                     "optional": true,
    //                     "description": "Any additional information about the license"
    //                 },
    //                 {
    //                     "name": "changes",
    //                     "type": "list",
    //                     "field": {
    //                         "name": "change",
    //                         "type": "group",
    //                         "label": "Changelog",
    //                         "fields": [
    //                             {
    //                                 "name": "date",
    //                                 "type": "text",
    //                                 "label": "Date",
    //                                 "optional": true
    //                             },
    //                             {
    //                                 "name": "author",
    //                                 "type": "text",
    //                                 "label": "Changed by",
    //                                 "optional": true
    //                             },
    //                             {
    //                                 "name": "log",
    //                                 "type": "text",
    //                                 "widget": "textarea",
    //                                 "label": "Description of change",
    //                                 "placeholder": "Photo cropped, text changed, etc.",
    //                                 "optional": true
    //                             }
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     "name": "authorComments",
    //                     "type": "text",
    //                     "widget": "textarea",
    //                     "label": "Author comments",
    //                     "description": "Comments for the editor of the content (This text will not be published as a part of copyright info)",
    //                     "optional": true
    //                 },
    //                 {
    //                     "name": "contentType",
    //                     "type": "text",
    //                     "widget": "none"
    //                 },
    //                 {
    //                     "name": "defaultLanguage",
    //                     "type": "text",
    //                     "widget": "none"
    //                 }
    //             ],
    //             // "assets": {
    //             //     "css": [
    //             //         "https://lite.curriki.org/api/storage/h5p/laravel-h5p/css/laravel-h5p.css",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/styles/h5p.css",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/styles/h5p-confirmation-dialog.css"
    //             //     ],
    //             //     "js": [
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/js/jquery.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-event-dispatcher.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-x-api-event.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-x-api.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-content-type.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-confirmation-dialog.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-action-bar.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-core/js/request-queue.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-editor.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/laravel-h5p/js/laravel-h5p.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-help-dialog.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-message-dialog.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progress-circle.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-simple-rounded-button.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-speech-bubble.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-throbber.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-tip.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-slider.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-score-bar.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progressbar.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-ui.js?ver=1.3.9",
    //             //         "https://lite.curriki.org/api/storage/h5p/laravel-h5p/js/laravel-h5p-editor.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5p-hub-client.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-semantic-structure.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-library-selector.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-fullscreen-bar.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-form.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-text.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-html.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-number.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-textarea.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-file-uploader.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-file.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-image.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-image-popup.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-av.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-group.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-boolean.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-list.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-list-editor.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-library.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-library-list-cache.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-select.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-selector-hub.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-selector-legacy.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-dimensions.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-coordinates.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-none.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-metadata.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-metadata-author-widget.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-metadata-changelog-widget.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-pre-save.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/ckeditor/ckeditor.js",
    //             //         "https://lite.curriki.org/api/storage/h5p/h5p-editor/language/en.js"
    //             //     ]
    //             // },
    //             "deleteMessage": "laravel-h5p.content.destoryed",
    //             "apiVersion": {
    //                 "majorVersion": 1,
    //                 "minorVersion": 24
    //             }
    //         },
    //         "loadedJs": [],
    //         "loadedCss": [],
    //         "core": {
    //             "styles": [
    //                 "https://lite.curriki.org/api/storage/h5p/laravel-h5p/css/laravel-h5p.css",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/styles/h5p.css",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/styles/h5p-confirmation-dialog.css",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/styles/h5p-core-button.css"
    //             ],
    //             "scripts": [
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/js/jquery.js",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p.js",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-event-dispatcher.js",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-x-api-event.js",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-x-api.js",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-content-type.js",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-confirmation-dialog.js",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-action-bar.js",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-core/js/request-queue.js",
    //                 "https://lite.curriki.org/api/storage/h5p/h5p-editor/scripts/h5peditor-editor.js",
    //                 "https://lite.curriki.org/api/storage/h5p/laravel-h5p/js/laravel-h5p.js",
    //             ]
    //         },
    //         "contents": {
    //             "cid-35111": {
    //                 "library": "H5P.FindTheWords 1.4",
    //                 "jsonContent": "{\"taskDescription\":\"Find the words from the grid\",\"wordList\":\"one,two,three\",\"behaviour\":{\"orientations\":{\"horizontal\":true,\"horizontalBack\":true,\"vertical\":true,\"verticalUp\":true,\"diagonal\":true,\"diagonalBack\":true,\"diagonalUp\":true,\"diagonalUpBack\":true},\"fillPool\":\"abcdefghijklmnopqrstuvwxyz\",\"preferOverlap\":true,\"showVocabulary\":true,\"enableShowSolution\":true,\"enableRetry\":true},\"l10n\":{\"check\":\"Check\",\"tryAgain\":\"Retry\",\"showSolution\":\"Show Solution\",\"found\":\"@found of @totalWords found\",\"timeSpent\":\"Time Spent\",\"score\":\"You got @score of @total points\",\"wordListHeader\":\"Find the words\"}}",
    //                 "fullScreen": 0,
    //                 "exportUrl": "",
    //                 // "embedCode": "<iframe src=\"https://lite.curriki.org/h5p/embed/35111\" width=\":w\" height=\":h\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe>",
    //                 // "resizeCode": "<script src=\"https://lite.curriki.org/api/storage/h5p/h5p-core/js/h5p-resizer.js\" charset=\"UTF-8\"></script>",
    //                 "url": "",
    //                 "title": "Find the word",
    //                 "displayOptions": {
    //                     "frame": true,
    //                     "export": true,
    //                     "embed": true,
    //                     "copyright": false,
    //                     "icon": true,
    //                     "copy": false
    //                 },
    //                 "contentUserData": [
    //                     {
    //                         "state": "{}"
    //                     }
    //                 ],
    //                 "metadata": {
    //                     "title": "Find the word",
    //                     "license": "U"
    //                 },
    //                 "scripts": [
    //                     "activities/H5P.Timer-0.4/scripts/timer.js?ver=0.4.2",
    //                     "activities/Drop-1.0/js/drop.min.js?ver=1.0.2",
    //                     "activities/H5P.Transition-1.0/transition.js?ver=1.0.4",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-help-dialog.js?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-message-dialog.js?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-progress-circle.js?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-simple-rounded-button.js?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-speech-bubble.js?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-throbber.js?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-tip.js?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-slider.js?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-score-bar.js?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-progressbar.js?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/js/joubel-ui.js?ver=1.3.10",
    //                     "activities/H5P.FindTheWords-1.4/scripts/h5p-find-the-words.js?ver=1.4.4",
    //                     "activities/H5P.FindTheWords-1.4/scripts/h5p-find-the-words-word-grid.js?ver=1.4.4",
    //                     "activities/H5P.FindTheWords-1.4/scripts/h5p-find-the-words-vocabulary.js?ver=1.4.4",
    //                     "activities/H5P.FindTheWords-1.4/scripts/h5p-find-the-words-timer.js?ver=1.4.4",
    //                     "activities/H5P.FindTheWords-1.4/scripts/h5p-find-the-words-counter.js?ver=1.4.4"
    //                 ],
    //                 "styles": [
    //                     "activities/FontAwesome-4.5/h5p-font-awesome.min.css?ver=4.5.4",
    //                     "activities/H5P.FontIcons-1.0/styles/h5p-font-icons.css?ver=1.0.6",
    //                     "activities/Drop-1.0/css/drop-theme-arrows-bounce.min.css?ver=1.0.2",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-help-dialog.css?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-message-dialog.css?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-progress-circle.css?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-simple-rounded-button.css?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-speech-bubble.css?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-tip.css?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-slider.css?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-score-bar.css?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-progressbar.css?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-ui.css?ver=1.3.10",
    //                     "activities/H5P.JoubelUI-1.3/css/joubel-icon.css?ver=1.3.10",
    //                     "activities/H5P.FindTheWords-1.4/styles/h5p-find-the-words.css?ver=1.4.4"
    //                 ]
    //             }
    //         }
    //     // }
    // }
    
}
// var scripts = `<script src="js/h5p/jquery.js"></script>
// <script src="js/h5p/h5p.js"></script>
// <script src="js/h5p/h5p-event-dispatcher.js"></script>
// <script src="js/h5p/h5p-x-api.js"></script>
// <script src="js/h5p/h5p-x-api-event.js"></script>
// <script src="js/h5p/h5p-content-type.js"></script>
// <script src="js/h5p/DocumentsUpload.js"></script>`;
// $("body").append(scripts);