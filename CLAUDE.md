# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Nuxt dev server (http://localhost:3000)
npm run generate     # Static build → .output/public (this is what CI deploys)
npm run build        # SSR build (not used for deployment)
npm run preview      # Serve the last build — use it to test the PWA / service worker
npm run lint         # ESLint (flat config from @nuxt/eslint)
npm run postinstall  # nuxt prepare — regenerates .nuxt/ (types, ESLint config); re-run after editing nuxt.config.ts
```

There is **no test runner and no typecheck script**. `eslint.config.mjs` imports `./.nuxt/eslint.config.mjs`, so `.nuxt/` must exist before linting. CI runs Node 22 — use the same locally. Do not claim tests or typechecks pass without evidence.

## Deployment

`.github/workflows/deploy.yml` deploys to GitHub Pages on every push to `master`: Node 22 → `npm ci` → `npm run generate` → copy `200.html` to `404.html` only if Nuxt didn't emit one → upload `.output/public`. Locale env vars are set in the workflow; `NUXT_APP_BASE_URL` drives `app.baseURL` if the site ever moves under a sub-path.

## Architecture

### Stack

Nuxt 3 (static generation), Vue 3 `<script setup>` + TypeScript, Pinia, SCSS, GSAP, `@nuxtjs/i18n`, `@vite-pwa/nuxt`, Geist via `@fontsource-variable`. No UI component library — every component is hand-written. WebGL effects come from vendored Canvas UI code (see Effects).

SCSS variables and responsive mixins are auto-injected into every `<style lang="scss">` via `vite.css.preprocessorOptions.scss.additionalData` — **do not re-import `_variables.scss` or `_responsive.scss` in components**, and never put CSS rules into those files (they would be duplicated into every component). SCSS partials loaded with `@use` from `main.scss` don't get `additionalData`; they must `@use "variables" as *;` themselves.

Components and composables are imported explicitly (`~/components/…`, `~/composables/…`) even though Nuxt auto-imports them — keep that convention.

### Rendering

`nitro.prerender.routes` lists every route explicitly, in both locales (`/`, `/uk`, `/about-me`, `/uk/about-me`, `/works`, `/uk/works`) plus `/sitemap.xml` and `/robots.txt`; `crawlLinks: true` picks up anything linked. `failOnError: false` means prerender errors do **not** fail the build — read the `generate` log. `experimental.payloadExtraction` is on; component styles are inlined by Nuxt's default (`experimental.inlineSSRStyles` in the config is a legacy key Nuxt ignores).

### Pages and sections

`pages/index.vue` composes the section components in `views/` (`TheFirstScrean`, `ThaAboutMe`, `TheWorks`) plus `components/AppSkills.vue`. `/about-me` and `/works` reuse `AppAboutMe` / `AppWorks` with `:page="true"`. Errors (404 and others) render `error.vue` (texts in `errorPage.*` i18n keys); on GitHub Pages unknown URLs boot the `404.html` SPA fallback, which shows it.

### Works data

Portfolio items are the static `WORKS` array in `data/works.ts` (type `Work` in `types/works.ts`), imported directly by `components/AppWorks.vue`. Cards render initials from `work.name`; the `img` / `demo` image URLs are not rendered. To add a project, edit `data/works.ts`.

### Head scripts (before first paint)

`config/headScripts.ts` builds two tiny blocking scripts injected via `app.head.script` in `nuxt.config.ts`:
- **theme** — sets `data-theme` + `light`/`app-dark` on `<html>` from the `theme` cookie, so the static HTML never flashes the wrong theme;
- **locale redirect** — on the root URL only, redirects to the saved locale (`i18n_redirected` cookie) or the browser's preferred supported locale, before Nuxt boots. This replaces the module's client-side redirect (which rendered the default locale first and caused a hydration mismatch).

### State: theme + screen size

`stores/useGlobalStore.ts` is the only Pinia store.
- **Theme**: the store starts at `dark` on server and client (the prerendered Pinia payload always carries the default). `plugins/theme.client.ts` applies the cookie value on `app:suspense:resolve` — i.e. after hydration has finished; `app:mounted` is too early and breaks theme-dependent markup. Don't read the cookie into store state during setup. Change the theme only through `toggleTheme()` / `setTheme()`; a `watch` updates `<html>`.
- **Screen size**: `plugins/screen.ts` calls `updateScreenWidth()` on load and on a 300 ms debounced resize; breakpoints `< 768` mobile, `< 1024` tablet, else desktop (`desktop` on the server). These differ from the 7 SCSS breakpoints in `_responsive.scss` — SCSS for styling, store for conditional logic.

### Theming

`assets/styles/_theme.scss` defines the CSS custom properties per `:root[data-theme]` (`--bg*`, `--fg*`, `--border*`, `--accent*`, `--accent-gradient`, `--shadow-*`, radii, motion, plus legacy aliases like `--primary-color`) and is emitted once via `main.scss`. `_variables.scss` holds only SCSS tokens. Dark accent is purple, light accent is orange. Use `var(--…)` tokens for colors so the theme switch works without re-rendering.

### Animation and effects

- `composables/useReveal.ts` — default GSAP fade-up reveal (optional `childSelector` stagger); no-op under `prefers-reduced-motion`. Call in `onMounted`.
- Hero entrance (`views/TheFirstScrean.vue`) is CSS-only (`hero-reveal` keyframes) so the prerendered headline is never hidden waiting for JS.
- `composables/useLaserReveal.ts` — works cards are "printed" by a beam (`.work-card__laser`) via a clip-path sweep when they scroll into view. Call from setup.
- `components/Style/FlameFrame.vue` — wrapper around the Canvas UI FlameWrap engine; fire around the About side column, color from `composables/useThemeRgb.ts` (eases between palettes on theme switch). It deliberately forces the DOM-content mode (no html-in-canvas capture). Hidden on phones (< 768px) and whenever WebGL is unavailable (lost context after a GPU reset, no WebGL2) — then `flame-frame--unavailable` shows a static glow; the fire restarts on `webglcontextrestored`.
- Hero background: canvasui `ParticleScroll` (async chunk) only where Chrome's experimental html-in-canvas API exists (`utils/htmlInCanvas.ts`); everywhere else `components/Style/ParticleCanvas.vue` (2D canvas particles, watches theme, pauses offscreen, static under reduced motion).
- `components/Style/GlitchText.vue` — CSS glitch (RGB-split torn copies, bursts every ~3 s, continuous on hover) for the error page code + title; adapted from Vue Bits (`vendor/vue-bits/`).
- `components/AppSlider.vue` — pure-CSS marquee.

GSAP plugins break SSR: composables register `ScrollTrigger` at module scope behind `typeof window !== 'undefined'` — follow that pattern.

`vendor/canvas-ui/` holds unmodified Canvas UI files (MIT + Commons Clause, see its README) — don't edit them; re-download from a newer commit instead. The vendored Vue wrappers forward unset props as `undefined`, which overrides engine defaults — pass every option explicitly (or filter `undefined`, as `FlameFrame` does).

### i18n

Config in `i18n/locales.config.ts` (passed to the module from `nuxt.config.ts`); messages in `i18n/locales/en-US.json` (2-space indent) and `uk-UA.json` (tabs), lazy-loaded.
- `defaultLocale` comes from `NUXT_PUBLIC_DEFAULT_LOCALE` (fallback `en`) — **English is the default, not Ukrainian.**
- `strategy: 'prefix_except_default'` → English at `/…`, Ukrainian at `/uk/…`.
- `detectBrowserLanguage` stays enabled so the module keeps the `i18n_redirected` cookie in sync; the actual root redirect happens in the head script (see above).
- The locale codes `en|uk` are also hardcoded in `app/router.options.ts` (keeps scroll position on a locale switch), `composables/useJsonLd.ts` (breadcrumbs) and `server/routes/sitemap.xml.ts` (`LOCALES`). Adding a locale means updating all of them.

### SEO

- `composables/useSeo.ts` — call once per page: `useSeo('<key>', { path, noindex })`. Reads `seo.<key>.title|description|keywords` from i18n and emits title, description, canonical, hreflang alternates (+ `x-default`), Open Graph, Twitter and `<html lang>`. Keys are typed by `SeoKey`.
- `composables/useJsonLd.ts` — called once in `app.vue`; emits a schema.org `@graph` (Person, WebSite, ProfilePage, BreadcrumbList).
- `server/routes/sitemap.xml.ts` — sitemap with hreflang alternates, prerendered to a static file.
- `public/og-image.jpg` (1200×630) = `public/og-image.svg` + the hero particle triangle (the `ParticleCanvas` simulation run offline, centered at x≈880, y≈290), composited in headless Chrome and saved as JPEG q85. Editing the SVG alone does not update the JPEG.
- `SITE_ORIGIN` (`https://hel1yeah.github.io`) lives in `config/site.ts` and is imported by `useSeo.ts`, `useJsonLd.ts` and `sitemap.xml.ts`; `public/robots.txt` and the text in `public/og-image.svg` repeat it by hand.

**Adding a page:** create it under `pages/`; add both locale paths to `nitro.prerender.routes`; add it to `ROUTES` in the sitemap; add `seo.<key>` to both locale files and to `SeoKey`; extend `buildBreadcrumb` in `useJsonLd.ts`.

### PWA

`@vite-pwa/nuxt`, `registerType: 'autoUpdate'`, `manifest: false` (the manifest is `public/site.webmanifest`). `navigateFallback: null` — every page is prerendered, so navigations must get their own HTML. Precache covers only `_nuxt/**/*.{js,css,woff2}` + favicon/logo; runtime caching: pages and `_payload.json` → NetworkFirst (offline copy), images → CacheFirst. Disabled in dev — test with `npm run generate` and a static server, or `npm run build && npm run preview`.

## Not source

`save/` is a committed snapshot of an old generated build — don't edit it and exclude it from searches (ESLint already ignores it).
