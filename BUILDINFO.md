## Debugging

`ionic cordova run android`

You can easily make a separate debug version of the app by adding the following lines to the `/platforms/android/app/build.gradle` file at `line 169`: 

```
buildTypes {
    debug {
        applicationIdSuffix '.debug'
        versionNameSuffix '-DEBUG'
    }
}
```

If you want to debug an android production build, add the following line to the `onCreate` method in `platforms/android/app/src/main/java/com/illuminatus/litapp/MainActivity.java`:
```
import android.webkit.WebView;
...
WebView.setWebContentsDebuggingEnabled(true);
```

## Releasing

When releasing a new version you should update the version number in:
- `/providers/globals.ts`
- `/app.json`
- `/package.json`
- `/package-lock.json`
- `/config.xml`
- `/docs/index.md`
- `/docs/_config.yml`

Also don't forget to add a tag after committing and pushing with `git tag -a x.x` and `git push origin --tags`.

#### Building

`ionic cordova build android --prod --release -- -- --keystore=platforms/litapp-key.jks --storePassword="abc123" --alias=litapp --password="abc123"`

The output can be found in `/platforms/android/app/build/outputs/apk/release/`.