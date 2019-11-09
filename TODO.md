# TODO

- Build deploy script (GitHub action on tag, ms appcenter?)
- Add mock API for integration testing and demo

- WebApp: Add links to homepage
- WebApp: add service worker to cache SPA

## Request

- Allow sorting of downloaded stories (new/old, title, author, category) + filter?

## BUGS

- Offline mode:
  - Works correctly when slow internet?
  - Stories in list disappear after few seconds?
  - Story reading page is empty at first
  - Offline mode toggle disappears after enabling?
- Recycler list doesn't work as expected (sometimes doesn't go past +- 20 items)
  - Webview version in error log
  - Add toggle to use full list instead of recycler
- Category link on story-detail page doesn't work (for category Celebrities)

### Not reproducible

- List story count != item count (problem server side)
- Fix rating sometimes shows as x.xx (?)
- Downloaded stories disappearing without internet connection?
- Downloading stories to file doesn't always work (ENCODING_ERR?)

## MISSING DATA

- Find API route to get all categories (old was removed, now hardcoded)
- Find API route for story comments
- Find better API route for getting author following status together with bio
- Find better API route to get more story metadata (especially 'new' badge) for improved story refresh

> Also check TODOs in files!
