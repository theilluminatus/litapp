
# Mockdata

## API Server

I saved a bunch of api requests to a 'har' file (`litapp.har`). This file contains all data collected in the Network tab of Google Chrome's developer tools (Rightclick, then "Save all as HAR file"). You could can also use this data to setup a server to serve this mock data (with something like `har-server` or `server-replay`).

Pages in archive:

- `app.json` (for updates)
- Explore
- Categories
  - All (Top & New, 3 pages each)
  - Anal (Top & New)
- Tags
  - anal
  - oral
- Stories
  - My Little Ventrue Pt. 04 Ch. 11 (first of All category - top)
    - Story text
    - Details page
      - Series
      - Related Stories
      - Author (NovusAnimus)
        - Submissions
        - Favorites
      - Tags
        - vampire
- Search
  - vampire

Please note that these URLSs were loaded via the CORS proxy at `https://litapp-cors.herokuapp.com` and might need some reformatting to get working.

## Old local data

The other files in this `mocks` folder (`data.ts` and providers) were used in versions under 1.0. They were used to design the application and will no longer work.
