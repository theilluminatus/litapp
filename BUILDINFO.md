
# Building and Releasing

> Run `npm rebuild node-sass` after changing node versions.

1. `npm i && npm i -g ionic@3.9.2 cordova@8.1.2`
2. `npm start`
3. Open `localhost:8100` in Chrome with parameter `--disable-web-security`

Running the app with `npm start` will initialize the default environment variables in `src/app/env.ts`, from then on you can edit them.

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

### Recreating the Android platform

Sometimes necessary when something breaks while installing/removing plugins

- `ionic cordova platform rm android`
- `ionic cordova platform add android`

## Releasing

> This whole process was automated with `./release.sh`. The following steps are kept here as documentation.

When releasing a new version you can run `./update_version.sh 1.XX`, this script should update the version number in:

- [`src/providers/globals.ts`](./src/providers/globals.ts#L17)
- [`app.json`](./app.json#L2-L3) x2
- [`package.json`](./package.json#L3)
- [`package-lock.json`](./package-lock.json#L3)
- [`config.xml`](./config.xml#L2)
- [`docs/index.md`](./docs/index.md#L6) x2
- [`docs/_config.yml`](./docs/_config.yml#L7)

In total, there should be 8 changes to commit including a new apk. Default commit message is "Release vX.XX"

Make sure `setWebContentsDebuggingEnabled` isn't still set in [MainActivity.java](./platforms/android/app/src/main/java/com/illuminatus/litapp/MainActivity.java).

Also don't forget to add a tag after committing and pushing with `git tag -a x.x` and `git push origin --tags`.

### Building apk

```bash
ionic cordova build android --prod --release -- -- --keystore=platforms/litapp-key.jks --storePassword="abc123" --alias=litapp --password="abc123"
```

The output can be found in [`platforms/android/app/build/outputs/apk/release/`](`./platforms/android/app/build/outputs/apk/release/`).

### Building web app

Make sure the CORS_PROXY environment variable is still correct and run `./build_web.sh`.
Commit the eventual changes.

### Updating CORS proxy

Clone the cors-proxy repo by running `git submodule update` in the root directory.

On first setup:

1. `heroku login`
2. `heroku git:remote -a litapp-cors`
3. `heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack`
4. `heroku buildpacks:add heroku/nodejs`
5. `heroku config:set PROJECT_PATH=proxy-cors`

Deploying:
```bash
git push heroku `git subtree split --prefix proxy-cors master`:master --force
```
