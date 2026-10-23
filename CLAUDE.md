# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js (app router, plain JavaScript, no TypeScript) travel site for urban exploration destinations, with flights to and from Stockholm Arlanda (ARN) and Copenhagen (CPH). Pages and backend API routes live in the same project. There is no database: features read JSON and Markdown files bundled with each deployment.

`setup-claude.md` is a one-time setup procedure. Its rules (run only listed commands, change only `playwright.config.js`) apply only while it runs, not to later work.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Installs dependencies; `scripts/postinstall.js` also downloads Playwright's Chromium (skipped on Vercel/CI). |
| `npm run build` | Local `next build` without publishing, to catch build errors before deploying. |
| `npm run deploy` | `vercel deploy --prod --yes`: builds and publishes to Vercel. |
| `npm test` | Runs all Playwright tests in `tests/` against the **live** site. |
| `npx playwright test tests/<file>.spec.js` | Runs one test file. |
| `npx playwright test -g "TRIP-001-R2"` | Runs tests whose name matches (tests are named after requirement IDs). |

There is no local dev server and no linter in this workflow: changes are deployed, then checked on the live site. So a change isn't verified until `npm run deploy` has run and `npm test` passes afterwards. `baseURL` in `playwright.config.js` is the production alias (`https://aiutbildningaqc.vercel.app`), not the per-deployment URL, which is behind Vercel authentication and returns 401.

## Architecture

- `lib/travel.js` is the shared backend layer that loads data (imports JSON directly, so the data is bundled at build time). API routes in `app/api/<name>/route.js` call it and return `Response.json(...)`. The only existing endpoint is `GET /api/destinations` (all destinations, sorted by `id`), which the smoke test depends on.
- `components/` doesn't exist yet; it is created with the first UI component.

### Data (read-only sample data)

Features read the data but never change it. Specs and tests refer to its IDs, so it must stay stable.

- `data/destinations.json`: 96 destinations, generated from the pages in `knowledge/<continent>/<country>/<id>.md` (frontmatter plus Overview / Getting there / Visiting sections). Each record's `path` points to its page. Allowed values for `category`, `access` and `transport` are listed in `knowledge/index.md`.
- `data/flights.json`: one record per **timetable**, not per flight. A trip matches a search on a date when `from`/`to` match, the date is within `valid_from`..`valid_to` (inclusive), and the departure weekday is in `days`. A single trip is identified by timetable `id` + date. Use `duration_min` rather than subtracting `departs`/`arrives`, which are in local times in different time zones. `price_eur` is one way, per person, and the same on every date. Full rules and worked examples are in `wiki/system/data-flights.md`.
- One end of every flight is ARN or CPH; the other end is a destination's `nearest_airport` or `gateway_airport`. When the nearest airport has no flights, use `gateway_airport` (e.g. Kolmanskop: LUD → WDH). Chernobyl (KBP) has no flights.
- `data/airports.json`: every airport code used, with city, coordinates and IANA `timezone`.
- `public/images/<id>.jpg`: one photo per destination. The `image` field carries `author`/`license`/`source`; most licences require this credit to be shown with the photo.

## Feature workflow

The site is built one feature at a time, with IDs TRIP-001, TRIP-002, … in the order they are specified.

- Spec folder: `specs/<backlog|ongoing|done>/<ID>-<name>/` containing `spec.md`, `flow.mmd` (Mermaid flow), and, once work starts, `verification.md`. Move the folder between status directories as work progresses.
- Requirement IDs: `<ID>-R1`, `<ID>-R2`, …
- Tests: one file per feature, `tests/<ID>-<name>.spec.js`, with each test named after the requirement it checks.
- `specs/overview.md` holds product purpose, shared terms, scope, the feature list and rules that apply across features.
- Wiki: `wiki/system/` documents how the site works (one page per endpoint or data file, with frontmatter like `wiki/system/api-destinations.md`), and `wiki/manual/` covers how to use it. The `index.md` pages, `wiki/system/architecture.md` and `wiki/log.md` are updated as features are finished.
- Empty files are placeholders: keep their names and locations, and fill them in.
