# Raksul Paper Printing Price Table

A small Next.js app that renders an interactive price table for Raksul’s paper printing. It follows a feature‑first architecture and ships with unit tests (Jest + RTL) and end‑to‑end tests (Playwright).

## Requirements
- Node.js 18+ (recommended 20 LTS)
- npm 9+ (ships with Node 18+)
- Modern browser (Chrome/Firefox/Edge latest)

## Quick start
1) Copy environment file
- Copy .env.example to .env.local
- Adjust `NEXT_PUBLIC_API_BASE_URL` if your API runs on a different host/port.

2) Install dependencies
- `npm install`

3) Start the dev server
- `npm run dev`
- Open http://localhost:3000

4) Run tests
- Unit tests: `npm test`
- E2E tests: `npm run test:e2e`

## Configuration
- `NEXT_PUBLIC_API_BASE_URL`: Base URL for the pricing API. Must be defined in `.env.local` (prefixed with NEXT_PUBLIC so it’s available in the browser). Example:
  - `NEXT_PUBLIC_API_BASE_URL=https://raksul-functions.example.com`
- The app calls `GET {BASE_URL}/prices?paper_size=<A4|A5|B4|B5>`.

## Available scripts
- `npm run dev` — Start Next.js in development mode.
- `npm run build` — Production build.
- `npm start` — Start the production server after build.
- `npm test` — Run Jest unit tests (jsdom environment).
- `npm run test:e2e` — Run Playwright tests.
- `npm run lint` — Run ESLint.
- `npm run prepare` — Setup Husky git hooks (optional).

## Project structure (high level)
- `src/features/priceTable`
  - `components/` — UI pieces: Paper size select, grid, order bar
  - `containers/` — Composes feature, wires hooks, and store
  - `hooks/` — Data fetching with React Query
  - `misc/` — Constants and types
  - `store/` — Redux slice
- `src/shared`
  - `providers/` — App‑level providers (Redux, React Query)
  - `store/` — Redux store
  - `utils/` — Shared utilities (e.g., number formatting)
- `src/app` — Next.js App Router entry points
- `tests-e2e` — Playwright tests
- `test` — Jest setup and unit tests

## Data flow and behavior
- Data fetching: `usePrices` hook calls `GET /prices?paper_size=...` using Axios via React Query. Responses are cached and requests are deduplicated.
- State management: Redux Toolkit stores UI state (paper size, selected cell, expanded rows). Derived UI updates are driven by slice actions/selectors.
- UI: Material UI (MUI) components with Emotion styling; Tailwind utility classes are used for layout scaffolding where convenient.
- Number formatting: `src/shared/utils/numbers.ts` implements a custom comma‑insertion algorithm to format positive integers without `toLocaleString`/`Intl.NumberFormat`.

## How pricing works (UI)
- The table shows quantities (rows) vs business days (columns).
- Hover highlights a cell and lightly its row/column.
- Click selects a cell; the selection is outlined and the price appears on the Order bar.
- “See more” expands hidden quantity rows (first 5 are shown initially).

## Why these libraries?
- Next.js (App Router)
  - Server rendering, routing, and asset pipeline are built‑in and production‑ready.
  - App Router aligns well with React 18+/19 concurrent features and file‑system routing.
- React Query (@tanstack/react-query)
  - Provides stale‑while‑revalidate, cache, retries, request dedupe, and background updates with minimal code.
  - More granular cache control and mutations than SWR for complex UI states.
- Redux Toolkit (+ redux‑thunk)
  - Co‑locates feature reducers/slices with minimal boilerplate and immutable updates out of the box.
  - Great devtools and ecosystem; explicit UI state management keeps fetch/cache concerns in React Query.
- MUI (with Emotion)
  - MUI offers accessible, themed components (Select, Grid, Typography) that accelerate delivery.
  - Emotion integration enables flexible styling; Tailwind remains for quick layout utilities.
- Axios
  - Interceptors, timeout, and consistent JSON handling make API code concise and testable.
- Jest + React Testing Library
  - jsdom environment matches component behavior; RTL encourages testing user interactions over implementation details.
- Playwright
  - Cross‑browser by default (Chromium/Firefox/WebKit), powerful auto‑waits, great parallelization for CI.

## Testing
- Unit: `npm test` runs Jest. See `test/setupTests.ts` for RTL setup.
- E2E: `npm run test:e2e` runs Playwright tests in `tests-e2e/`.
  - To run headed mode: `npx playwright test --headed`
  - To update screenshots (if any): `npx playwright test --update-snapshots`

## Troubleshooting
- 404/Network error: Ensure `NEXT_PUBLIC_API_BASE_URL` points to the correct backend and that CORS is allowed for http://localhost:3000.
- Port already in use: stop other processes on 3000 or run `PORT=3001 npm run dev` (Windows PowerShell: `$env:PORT=3001; npm run dev`).
- Empty table: Verify API returns data for your chosen `paper_size` (A4/A5/B4/B5).

## Notes
- Works on latest Chrome/Firefox/Edge.
- Enable Husky with `npm run prepare` to attach git hooks (e.g., run lint/tests pre‑commit).
- Algorithm sources: the number‑format utility uses a standard reverse‑chunk (3‑digit) technique.

## License
See [LICENSE](./LICENSE).
