/**
 * Page-level SEO builder.
 *
 * Reads titles / descriptions / keywords from i18n (`seo.<key>.*`), composes
 * canonical URL + hreflang alternates, and returns the full useHead() payload.
 *
 * Usage:
 *   useSeo('home');
 *   useSeo('aboutMe', '/about-me');
 *   useSeo('notFound', null, { noindex: true });
 */
const SITE_ORIGIN = 'https://yurii-larsen.com';
const OG_IMAGE = '/og-image.jpg';

type SeoKey = 'home' | 'aboutMe' | 'works' | 'notFound';

interface SeoOptions {
	/** Add <meta name="robots" content="noindex, nofollow"> (e.g. 404). */
	noindex?: boolean;
	/** Override canonical / og:url path. Defaults to current route. */
	path?: string;
}

export function useSeo(key: SeoKey, options: SeoOptions = {}) {
	const { t, locale, locales } = useI18n();
	const route = useRoute();
	const switchLocalePath = useSwitchLocalePath();
	const localePath = useLocalePath();

	const path = options.path ?? route.path;
	const canonicalUrl = `${SITE_ORIGIN}${path}`;

	const title = t(`seo.${key}.title`);
	const description = t(`seo.${key}.description`);
	const keywords = te(`seo.${key}.keywords`) ? t(`seo.${key}.keywords`) : '';
	const siteName = t('seo.og.siteName');
	const ogLocale = t('seo.og.locale');
	const imageAlt = t('seo.og.imageAlt');

	// Build hreflang alternates for every locale.
	const alternates = (locales.value as Array<{ code: string; iso?: string }>).map(
		(l) => ({
			rel: 'alternate',
			hreflang: l.iso ?? l.code,
			href: `${SITE_ORIGIN}${switchLocalePath(l.code) || localePath(path)}`,
		}),
	);

	const meta: Array<{ name?: string; property?: string; content: string }> = [
		{ name: 'description', content: description },
	];
	if (keywords) meta.push({ name: 'keywords', content: keywords });
	if (options.noindex) {
		meta.push({ name: 'robots', content: 'noindex, nofollow' });
	}

	// Open Graph
	meta.push(
		{ property: 'og:type', content: key === 'home' ? 'website' : 'article' },
		{ property: 'og:title', content: title },
		{ property: 'og:description', content: description },
		{ property: 'og:url', content: canonicalUrl },
		{ property: 'og:site_name', content: siteName },
		{ property: 'og:locale', content: ogLocale },
		{ property: 'og:image', content: `${SITE_ORIGIN}${OG_IMAGE}` },
		{ property: 'og:image:width', content: '1200' },
		{ property: 'og:image:height', content: '630' },
		{ property: 'og:image:alt', content: imageAlt },
	);

	// Twitter
	meta.push(
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description },
		{ name: 'twitter:image', content: `${SITE_ORIGIN}${OG_IMAGE}` },
		{ name: 'twitter:image:alt', content: imageAlt },
	);

	useHead({
		title,
		meta,
		link: [
			{ rel: 'canonical', href: canonicalUrl },
			...alternates,
		],
		htmlAttrs: {
			lang: locale.value,
		},
	});
}

// Helper: `te()` — "translation exists"
function te(k: string): boolean {
	const { te: _te } = useI18n();
	return _te(k);
}
