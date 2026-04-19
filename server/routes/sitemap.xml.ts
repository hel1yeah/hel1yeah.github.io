interface RouteEntry {
	path: string;
	priority: string;
	changefreq: string;
}

const SITE_ORIGIN = 'https://yurii-larsen.com';

const ROUTES: RouteEntry[] = [
	{ path: '/', priority: '1.0', changefreq: 'monthly' },
	{ path: '/about-me', priority: '0.8', changefreq: 'monthly' },
	{ path: '/works', priority: '0.9', changefreq: 'weekly' },
];

const LOCALES = [
	{ code: 'en', iso: 'en-US', prefix: '' },
	{ code: 'uk', iso: 'uk-UA', prefix: '/uk' },
];

const DEFAULT_LOCALE_CODE = 'en';

function buildLocalizedUrl(prefix: string, path: string): string {
	if (path === '/') return `${SITE_ORIGIN}${prefix || '/'}`;
	return `${SITE_ORIGIN}${prefix}${path}`;
}

function xmlEscape(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export default defineEventHandler((event) => {
	const lastmod = new Date().toISOString().slice(0, 10);

	const urlBlocks = ROUTES.flatMap((route) =>
		LOCALES.map((locale) => {
			const loc = buildLocalizedUrl(locale.prefix, route.path);
			const alternates = LOCALES.map(
				(alt) =>
					`    <xhtml:link rel="alternate" hreflang="${alt.iso}" href="${xmlEscape(
						buildLocalizedUrl(alt.prefix, route.path),
					)}" />`,
			).join('\n');
			const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(
				buildLocalizedUrl(
					LOCALES.find((l) => l.code === DEFAULT_LOCALE_CODE)?.prefix ?? '',
					route.path,
				),
			)}" />`;

			return [
				'  <url>',
				`    <loc>${xmlEscape(loc)}</loc>`,
				`    <lastmod>${lastmod}</lastmod>`,
				`    <changefreq>${route.changefreq}</changefreq>`,
				`    <priority>${route.priority}</priority>`,
				alternates,
				xDefault,
				'  </url>',
			].join('\n');
		}),
	).join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlBlocks}
</urlset>`;

	setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
	setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400');
	return xml;
});
