# TODO

> Some architectural todo's are defined inside the code itself

## Features

- Add more descriptive error messages
- Limit amount of failed connection messages (max only one at a time + perhaps link to offline mode?)
- Split downloaded stories from history, add separate tab (more functions like search, grouping...)
- Build automatic deploy script (GitHub action on tag, ms appcenter?)
- Add mock API for integration testing and demo (in case Literotica servers go down)
- WebApp: Disable forced account logout on update
- WebApp: Add links to homepage and promote
- WebApp: Service worker to cache SPA

## Bugs

- Older downloaded stories cannot be added to lists after a while

# Features / Bugfixes that currently will not be fixed

- Feature: Add setting to disable scrolling in story view, spread to multiple pages instead
    > For one, too much work (changing screen size or font sizes will change current page), will also break direct links from and to website.

- Feature: Searching for poems
    > Unfortunately the existence of poems was not taken into account when designing and creating the app. You can read them by accessing the poem specific categories on the Explore page. Unfortunately it would take considerable effort to implement searching for them, as Literotica has a whole set of extra endpoints for dealing with poems. Because of this it is currently not planned to be implemented.

- Feature: Reading illustrated stories in offline mode.
    > As you might have noticed, you can download illustrated stories and read them online, unfortunately the images will not be downloaded locally. This would require completely overhauling the way stories are downloaded.

- Feature: Listen to stories with audio recordings inside the app
    > Because this app reuses Literorica's data (mainly from the official app) there is no way to support this. You can open the story in a browser by pressing the "Open Externally" button on the detail page and access the recording from there.

- Bug: Sometimes lists of stories (history, search results, lists) don't contain all expected lists (especially when it is a long list)
    > This issue originates from Ionic (a package to more easily create apps), this might be fixed by updating to a newer version, but this will take a lot of time and might introduce newer other bugs.

    > A possible solution is to kill and restart the app or even reboot your phone.

## Not reproducible bugs

If you encounter these issues and want to help me fix them, please contact me.

- Fix rating sometimes shows as x.xx
- Downloaded stories disappearing without internet connection
- Downloading stories to file doesn't always work (ENCODING_ERR?)


## Missing data

These functions cannot be added to the app because Literotica does not have a way to access the data.

- Find API route for story comments (the needed pages already exist)
- Find better API route to get more story metadata (especially 'new' badge) for improved story refresh
- Find better API route for getting author following status together with bio
