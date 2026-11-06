import localesConfig from "./i18n/locales.config";
import { localeRedirectScript, themeBootScript } from "./config/headScripts";

const baseURL = process.env.NUXT_APP_BASE_URL || "/";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE || "en",
      fallbackLocale: process.env.NUXT_PUBLIC_FALLBACK_LOCALE || "uk",
      supportedLocales: JSON.parse(
        process.env.NUXT_PUBLIC_SUPPORTED_LOCALES || '["uk", "en"]'
      ),
    },
  },

  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    ["@nuxtjs/i18n", localesConfig],
    "@vite-pwa/nuxt",
  ],

  pwa: {
    registerType: 'autoUpdate',
    manifest: false, // Вже є site.webmanifest
    workbox: {
      // No SPA fallback: every page is prerendered, so a navigation must get its own HTML.
      navigateFallback: null,
      // Precache only the app shell assets; images/icons are cached on demand below.
      globPatterns: ['_nuxt/**/*.{js,css,woff2}', 'favicon.ico', 'logo.svg'],
      runtimeCaching: [
        {
          // Pages + their extracted payloads: fresh from the network, cached copy offline.
          urlPattern: ({ request, url }) =>
            request.mode === 'navigate' || url.pathname.endsWith('/_payload.json'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 днів
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 днів
            },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600, // Перевіряти оновлення кожну годину
    },
    devOptions: {
      enabled: false, // Вимкнути в dev режимі
      type: 'module',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/uk",
        "/about-me",
        "/uk/about-me",
        "/works",
        "/uk/works",
        "/sitemap.xml",
        "/robots.txt",
      ],
      failOnError: false,
    },
    esbuild: {
      options: {
        target: "es2022",
      },
    },
  },

  experimental: {
    inlineSSRStyles: true,
    payloadExtraction: true,
  },

  css: [
    "@fontsource-variable/geist/index.css",
    "@fontsource-variable/geist-mono/index.css",
    "@/assets/styles/main.scss",
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/assets/styles/_variables.scss" as *; @use "@/assets/styles/_responsive.scss" as *;',
        },
      },
    },
  },

  app: {
    baseURL,
    buildAssetsDir: process.env.NUXT_APP_BUILD_ASSETS_DIR || "/_nuxt/",
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
      meta: [
        { name: "format-detection", content: "telephone=no" },
        { name: "author", content: "Yurii Larsen" },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { name: "theme-color", content: "#7e3eff" },
        { name: "color-scheme", content: "dark light" },
        { name: "referrer", content: "strict-origin-when-cross-origin" },
        { name: "msapplication-TileColor", content: "#7e3eff" },
        { name: "msapplication-config", content: "/browserconfig.xml" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
        { name: "apple-mobile-web-app-title", content: "YL Portfolio" },
        { name: "twitter:creator", content: "@hel1_yeah" },
        { name: "twitter:site", content: "@hel1_yeah" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/icons/favicon-16x16.png" },
      ],
      script: [
        { innerHTML: themeBootScript(), tagPriority: "critical" },
        {
          innerHTML: localeRedirectScript({
            baseURL,
            defaultLocale: localesConfig.defaultLocale,
            locales: localesConfig.locales.map((locale) => locale.code),
          }),
          tagPriority: "critical",
        },
      ],
    },
  },
});
