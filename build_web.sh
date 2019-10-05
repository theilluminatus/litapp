#!/bin/sh

rm -rf build/*
rm -rf www/*

# Add all needed env variables here
CORS_PROXY=https://litapp-cors.herokuapp.com/ ionic build --prod

mkdir -p docs/app
rm -rf docs/app/*
cp -r www/* docs/app
rm -rf build/*

STYLE=$(cat <<-END
html { display: flex; justify-content: center; align-items: center; }
body { max-width: 50vmin; max-height: 85vmin; min-width: 400px; min-height: 680px; }
END
)
echo $STYLE >> docs/app/build/main.css
