# TODO

> Some architectural todo's are defined inside the code itself

## Features

- Split downloaded stories from history, add separate tab (more functions like search, grouping...) + add undownload button to history swipe gesture
- Search for text inside a story feature
- Try to open image in browser when clicked illustration
- Sort authors submissions list like history etc
- Explain history story limit and/or increase it

### Meta

- Build automatic deploy script (GitHub action on tag, ms appcenter?)
- Add mock API for integration testing and demo (in case Literotica servers go down)

### WebApp (WIP)

- Add links to homepage and promote
- Service worker to cache SPA

## Bugs

- Check missing config of status bar on Pixel 5 / Android 11
- Illustrated stories: cannot search in category / don't show in author page (add type to search queries?)
- Adding stories to list doesn't provide feedback (also add a toast message in case the popup already closed)
- Older downloaded stories cannot be added to lists after a while

# Features / Bugfixes that are currently not planned

## Not reproducible bugs

If you encounter these issues and want to help me fix them, please contact me.

- Downloaded stories disappearing without internet connection
- Feed shows repeats itself after a few pages (possibly fixed by logging out and back in)

## Missing data

These functions cannot be added to the app because Literotica does not have a way to access the data.

- Find API route for story comments (the needed pages already exist)
- Find better API route to get more story metadata (especially 'new' badge) for improved story refresh
- Find better API route for getting author following status together with bio
- Find better API route for viewing the Top stories in a category (would allow limiting to top this year, last 90 days or all time like on the website)
- Find a way to consistently support stories from other languages (currently only found 1 endpoint for searching)
