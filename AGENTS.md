# report-ionic-client

The user-facing **mobile app** (internal name `iweather`). Ionic 7 / Angular 17
/ Capacitor, targeting iOS, Android, and browser. Consumes `report-api`.

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

- `report/report.ts` — HTTP client for the API (Angular `HttpClient`):
  `getReports`, `postReport`, `postImage`, plus `getImagesBySearchQuery` (hits the
  external **Qwant** image search API). Base URL comes from
  `environment.api_endpoint` (`src/environments/environment*.ts`).
- `report-handler/report-handler.ts` — report-shaping / view logic.
- `shared/shared.ts` — shared state/helpers.

Also: `components/`, `pipes/`, `theme/`, i18n via `@ngx-translate`, offline
storage via `@ionic/storage-angular`. Cross-page data is carried on the
`SharedReportsProvider` singleton (Angular Router replaced the old
`NavController`/`NavParams` object passing).

## Build / run

Build is the standard Angular CLI. Env split lives in `src/environments/`
(`environment.ts` = PROD/default, `environment.dev.ts` = DEV, swapped in by
`angular.json` `fileReplacements` for the `development` configuration). Use the
pinned Node from `.nvmrc` (Node 20). Essentials:

```sh
nvm use                                     # Node 20
npm install
npm start                                   # ng serve (dev)
npm run build -- --configuration production # web build -> ./www
npx cap sync                                # copy web build into ios/ + android/
npx cap open ios                            # open in Xcode (needs CocoaPods: pod install)
npx cap open android                        # open in Android Studio (needs JDK + SDK)
```

Release helpers: `get_and_increase_tag.sh` (version tagging). The old Cordova
release scripts (`create_signed_apk_with_version.sh`, `build_and_S3_deploy.sh`)
are superseded — native release now goes through the Capacitor `android/` and
`ios/` projects, and the web app is built/served by the `web` container.

## Branch naming (from README)

`wip` / `feat` / `bug` / `junk`.

## Caveats

- **Stack:** Ionic 7, Angular 17 (NgModules, no standalone), Capacitor 5,
  TypeScript 5.2, rxjs 7, built with the Angular CLI on Node 20. Migrated from the
  original Ionic 3 / Angular 4 / Cordova stack — see git history and the legacy
  `config.xml` (still present for the old Cordova app id / live-update config).
- **Navigation:** Angular Router with `useHash: true` (hash URLs), so static
  hosting needs no SPA rewrite rule and deep-link refresh works. Object payloads
  between pages ride on `SharedReportsProvider`, not route params.
- **Native shells** live in `ios/` and `android/` (Capacitor). Building them needs
  the native SDKs (CocoaPods + Xcode for iOS; JDK + Android SDK for Android);
  `npx cap sync` after each web build.
- **Maps:** Leaflet + the `leaflet.fullscreen` npm plugin, both bundled (CSS via
  `angular.json`) — no CDN, so the map works offline inside the native shells.
- `getImagesBySearchQuery` calls Qwant (now over `https://`) — external, may be
  dead; not part of the core API. It's not wired into any page.
