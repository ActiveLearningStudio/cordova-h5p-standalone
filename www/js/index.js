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
    var aditionalToken =  "70ddd315152670b64cd39138c1999e79",
    adminToken = "af1c0c8d22e292a5243831a027d84fbd",
    customApiToken = "817376de1406b8d64988a1cfefcc9d83",
    localStorage = window.localStorage;
    localStorage.setItem("ADITIONAL_TOKEN", aditionalToken);
    localStorage.setItem("ADMIN_TOKEN", adminToken);
    localStorage.setItem("CUSTOM_API_TOKEN", customApiToken);
}
