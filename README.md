# Unofficial Literotica app

Don't ask.

## Building

`ionic cordova build android --prod --release -- -- --keystore=platforms/android/litapp-key.jks --storePassword="password" --alias=litapp --password="password"`

## Releasing

When releasing a new version you should update the version number in /providers/globals.ts and update the .json file on the remote server accordingly.