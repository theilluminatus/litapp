# TODO

> Some architectural todo's are defined inside the code itself

## Features

- Allow viewing poems via url link (https://www.literotica.com/p/ID)
- History page: show read percentage
- Add version info on settings screen (or bottom of navigation drawer?)
- Add a way to search for authors or directly open an authors page (perhaps by url link?)
- Add button to download all stories in list
- Add notifications (checking, new update found, no new update found) when pressing check for app update.
- Add more descriptive error messages
- Split downloaded stories from history, add separate tab (more functions like search, grouping...)
- Build automatic deploy script (GitHub action on tag, ms appcenter?)
- Add mock API for integration testing and demo (in case Literotica servers go down)
- WebApp: Disable forced account logout on update
- WebApp: Add links to homepage and promote
- WebApp: Service worker to cache SPA

## Bugs

- Older downloaded stories cannot be added to lists after a while
- OPENLINK_UNSUPPORTED: translation doesn't work

# Features / Bugfixes that currently will not be fixed

- Feature: Add setting to disable scrolling in story view, spread to multiple pages instead
    > For one, too much work (changing screen size or font sizes will change current page), will also break direct links from and to website.

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
