# report-ionic-client

The user-facing **mobile app** (internal name `iweather`). Ionic 3 / Angular 4.4
/ Cordova, targeting iOS, Android, and browser. Consumes `report-api`.

## What it does

Lets users browse, search, map, and submit ski-trip reports. Pages (`src/pages/`):

- `home` — landing / latest reports.
- `map` — reports on a Leaflet map.
- `search` + `search-result` — filter reports (maps onto `report-api` query params).
- `report-details` — single report view.
- `add` — submit a new report (incl. camera photo upload via `/images`).
- `topos_slides` — slideshow (topos / route photos).
- `about`, `my-tabs` — shell / nav.

## Providers (`src/providers/`)

- `report/report.ts` — HTTP client for the API: `getReports`, `postReport`,
  `postImage`, plus `getImagesBySearchQuery` (hits the external **Qwant** image
  search API). Base URL comes from `ENV.api_endpoint` (`@app/env`).
- `report-handler/report-handler.ts` — report-shaping / view logic.
- `shared/shared.ts` — shared state/helpers.

Also: `components/`, `directives/`, `pipes/`, `theme/`, i18n via
`@ngx-translate`, offline storage via `@ionic/storage` + `cordova-sqlite-storage`.

## Build / run

Config/env split lives in `config/` (`webpack.config.js`) and `environments/`
(DEV vs PROD `ENV.api_endpoint`). See `README.md` for the full emulator/device
command list. Essentials:

```sh
npm install
ionic cordova emulate ios --target="iPhone-SE" --no-native-run        # DEV config
ionic cordova emulate ios --target="iPhone-SE" --prod --no-native-run  # PROD config
ionic cordova run android --device                                     # physical device
ionic cordova build browser                                            # browser build
```

Release helpers: `create_signed_apk_with_version.sh`, `get_and_increase_tag.sh`
(version tagging), `build_and_S3_deploy.sh` (browser build → S3).

## Branch naming (from README)

`wip` / `feat` / `bug` / `junk`.

## Caveats

- **Old stack:** Ionic 3, Angular 4.4.3, cordova-ios 4.5.5, TypeScript 2.6,
  rxjs 5 (`.map(...).toPromise()` style). Toolchain (`@ionic/app-scripts`) is
  long-deprecated; a clean `npm install` on a modern Node may be painful — use a
  matching old Node version.
- `config.xml` holds the Cordova app id / plugin config (`cordova-plugin-ionic`
  live-update `APP_ID` `1907d883`, channel `Production`).
- `getImagesBySearchQuery` calls Qwant over plain `http://` — external, may be
  dead; not part of the core API.
