# Assignment

React application that lists characters from the Star Wars series, using their publicly-available API (SWAPI.dev)

### Problem and Solution

**Problem:**

App should display a list of characters (padinated) with some details listed. Every item in the list should lead to character's page on click, where corresponding character's properties shown.

**Solution:**

Challenge was solved by implementing routing with React Router. Every page of the list (1 - 9) has it's own URL.

If trying to access "/" endpoint, user will be redirected to page 1, as there is no landing page.

First page has no "previous page" button, and last page has no "next page" button for better UI/UX. If typing non-existent page into query string, user will be redirected to the page 1 (_reasoning_: preventing errors and providing better UX). History won't have an attempt to access non-existing page. "useHistory" React hook was utilized. When directed to actual character's page corresponding id passed as prop to the Page component, in case developer would need it. Otherwise page number and id are taken from query params via props.

Every character has their own page URL (_reasoning_: so it could be accessed without needing to navigate through the list). Character's do not have default "id" property as a separate field in the document (JSON), so character's id was extracted form "url" property. If typed non-existent person (character id) in URL, user will be redirected to the list, specifically to the page 1. On characters page there are links to films, starships and vehicles which would open in the new tab once clicked.

User's navigation is saved in history stack, so clicking and browsers back button or "back" button on the character's page would bring user to the point in the list they actually came from (if you click a character on the third page and press back, it will return user to the third page) (_reasoning_: more intuitive navigation).

All the API calls are done by utilizing Fetch API (as requested) with async functions.

Loading indication was added when navigating between list pages and to character's page. App is completely mobile responsive.

State is managed completely via React hooks (). Props (like query params) actively used. Initially implemented React Context API was removed later as unnecessary. Particular states are cleared when component unmounts (_reasoning_: better UX as previously accessed character's information can be shown for several milliseconds if state is not cleared)

### Possible improvements

- Caching API call data. Characters' list unlikely to change often, so caching data is reasonable. SWR library could be used.
- Handling incorrect URL endpoints (like non-existent character's page and/or incorrect list page) could lead to designated 404 page in the future, if app would expand.
- Simple list filtering could be added (filter by name, movies, etc.).

### Run locally

```sh
$ git clone https://github.com/ruslan-akhm/cinesend.git
$ cd cinesend
$ npm install
$ npm start
```

### Tech Stack

- React.js ( + React router)
- CSS
- HTML
