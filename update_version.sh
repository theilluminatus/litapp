#!/bin/sh

# Usage: ./update_version.sh 1.XX

if [[ $# -eq 0 ]] ; then
    echo 'Please add the next version number as argument like so `./update_version.sh 1.XX`'
    exit 0
fi

function updateFile () {
    FILE=$1
    LINE=$2
    OLD=$3
    NEW=$4
    echo Updating ${FILE}:${LINE}
    sed -i $LINE"s/$OLD/$NEW/" $FILE
}

# Set new package version string
# app.json
FILE=./app.json
LINE=4
newValue=$1
orgLine=$(sed "$LINE!d" $FILE)
orgValue=$(echo $orgLine | grep -o -P '(?<=releases/litapp-).*(?=.apk",)')
updateFile $FILE $LINE $orgValue $1

updateFile ./app.json 3 $orgValue $newValue

# package.json
updateFile ./package.json 3 $orgValue $newValue

# package-lock.json
updateFile ./package-lock.json 3 $orgValue $newValue

# config.xml
updateFile ./config.xml 2 $orgValue $newValue

# _config.yml
updateFile ./docs/_config.yml 7 $orgValue $newValue

# index.md
echo Updating ./docs/index.md
today=$(date --iso)
sed -i "11d" ./docs/index.md
sed -i "9i- [v$newValue](https://theilluminatus.github.io/litapp/releases/litapp-${newValue}.apk) ($today)" ./docs/index.md

# Increment version numbers
# globals.ts
FILE=./src/providers/globals.ts
LINE=17
orgLine=$(sed "$LINE!d" $FILE)
orgValue=$(echo $orgLine | grep -o -P '(?<=private version = ).*(?=;)')
let newValue=$((orgValue + 1))
updateFile $FILE $LINE $orgValue $newValue

# app.json
updateFile ./app.json 2 $orgValue $newValue
