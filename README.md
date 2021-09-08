# H5P Mobile Application

The H5P Mobile App runs the h5p activity on Mobile and also offline feature is available

## Installation

To Install this App first you need to set up Cordova in your system

```bash
on OS X and Linux:
 $ sudo npm install -g cordova

on Windows:
  C:\>npm install -g cordova
```
Then Clone this repo and run the following commands:

```
cd cordova-h5p-standalone
$ npm install
$ cordova platform add android
```
After that run `$ cordova requirements` to check the system requirements

```
Requirements check results for android:

Java JDK: installed 1.8.0
Android SDK: installed true
Android target: installed android-30,android-28
Gradle: not installed 
Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle 
in your path, or install Android Studio
Some of requirements check failed
``` 
## Creating Build

```
Open platform/android folder in 'Android Studio'
Click on Run the app.
```
