# TODO

> Some architectural todo's are defined inside the code itself

- Add note about long wait time when contacting me

## Bugs

- When searching by tags, the category filter popup has black text on a dark window
- Sort settings are not persisted, always defaults when returning to same screen
- Share link to quickly open story from browser doesn't work in Android 11
- Downloaded stories disappear after large quantities (1000+)?
  - Export story list or downloaded stories to separate files?
- Unauthorized message when loading feed & list data when just logged in (Android 11 Oneplus)
- Bookmarked status disappears during deep level navigation (related, author favs...)

## Features

- Sort authors submissions list like history etc
- Try to open image in browser when clicked illustration
- Search for text inside a story feature?
- Split downloaded stories from history, add separate tab (more functions like search, grouping...) + add undownload button to history swipe gesture

Add missing / more data to existing screens:

- Find better API route for getting author following status together with bio
  - `https://literotica.com/api/3/authors/<authorId>`
- Find better API route to get more story metadata (especially 'new' badge) for improved story refresh
  - `https://literotica.com/api/3/stories/<storyId>` (`$.submission.is_new`)
- Find better API route for viewing the Top stories in a category (would allow limiting to top this year, last 90 days or all time like on the website)
  - `https://literotica.com/api/3/stories/popular/<categoryId>`  
    (params = `{"page": pageNum, "period": "month"|"week"|"all", "pageSize": 10, "language": 1}`)
- Find API route for story comments (the needed pages already exist)
  - `https://literotica.com/api/3/stories/<storyId>/comments/after`  
    (params = `null | {"after": lastCommentIdFromPreviousPage}`)

### Meta

- Add EOL message
- Build automatic deploy script (GitHub action on tag, ms appcenter?)
- Add mock API for integration testing and demo (in case Literotica servers go down)

### WebApp (WIP)

- Add links to homepage and promote
- Service worker to cache SPA

# Features / Bugfixes that are currently not planned

## Not reproducible bugs

If you encounter these issues and want to help me fix them, please contact me.

- Downloaded stories disappearing without internet connection
- Feed shows repeats itself after a few pages (possibly fixed by logging out and back in)
- Older downloaded stories cannot be added to lists after a while (possibly fixed already)

## Missing data

These functions cannot be added to the app because Literotica does not have a way to access the data:

- Find a way to consistently support stories from other languages (currently only found 1 endpoint for searching)
