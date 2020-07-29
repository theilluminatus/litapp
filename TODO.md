# TODO

> Some architectural todo's are defined inside the code itself

## Features

- Turn pages with volume rocker
- Add random story feature from official app
- Add setting to only show new stories / submissions in feed (hide bio updates etc)
- Alternate scrolling mode: flip vertically through pages?
- Use new API routes for viewing the Top stories in a category (limit to top this year, last 90 days or all time)
- Split downloaded stories from history, add separate tab (more functions like search, grouping...) + add undownload button to history swipe gesture

### Meta

- Build automatic deploy script (GitHub action on tag, ms appcenter?)
- Add mock API for integration testing and demo (in case Literotica servers go down)

### WebApp (WIP)

- Disable forced account logout on update
- Add links to homepage and promote
- Service worker to cache SPA

## Bugs

- Fix text colour in category filter popup on search results when using AMOLED mode.
- Older downloaded stories cannot be added to lists after a while
- Some of the API routes no longer return a full story URL? causing share functionalities to fail.

# Features / Bugfixes that are currently not planned

## Not reproducible bugs

If you encounter these issues and want to help me fix them, please contact me.

- Downloaded stories disappearing without internet connection
- Feed shows repeats itself after a few pages (possibly fixed by logging out and back in)
- Rating sometimes shows as x.xx and some other information in list disappears (possibly fixed in 1.19)
- Downloading stories to file doesn't always work (probably fixed since 1.19)


## Missing data

These functions cannot be added to the app because Literotica does not have a way to access the data.

- Find API route for story comments (the needed pages already exist)
- Find better API route to get more story metadata (especially 'new' badge) for improved story refresh
- Find better API route for getting author following status together with bio
