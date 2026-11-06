#!/usr/bin/env node
/**
 * Generates every favicon / PWA / tile / shortcut icon from the header logo
 * (public/logo.svg). Run: `npm run icons` (needs Google Chrome; set CHROME_PATH
 * if it isn't at the default macOS location; `cwebp` is optional for .webp copies).
 *
 * - Small sizes (favicons, shortcuts) use the "mark": the logo without the
 *   HELL_YEAH banner, which is unreadable at 16–32 px.
 * - Favicons come in dark/light variants (tile + accent glow of the site theme);
 *   the site swaps them when the theme changes (utils/themeFavicon.ts).
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const PUBLIC = join(ROOT, 'public');
const CHROME_PATH =
	process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const THEMES = {
	dark: { bg: '#0c0a16', glow: '#7e3eff' },
	light: { bg: '#fafaf7', glow: '#ff5526' },
};

// ── Logo sources ──────────────────────────────────────────────────────────
const logoSvg = readFileSync(join(PUBLIC, 'logo.svg'), 'utf8');
const logoInner = (svg) => svg.slice(svg.indexOf('>', svg.indexOf('<svg')) + 1, svg.lastIndexOf('</svg>'));
const fullLogo = logoInner(logoSvg);
// Mark = logo without the banner ribbon and the lettering (both sit at the end of the file).
const markLogo = logoInner(
	logoSvg.slice(0, logoSvg.indexOf('<path id="banner"')) + logoSvg.slice(logoSvg.lastIndexOf('</svg>')),
);

/** Embeds the 200×200 logo artwork into a box of the outer SVG (fill="none" as on the logo root). */
const placeLogo = (artwork, x, y, size) =>
	`<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 200 200" fill="none">${artwork}</svg>`;

const glowDefs = (glow, id = 'glow') =>
	`<defs><radialGradient id="${id}" cx="50%" cy="55%" r="50%">` +
	`<stop offset="0%" stop-color="${glow}" stop-opacity="0.55"/>` +
	`<stop offset="100%" stop-color="${glow}" stop-opacity="0"/></radialGradient></defs>`;

/** Square tile: background, accent glow, logo centered at `scale` of the tile. */
function tileSvg({ size, theme, artwork, scale, radius = 0 }) {
	const { bg, glow } = THEMES[theme];
	const logoSize = size * scale;
	const offset = (size - logoSize) / 2;
	return (
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">` +
		glowDefs(glow) +
		`<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>` +
		`<rect width="${size}" height="${size}" rx="${radius}" fill="url(#glow)"/>` +
		placeLogo(artwork, offset, offset, logoSize) +
		`</svg>`
	);
}

/** Wide tile (310×150) with the full logo centered. */
function wideTileSvg({ width, height, theme }) {
	const { bg, glow } = THEMES[theme];
	const logoSize = height * 0.8;
	return (
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">` +
		glowDefs(glow) +
		`<rect width="${width}" height="${height}" fill="${bg}"/>` +
		`<rect width="${width}" height="${height}" fill="url(#glow)"/>` +
		placeLogo(fullLogo, (width - logoSize) / 2, (height - logoSize) / 2, logoSize) +
		`</svg>`
	);
}

// 24×24 glyphs for the shortcut badges.
const GLYPHS = {
	about: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
	works: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
	cv: '<path d="M6 2h8l5 5v15H6z"/><path d="M14 2v5h5"/><path d="M9 12h7M9 16h7"/>',
};

/** Shortcut icon: mark on the dark tile + an accent badge with the action glyph. */
function shortcutSvg(glyph) {
	const size = 96;
	const { glow } = THEMES.dark;
	const badge = 40;
	const badgeX = size - badge - 4;
	const badgeY = size - badge - 4;
	return (
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">` +
		tileSvg({ size, theme: 'dark', artwork: markLogo, scale: 0.72, radius: 20 }).replace(/^<svg[^>]*>|<\/svg>$/g, '') +
		`<circle cx="${badgeX + badge / 2}" cy="${badgeY + badge / 2}" r="${badge / 2}" fill="${glow}" stroke="#0c0a16" stroke-width="3"/>` +
		`<svg x="${badgeX + 9}" y="${badgeY + 9}" width="${badge - 18}" height="${badge - 18}" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${GLYPHS[glyph]}</svg>` +
		`</svg>`
	);
}

// ── Icon list ─────────────────────────────────────────────────────────────
const favicon = (theme, size) =>
	tileSvg({ size: 64, theme, artwork: markLogo, scale: 0.9, radius: 14 }).replace(
		'width="64" height="64"',
		`width="${size}" height="${size}"`,
	);
const appIcon = (size, scale = 0.72) => tileSvg({ size, theme: 'dark', artwork: fullLogo, scale });

