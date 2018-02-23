# ![Logo](https://theilluminatus.github.io/litapp/images/icon.png "Logo") Litapp
> An unofficial Literotica app

You can find more info and all releases here: https://theilluminatus.github.io/litapp


### Building

`ionic cordova build android --prod --release -- -- --keystore=platforms/android/litapp-key.jks --storePassword="password" --alias=litapp --password="password"`

### Releasing

When releasing a new version you should update the version number in `/providers/globals.ts` and update `/app.json`, `/package.json` and `/config.xml`.