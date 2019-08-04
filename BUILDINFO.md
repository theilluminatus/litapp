
# Building and Releasing

> Use node v8 x86 for best compatibility!

1. `npm i && npm i -g ionic@3.9.2 cordova@8.1.1`
2. `npm start`
3. Open `localhost:8100` in Chrome with `--disable-web-security`

Run `npm rebuild node-sass` after changing node versions.

## Debugging

`npm run android`

You can easily make a separate debug version of the app by adding the following lines to the [build.gradle](/platforms/android/app/build.gradle) file at `line 169`:

```gradle
buildTypes {
    debug {
        applicationIdSuffix '.debug'
        versionNameSuffix '-DEBUG'
    }
}
```

If you want to debug an android production build, add the following line to the `onCreate` method in [MainActivity.java](./platforms/android/app/src/main/java/com/illuminatus/litapp/MainActivity.java):

```java
import android.webkit.WebView;
...
WebView.setWebContentsDebuggingEnabled(true);
```

## Releasing

When releasing a new version you should update the version number in:

- [`/src/providers/globals.ts`](./src/providers/globals.ts#L17)
- [`/app.json`](./app.json#L2-L3)
- [`/package.json`](./package.json#L3)
- [`/package-lock.json`](./package-lock.json#L3)
- [`/config.xml`](./config.xml#L2)
- [`/docs/index.md`](./docs/index.md#L6)
- [`/docs/_config.yml`](./docs/_config.yml#L6)

In total, there should be 8 changes to commit including a new apk. Default commit message is "Release vX.XX"

Make sure `setWebContentsDebuggingEnabled` isn't still set in [MainActivity.java](./platforms/android/app/src/main/java/com/illuminatus/litapp/MainActivity.java).

Also don't forget to add a tag after committing and pushing with `git tag -a x.x` and `git push origin --tags`.

### Building apk

```bash
ionic cordova build android --prod --release -- -- --keystore=platforms/litapp-key.jks --storePassword="abc123" --alias=litapp --password="abc123"
```

The output can be found in [`/platforms/android/app/build/outputs/apk/release/`](`./platforms/android/app/build/outputs/apk/release/`).