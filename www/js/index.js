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
    /**
     * Additional Token contains function
     * core_user_create_users
     * core_user_get_users
     */
    const 
    aditionalToken =  "70ddd315152670b64cd39138c1999e79",

    /**
     * Admin Token Contains Moodle default functions 
     * Moodle mobile web service
     */
    adminToken = "46bb3c71c49b1a1bac300dce505fa193",

    /**
     * Custom Api Token for Moodle's Custom API's
     * The APIs are
     * 
     * local_curriki_moodle_plugin_create_playlist
     * CurrikiStudio - Create a playlist under Playlists topic.
     * 
     * local_curriki_moodle_plugin_fetch_course
     * CurrikiStudio - Fetch a course for playlists.
     * 
     * local_curriki_moodle_plugin_fetch_project
     * CurrikiStudio - Fetch a project ID using Moodle course ID.
     */
    customApiToken = "817376de1406b8d64988a1cfefcc9d83",

    /**
     * Set Base URL of Currki Studio for API
     */
    baseURL = "https://dev.currikistudio.org/api/api/v1/",

    /**
     * Moodle App base URL for API
     */
    moodleBaseURL = "https://map-lms.curriki.org/webservice/rest/server.php",

    /**
     * Moodle Login API URL
     */
    moodleLoginURL = "https://map-lms.curriki.org/login/token.php",

    /**
     * 
     * Curriki Studio Auth Token to get data from studio
     */
    currikiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMzQzIiwianRpIjoiNzc2OWEwMjdiMTc5MWU1MDJhMjRmZDgzYmNlOGY0MzI5MWRhZDc0NDlkYWU0MDQxOTVmNjZjYWQ1ZWE3Y2I2ZGQyYWIxMDljNjlhMWRlZTkiLCJpYXQiOjE2MzI5OTc1MzksIm5iZiI6MTYzMjk5NzUzOSwiZXhwIjoxNjY0NTMzNTM4LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.TnhPLCJBupzV0c81wywUhoviCjyETzb8kpPokPXNEn6hDFkGqud3cgCWnf4-_8AHCfD10tK6hm9qfZD2g6K6nAfHfwdblBWu_kqeohXHdJsc-4NRKmQYlMcdOiDRt3gLqj656vCo09tFi6Ui5fb9w_FBPgWLuJRuR319hOWt0L5lZ82tnZsoCw8pvBQyqX4MbkXxBDzd7Z3rQfF5-L8YRH8dinguFYpr08-JLV7ZhDsAdRzYtpnPUiAPPQvKBPCosbJ-JJWXUwvRhKGy71ttIzKQ4bbZknWNxRJC4a6d9lU_wcXokeal5EP3H9nqpBtGu9gTqubycVXBHzXQi3pl03QhFtDncgSVie32QQdGKm74WouzUiYoBqSG-oCSfP2AaKNz9RGcTIeG8cSaQfgyzUSKZId-cbcazbplkbXiH25LW8FYrcDtxpO7x7jB3a1kJU1MPs-bv0w5KvHRl5-mIn1BQES_tbNpaFRfBGTO2h-yPWdmGiEuP3yz_0JLfbFt8HgkqL_ATLhSUE9q0IN1-dXGa33Mz22bQHA_tvh9vVygpICPCxM6sXlA3v0WNHhMF6YZIwjir1k-qhlfYuO9fWmudEGzrbhdez1aG-QQAUlGO8NDlEDC3d-6pSH8NiIc0_gNJfGgs4Db0IFe1BVu_OvXoPJs_Up1XK0l2GGRXTA",

    /*image url */
    imageUrl = "https://dev.currikistudio.org/api",
    /**
     *
     * Saving all Variables into the local storage
     * 
     * Initialize local storage 
     */
    localStorage = window.localStorage;

    /**
     * Saving Additonal Token
     */
    localStorage.setItem("ADITIONAL_TOKEN", aditionalToken);

    /**
     * Saving Admin Token
     */
    localStorage.setItem("ADMIN_TOKEN", adminToken);

    /**
     * Saving Custom API Token
     */
    localStorage.setItem("CUSTOM_API_TOKEN", customApiToken);

    /**
     * Saving Base URL for the API
     */
    localStorage.setItem("CURRIKI_BASE_API_URL", baseURL);

    /**
     * Saving Curriki Token into the Local Storage
     */
    localStorage.setItem("CURRIKI_TOKEN", currikiToken);

    /**
     * Saving Moodle Base URL for API
     */
    localStorage.setItem("MOODLE_BASE_API_URL", moodleBaseURL);

    /**
     * Saving Moodle Login URL
     */
    localStorage.setItem("MOODLE_LOGIN_URL", moodleLoginURL);

    /* save image url */
    localStorage.setItem("CURRIKI_BASE_IMAGE_URL", imageUrl)
}
