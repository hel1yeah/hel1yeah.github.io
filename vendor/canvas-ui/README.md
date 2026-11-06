# Canvas UI (vendored)

Unmodified files from [Canvas UI](https://canvasui.dev) by David Haz,
source repository <https://github.com/DavidHDev/canvas-ui>, pinned to commit
`a04a99b235299ee79a123a16ccb2e6cf9da74b6b` (`src/lib/…`).

Licensed under **MIT + Commons Clause** — see [LICENSE.md](./LICENSE.md). Use is
allowed as part of this website; the components themselves must not be sold,
sublicensed or redistributed (including as a ported version).

| File | Used by |
|------|---------|
| `FlameWrap/FlameWrapVanilla.ts` | `components/Style/FlameFrame.vue` (fire around the About side column) |
| `ParticleScroll/ParticleScroll.vue` + `ParticleScrollVanilla.ts` | `views/TheFirstScrean.vue` (hero, only where html-in-canvas is supported) |
| `canvas-viewport.ts`, `html-in-canvas.ts` | shared helpers imported by both engines |

Do not edit these files — update them by re-downloading from a newer commit.
Both effects need WebGL2; the content-capturing modes also need Chrome's
experimental html-in-canvas API (`chrome://flags/#canvas-draw-element`).
