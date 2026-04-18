# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Nuxt dev server
npm run build      # Production build (SSR)
npm run generate   # Static site generation (used for deployment)
npm run preview    # Preview production build
```

There is **no test runner, linter script, or typecheck script** configured in `package.json`. ESLint is installed via `@nuxt/eslint` (flat config at `eslint.config.mjs`), but it's only wired into the Nuxt module — run `npx eslint .` directly if needed. Do not claim tests or typechecks pass without evidence.

## Architecture

### Framework stack

Nuxt 3 (SSR + SSG), Vue 3 Composition API, TypeScript, Pinia, PrimeVue (Aura preset, `p` prefix), SCSS, GSAP, Keen Slider, TanStack Vue Query, `@nuxtjs/i18n`, `@vite-pwa/nuxt`.

SCSS variables and responsive mixins are auto-injected into every `<style lang="scss">` block via `vite.css.preprocessorOptions.scss.additionalData` in `nuxt.config.ts` — **do not re-import `_variables.scss` or `_responsive.scss` in components**; they are globally available.

### Rendering model

`nitro.prerender.crawlLinks: true` with `routes: ["/"]` — the site is intended to be fully prerendered from the root. Any page that should be in the static build must be reachable by link-crawling from `/`. Pages using dynamic data (Firebase works) still render at build time with whatever data is available at prerender.

`experimental.payloadExtraction: true` + `experimental.inlineSSRStyles: true` are enabled; SSR-hydrated state flows through the payload.

### State: theme + screen size

`stores/useGlobalStore.ts` is the single global Pinia store. It owns both theme and screen-size state:

- **Theme** is persisted via `useCookie("theme")` (default `dark`, 1-year maxAge). A `watch` applies `data-theme` attribute + `light`/`app-dark` classes to `<html>` on every change. On the client, always go through `toggleTheme()` / `setTheme()` — never mutate `document.documentElement` directly.
- **Screen size** is derived in `updateScreenWidth(width)` with breakpoints `< 768` mobile, `< 1024` tablet, else desktop. This is driven by `plugins/screen.ts` on resize. Note these JS breakpoints differ from the SCSS mixins in `_responsive.scss` (7 breakpoints from 320 to 1400) — pick the right layer for the job: SCSS for styling, store for conditional rendering.

### Data layer

Works/portfolio data comes from Firebase Realtime Database. The URL is resolved via `useRuntimeConfig().public.firebaseUrl` (override with `NUXT_PUBLIC_FIREBASE_URL`). Fetching goes through `api/index.ts` → `useGetPosts()` → TanStack Query (`queryKey: ['works']`, `staleTime: 5000`).

Vue Query is installed as `plugins/vue-query.ts` with proper SSR dehydrate/hydrate — do not call `useQuery` outside a component's setup, and do not introduce a parallel fetching layer.

### i18n

Config lives in `i18n/locales.config.ts`, loaded into the Nuxt module from `nuxt.config.ts`. Key points that often trip people up:

- `defaultLocale` is driven by `NUXT_PUBLIC_DEFAULT_LOCALE` env var (falls back to `en`). **The legacy assumption that Ukrainian is the default is wrong in the current code.**
- `strategy: 'prefix_except_default'` — the default locale has no URL prefix, the other gets one.
- `detectBrowserLanguage.redirectOn: 'root'` — auto-redirect only happens on `/`, and `alwaysRedirect: false` means the cookie `i18n_redirected` locks in the user's choice.
- `lazy: true` with files in `i18n/locales/` (`uk-UA.json`, `en-US.json`).

### PWA

`@vite-pwa/nuxt` is enabled with `registerType: 'autoUpdate'` and `manifest: false` (the manifest comes from the existing `public/site.webmanifest`). Workbox runtime caching rules in `nuxt.config.ts` cover: Firebase (NetworkFirst, 1 day), fonts from Fontshare/Google (CacheFirst, 1 year), and images (CacheFirst, 30 days). PWA is **disabled in dev** (`devOptions.enabled: false`) — to test service worker behavior, run `npm run build && npm run preview`.

### Build output

`vite-plugin-compression` emits both `.gz` (gzip) and `.br` (brotli) alongside originals for files > 10KB. The deploy target needs to be configured to serve pre-compressed variants — otherwise these are dead weight.

### Directory conventions

- `components/` — reusable components. `SVGcomponents/` holds inline-SVG Vue components (used instead of static SVGs so stroke/fill can bind to theme variables). `Style/` holds heavy animation components (canvas, GSAP, CSS `@property`).
- `views/` — page-section components composed onto `pages/index.vue`. Split this way so the home page reads as `<TheFirstScrean /> <ThaAboutMe /> <AppSkills /> <TheWorks />`.
- `composables/useFlyingLetters.ts` — GSAP letter-by-letter entry animation; takes a `templateRef` and splits text nodes at runtime. `useScrollTrigger: true` gates it on viewport entry.
- `pages/404/404.vue` uses `layout: 'empty'` — other pages use the default layout (header + footer).

### Theme-aware styling

Colors are CSS custom properties set at `:root` via the `data-theme` attribute (see `assets/styles/_variables.scss`). SCSS components should reference `var(--primary-color)`, `var(--background-color)`, etc., rather than raw hex — this is what makes the theme switcher work without re-rendering.

PrimeVue theme integration lives in `theme/primevue.config.ts` + `theme/appPresetTheme.ts` and extends the Aura preset with the same palette.

## Gotchas

- Do not import `gsap/ScrollTrigger` at module top level without a client-only guard; GSAP plugins break SSR. The existing composable registers the plugin inside a client check — follow that pattern.
- `ParticleCanvas.vue` reads theme from the store to pick particle color; if you add more canvas animations, watch `theme` rather than reading once at mount.
- `Work.img` exists in the type but the UI renders `Work.demo` as the thumbnail. Don't swap them without checking the Firebase data shape.
- `nuxt.config.ts` sets `htmlAttrs.lang: "uk"` statically in `app.head` — this is independent of the i18n runtime locale and is not auto-updated. If SEO for English matters, this needs a per-page `useHead` override.
- When changing `nuxt.config.ts`, re-run `npm run postinstall` (`nuxt prepare`) to regenerate `.nuxt/` types.
