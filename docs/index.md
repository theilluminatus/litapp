# ![Logo](https://theilluminatus.github.io/litapp/images/icon.png "Logo") Litapp

## Releases (Android)

- [v1.23](https://theilluminatus.github.io/litapp/releases/litapp-1.23.apk) (2020-09-28)
- [v1.22](https://theilluminatus.github.io/litapp/releases/litapp-1.22.apk) (2020-08-08)
- [v1.21](https://theilluminatus.github.io/litapp/releases/litapp-1.21.apk) (2020-05-10)

Older changelogs can be found on [the releases page](https://github.com/theilluminatus/litapp/releases) (Press `...` after version). Older APKs can be found in the [releases folder](https://github.com/theilluminatus/litapp/tree/master/docs/releases).

## Features

- Read stories
- Automatically open the next story in a series
- See story details, related stories, rate stories...
- View author profiles and their submissions & favorites
- Search for keywords & tags
- View top & new stories of all categories and most popular tags
- Search in lists
- Export Stories (to HTML), Lists and followed authors (both to JSON and Markdown)
- Export / Import settings and downloaded stories
- Receive a notification when a new update for the app is available
- and more...

### After logging in with a Literotica account you also can:

- View and add stories to your lists
- View your feed and get notified when there's something new
- Follow / unfollow authors

## Screenshots

<img alt="Search" title="Search" src="https://theilluminatus.github.io/litapp/images/search.jpg" width="250"> <img alt="Reading" title="Reading" src="https://theilluminatus.github.io/litapp/images/read.jpg" width="250"> <img alt="Story detail" title="Story detail" src="https://theilluminatus.github.io/litapp/images/detail.jpg" width="250"> <img alt="Author" title="Author" src="https://theilluminatus.github.io/litapp/images/author.jpg" width="250"> <img alt="Add to list" title="Add to list" src="https://theilluminatus.github.io/litapp/images/fav.jpg" width="250"> <img alt="Lists" title="Lists" src="https://theilluminatus.github.io/litapp/images/lists.jpg" width="250"> <img alt="Feed" title="Feed" src="https://theilluminatus.github.io/litapp/images/feed.jpg" width="250"> <img alt="Categories" title="Categories" src="https://theilluminatus.github.io/litapp/images/categories.jpg" width="250">

## Installation

The app is only supported from **Android v4.4** (KitKat, released in 2013) and upward.

Go to `Settings → Security → Unknown Sources` and enable the option called `Allow installation of apps...`. Then downloading the app at the top of the page, once the resulting `.apk` file is downloaded, install the app by pressing the notification or opening the file with a file manager app.

[Read the official Android documentation for more information](https://developer.android.com/distribute/marketing-tools/alternative-distribution#websites)

## Tracking

Since version 1.13 I started tracking some basic things out of pure curiosity. I'm using Google Analytics (with all advanced features disabled) and track:

- Visits to this page
- Opening the app
- Logging in to an account (no account details of course)
- Reading a story (not which one)

This is purely to get an overview of how many people are using my app, since GitHub doesn't allow me to see download statistics. You can check these claims in the source code by searching ['track'](https://github.com/theilluminatus/litapp/search?l=TypeScript&q=track).

## Frequently Asked Questions

If you encounter a problem or have a feature request, please check the app's settings and my [TODO list](https://github.com/theilluminatus/litapp/blob/master/TODO.md) first.

### Errors

I am getting the following message: `Error while communicating with server`.

> Most frequently this is either a temporary problem with the Literotica servers or your country blocking the Literotica servers. Please try to access the Literotica website directly in a browser and/or the official app. If this problem persists, feel free to contact me (Tip: also include the "Error Log" in your mail to help me debug the problem).

When starting the app it loads for a long time and then shows an error popup with the text: `Connection to the server was unsuccessful`.

> Please reboot your device, if this didn't fix it, try to clear the app data.

### Requested Features / Bugfixes

You can check if the bug report or feature you wish to send in has already been logged on my [TODO list](https://github.com/theilluminatus/litapp/blob/master/TODO.md).  
Unfortunately I am sometimes unable to fix or implement these requests due to time or platform constraints:

- **Feature**: Add setting to disable vertically scrolling when reading a story, spread to multiple pages instead so you can only scroll horizontal.
    > For one, too much work. There is a lot to consider here: changing screen size or font sizes will change amount of pages and the current page, there is a vast array of differently sized phone screens (the official app cuts off the last line of text regularly on my device).  
    > Personally I prefer the current setup for this reason: there is no difference between the site and the app layout-wise, authors sometimes take great care in layouting their stories and it would be a shame to mess with this. I realize the official app does do this and it annoyed me greatly every time a story ended on the last page with only 3 lines.

- **Feature**: Searching for poems
    > Unfortunately the existence of poems was not taken into account when designing and creating the app. You can read them by accessing the poem specific categories on the Explore page. Unfortunately it would take considerable effort to implement searching for them, as Literotica has a whole set of extra endpoints for dealing with poems. Because of this it is currently not planned to be implemented.

- **Feature**: Reading illustrated stories in offline mode.
    > As you might have noticed, you can download illustrated stories and read them online, unfortunately the images will not be downloaded locally. This would require completely overhauling the way stories are downloaded and displayed.

- **Feature**: Listen to stories with audio recordings inside the app
    > Because this app reuses Literorica's data (mainly from the official app) there is no way to support this (as the offical app doesn't either). You can open the story in a browser by pressing the "Open Externally" button on the detail page and access the recording from there.

- **Feature**: Update the app name to something less obvious (example "Litapp")
    > I personally am not a fan of apps that have undescriptive app names as it's harder to find them on your device or when searching the web. It's also bad practice to change the app's name when it has already been released, because a lot of users wouldn't find it after the update.  
    > However most Android phones allow you to change an app's name yourself, or already include a way to hide or lock away some apps. If not, you can download third party [homescreens](https://play.google.com/store/search?q=launcher&c=apps) or [lockers](https://play.google.com/store/search?q=app+lock&c=apps) from the Play store.

- **Bug**: Sometimes lists of stories (history, search results, lists) don't contain all expected lists (especially when it is a long list)
    > This issue originates from Ionic (a package to more easily create apps), this might be fixed by updating to a newer version, but this will take a lot of time and might introduce newer other bugs.  
    > A possible solution is to kill and restart the app or even reboot your phone.

- **Bug**: Not all features work with non-english stories. For example: viewing the rest of the stories in a series.
    > This is a technical limitation of the way I'm retrieving the stories from Literotica's servers. Since the official app only supports English stories it is currently not possible to improve upon this functionality.

- **Bug**: The story text suddenly is cut off (after a < or > character).
    > This is both an oversight of the author (they should use `&lt;` or `&gt`; instead) and a bug in the official Literotica app/api. There is nothing wrong with the app itself.

- **Bug**: The layout of the app breaks when reading a story on a phone with a large notch.
    > Unfortunately adding decent notch support in this old project is not possible without reworking a large part of the app. I've added a notch specific setting instead you can enable.

## Contact

Do you have questions, bug reports, feature requests or even a PR you want to merge? Send me an email at:  
[theilluminatus@outlook.com](mailto:theilluminatus@outlook.com)
