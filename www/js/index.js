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
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  /**
   * Additional Token contains function
   * core_user_create_users
   * core_user_get_users
   */
  const aditionalToken = "70ddd315152670b64cd39138c1999e79",
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
    customApiToken = "f209acdf751f44dfa405db4de68c1e54",
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
    currikiToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0MTE3IiwianRpIjoiOWU0ODhhNDc1MjVhNThlZjgzN2EwODViZDJhZDc0ZTI1YjIwODE5YzhhMmY3Nzg5MWM1YTAwOTljNWM4ZGY2ZTkxMWNhYzY0M2RiYzdmYzQiLCJpYXQiOjE2NjMwNjgyMjYsIm5iZiI6MTY2MzA2ODIyNiwiZXhwIjoxNjk0NjA0MjI2LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.igxfgxtEBmrKWvr16MX_U6vY8weYWpmicCJ0i35S-379kKaUsZbAWDjUlQOlQUQ3uRr0WifHh_iE-NHdwkWySnB3dWujewN6PozUd15YfLtid3ARMzWrJmz2OOWFJC2u2-uSO-gp1Cx-Cv4sR6Px5bSdSw6DLWsxjwZ5cCH4YlQGyGY-oRj7lssai1OQgR5L1z5-v0-L_hLhGTKTyjTZPinG5zRZAmhtxlMYy_pk5fVKnTgAN235yWhnQsb3UhDGxipvvnDSJRwqbGs9CYcOvnAluUWjpkifEHp74ddHQGHFXpoCxx2_HKLJzFVtFG54thJboNj1kpMBhOvGBAjumJ65W5-V6tERIpSSyuuuqgcdgGvHtwtV65PHYnNJA49JtknzIyviVaL2cqaLs6-YiYMtR7I83TSqTs-ZMECrxu_xbCbLu1XaE1_-Kd7InbZ_OGSMljhxu0WRg1E5KEbgfiVXIwRHjV64ipNU-cJGZIOdSlg5FeTSwxmvtxbyl5DmkctejlQOA8FOVK6k87hURByTOrJEwR-PDMD2mc6Nj4h9PEV-5F1xaG77VYWjOpqzfkPyZghjfyKBWRQHaGFOVOU3bQKFZC4ODo7cXdjq_-I9CzqqFj6OdMD43e-JifFfhgEgtxkpSD68s01UxiUJeQ0gpNzo76-EdcppfCjekQc",
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
  localStorage.setItem("CURRIKI_BASE_IMAGE_URL", imageUrl);
}
