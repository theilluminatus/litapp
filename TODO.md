
# TODO

- Lint and prettify codebase
- Auto update version number and build deploy script (GitHub action on tag?)
- WebApp: Stub native packages (download files instead of saving, google analytics... -> see app.module.ts)
- WebApp: Add links to homepage
- WebApp: add service worker to cache SPA

# BUGS

## To investigate

- History list sometimes doesn't go past +- 20 items, app restart fixes this
- 

## Not reproducible

- List story count != item count (problem server side)
- Fix rating sometimes shows as x.xx (?)
- Downloaded stories disappearing without internet connection?
- Downloading stories to file doesn't always work (ENCODING_ERR?)

# MISSING DATA

- Find API route to get all categories (old was removed, now hardcoded)
- Find API route for story comments
- Find better API route for getting author following status together with bio
- Find better API route to get more story metadata (especially 'new' badge) for improved story refresh

> Also check TODOs in files!