const rasters = [
	// Theme-aware favicons (dark = default in the HTML, light swapped in by JS)
	...[16, 32].flatMap((size) => [
		{ file: `icons/favicon-${size}x${size}.png`, size, svg: favicon('dark', size) },
		{ file: `icons/favicon-light-${size}x${size}.png`, size, svg: favicon('light', size) },
	]),
	{ file: 'favicon.png', size: 32, svg: favicon('dark', 32) },
	{ file: '.ico-48.png', size: 48, svg: favicon('dark', 48), temp: true },
	// PWA / app icons: full logo, dark brand tile, logo inside the maskable safe zone
	...[72, 96, 128, 144, 152, 192, 384, 512].map((size) => ({
		file: `icons/icon-${size}x${size}.png`,
		size,
		svg: appIcon(size),
	})),
	{ file: 'icons/apple-touch-icon.png', size: 180, svg: appIcon(180, 0.78) },
	// Windows tiles
	...[70, 150, 310].map((size) => ({
		file: `icons/mstile-${size}x${size}.png`,
		size,
		svg: appIcon(size, 0.62),
	})),
	{ file: 'icons/mstile-310x150.png', width: 310, height: 150, svg: wideTileSvg({ width: 310, height: 150, theme: 'dark' }) },
	// PWA shortcuts
	...Object.keys(GLYPHS).map((glyph) => ({ file: `icons/shortcut-${glyph}.png`, size: 96, svg: shortcutSvg(glyph) })),
];

// ── Vector favicons ───────────────────────────────────────────────────────
for (const theme of Object.keys(THEMES)) {
	writeFileSync(join(PUBLIC, `favicon-${theme}.svg`), `${favicon(theme, 64)}\n`);
}

// ── Rasterize all SVGs in one headless Chrome run ─────────────────────────
const work = mkdtempSync(join(tmpdir(), 'icons-'));
const jobs = rasters.map(({ file, size, width, height, svg }) => ({
	file,
	width: width ?? size,
	height: height ?? size,
	svg,
}));
writeFileSync(
	join(work, 'render.html'),
	`<!doctype html><meta charset="utf-8"><pre id="out"></pre><script>
const jobs = ${JSON.stringify(jobs)};
(async () => {
  const results = {};
  for (const job of jobs) {
    const url = URL.createObjectURL(new Blob([job.svg], { type: 'image/svg+xml' }));
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
    const canvas = document.createElement('canvas');
    canvas.width = job.width; canvas.height = job.height;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, job.width, job.height);
    results[job.file] = canvas.toDataURL('image/png');
    URL.revokeObjectURL(url);
  }
  document.getElementById('out').textContent = JSON.stringify(results);
})();
</script>`,
);
const dom = execFileSync(
	CHROME_PATH,
	['--headless=new', '--disable-gpu', '--virtual-time-budget=20000', '--dump-dom', `file://${join(work, 'render.html')}`],
	{ encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] },
);
const json = dom.slice(dom.indexOf('<pre id="out">') + 14, dom.indexOf('</pre>'))
	.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const pngs = JSON.parse(json);

const written = [];
for (const [file, dataUrl] of Object.entries(pngs)) {
	const target = file.startsWith('.') ? join(work, file) : join(PUBLIC, file);
	writeFileSync(target, Buffer.from(dataUrl.split(',')[1], 'base64'));
	if (!file.startsWith('.')) written.push(file);
}

// ── favicon.ico (PNG-compressed entries: 16, 32, 48) ──────────────────────
const icoEntries = [
	readFileSync(join(PUBLIC, 'icons/favicon-16x16.png')),
	readFileSync(join(PUBLIC, 'icons/favicon-32x32.png')),
	readFileSync(join(work, '.ico-48.png')),
];
const icoSizes = [16, 32, 48];
const header = Buffer.alloc(6 + 16 * icoEntries.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoEntries.length, 4);
let offset = header.length;
icoEntries.forEach((png, index) => {
	const at = 6 + index * 16;
	header.writeUInt8(icoSizes[index], at);
	header.writeUInt8(icoSizes[index], at + 1);
	header.writeUInt16LE(1, at + 4);
	header.writeUInt16LE(32, at + 6);
	header.writeUInt32LE(png.length, at + 8);
	header.writeUInt32LE(offset, at + 12);
	offset += png.length;
});
writeFileSync(join(PUBLIC, 'favicon.ico'), Buffer.concat([header, ...icoEntries]));
written.push('favicon.ico', 'favicon-dark.svg', 'favicon-light.svg');

// ── .webp copies of the icons/ PNGs (optional) ────────────────────────────
const hasCwebp = spawnSync('cwebp', ['-version'], { stdio: 'ignore' }).status === 0;
if (hasCwebp) {
	for (const file of written.filter((name) => name.startsWith('icons/') && name.endsWith('.png'))) {
		const source = join(PUBLIC, file);
		execFileSync('cwebp', ['-quiet', '-q', '90', source, '-o', source.replace(/\.png$/, '.webp')]);
	}
} else {
	console.warn('cwebp not found — skipped .webp copies');
}

rmSync(work, { recursive: true, force: true });
console.info(`Generated ${written.length} icons${hasCwebp ? ' (+ .webp copies)' : ''}.`);
