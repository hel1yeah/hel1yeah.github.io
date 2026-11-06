# Icons

Everything in this folder (plus `public/favicon.ico`, `public/favicon.png`,
`public/favicon-dark.svg`, `public/favicon-light.svg`) is **generated** from the
header logo `public/logo.svg` — don't edit the files by hand:

```bash
npm run icons   # needs Google Chrome (CHROME_PATH to override); cwebp optional
```

The generator lives in `scripts/icons/generate-icons.mjs`.

| Files | Content |
|-------|---------|
| `favicon-16x16`, `favicon-32x32`, `favicon.ico`, `favicon-dark.svg` | Logo *mark* (no HELL_YEAH banner) on a dark tile with purple glow |
| `favicon-light-*`, `favicon-light.svg` | Same mark on a light tile with orange glow — swapped in when the site theme is light |
| `icon-*` (72–512), `apple-touch-icon` | Full logo on the dark brand tile, inside the maskable safe zone |
| `mstile-*` | Windows tiles (see `browserconfig.xml`) |
| `shortcut-about`, `shortcut-works`, `shortcut-cv` | Mark + action badge for the PWA shortcuts in `site.webmanifest` |

`.webp` copies are produced alongside the PNGs when `cwebp` is installed.
