# Travel Planner

A travel website for urban explorers, built on ready-made data about urban exploration destinations (abandoned towns, industrial sites, Cold War relics and more) and flights to and from Stockholm and Copenhagen.

To set up the project, ask Claude Code to follow `setup-claude.md`. It is a one-time setup: its steps and rules apply only while it runs, not to later work on the project.

## How it is built

- **Next.js** (app router, JavaScript) on **Node.js**. The pages and the backend API routes are in the same project.
- **Published to Vercel** with `npm run deploy`. There is no Git repository and no local development server: changes are deployed and checked on the live site.
- **Tested with Playwright** against the live site. `npm test` runs the tests in `tests/`; the site's address is `baseURL` in `playwright.config.js`.
- **No database.** The site reads JSON and Markdown files that are bundled with each deployment.

## Data

The data is ready-made sample data. Features read it but don't change it, and specifications and tests refer to its IDs, so it stays the same. Descriptions are written from general knowledge, and airports, travel times, flight times and prices are approximate or invented.

- `knowledge/`: one page per destination, with its description, nearest airport, how to get there and visiting notes. Start at `knowledge/index.md`.
- `data/destinations.json`: the facts from the destination pages, in one file for the site.
- `data/flights.json`: flight timetables to and from Stockholm Arlanda (ARN) and Copenhagen (CPH), November 2026 to April 2027. See `wiki/system/data-flights.md`.
- `data/airports.json`: names and locations of the airports.
- `public/images/`: a photo of each destination, from Wikimedia Commons. The `image` field of each destination page, also in `data/destinations.json`, gives the photo's address and its credit: author, licence and the photo's page on Commons. Most of the licences require this credit to be shown with the photo.

## Folders

- `app/`: pages, and API routes under `app/api/`.
- `components/`: parts of the page interface. The folder is created with the first one.
- `lib/`: shared backend code, such as loading the data.
- `data/` and `knowledge/`: the sample data described above.
- `specs/`: feature specifications, in `backlog/`, `ongoing/` and `done/` by status.
- `tests/`: Playwright tests.
- `wiki/`: documentation of the system and user guides.
- `public/`: images and other files served as they are.
- `scripts/postinstall.js`: downloads the browser Playwright uses, after `npm install`.

## Features

The site is built one feature at a time. Each feature gets an ID in the order it is specified: TRIP-001, TRIP-002 and so on.

- **Specification:** a folder `specs/<status>/<feature ID>-<name>/`, for example `specs/backlog/TRIP-001-<name>/`, with `spec.md` (the specification), `flow.mmd` (a flow diagram) and, once work on it starts, `verification.md` (how it was checked). The folder moves between `backlog/`, `ongoing/` and `done/` as the work progresses.
- **Requirements** have IDs within their feature: `TRIP-001-R1`, `TRIP-001-R2` and so on.
- **Tests:** one file per feature, `tests/<feature ID>-<name>.spec.js`, with each test named after the requirement it checks.
- **Product overview:** `specs/overview.md` describes the product's purpose, shared terms, scope, the list of features and rules that apply across features.
- **Wiki:** `wiki/system/` documents how the site works and `wiki/manual/` how to use it. The `index.md` pages, `wiki/system/architecture.md` and `wiki/log.md` grow as features are finished.

Empty files are placeholders: keep their names and locations, and fill them in.

Already built: `GET /api/destinations` returns all destinations (`app/api/destinations/route.js`, `lib/travel.js`; see `wiki/system/api-destinations.md`). Features can build on it, and the smoke test uses it.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Installs the dependencies and Playwright's browser. |
| `npm run build` | Builds the site locally without publishing it, to catch build errors before deploying. |
| `npm run deploy` | Builds the site and publishes it to Vercel. |
| `npm test` | Runs all tests against the live site. |
