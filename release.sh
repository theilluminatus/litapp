#!/bin/sh

# Usage: ./release.sh "keypassword" 1.XX

if [[ $# -ne 2 ]] ; then
    echo 'Please add the build key password and next version number as argument like so ` ./release.sh "keypassword" 1.XX `'
    exit 0
fi

if [[ "$(git status)" != *"nothing to commit, working tree clean"* ]]; then
    echo "There were uncommitted changes!"
    exit 0
fi

./update_version.sh $2

ionic cordova build android --prod --release -- -- --keystore=platforms/litapp-key.jks --storePassword=$1 --alias=litapp --password=$1

mv ./platforms/android/app/build/outputs/apk/release/app-release.apk ./docs/releases/litapp-$2.apk

./build_web.sh

git add .

git commit -m "Release v$2"

git tag -a $2

echo "Please check outputs and run: \` git push && git push origin --tags \` or to undo \` git reset --soft HEAD~1 && git tag --delete 1.XX \`"
