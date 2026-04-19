/**
 * Injects Person + WebSite JSON-LD structured data as one <script type="application/ld+json">.
 * Call once from app.vue (root) so it applies on every route.
 */
const SITE_ORIGIN = 'https://yurii-larsen.com';
const PERSON_NAME = 'Yurii Larsen';
const PERSON_ALT_NAME = 'hel1_yeah';
const SAME_AS = [
	'https://github.com/hel1yeah',
	'https://www.linkedin.com/in/yura-larsen/',
	'https://t.me/hel1_yeah',
	'https://www.facebook.com/YuraLarsen',
];

export function useJsonLd() {
	const { t, locale } = useI18n();
	const route = useRoute();
	const localePath = useLocalePath();

	const role = t('seo.jsonLd.role');
	const summary = t('seo.jsonLd.summary');
	const knowsAbout = t('seo.jsonLd.knowsAbout')
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);

	const breadcrumb = buildBreadcrumb(route.path, t, localePath);

	const graph = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': `${SITE_ORIGIN}/#person`,
				name: PERSON_NAME,
				alternateName: PERSON_ALT_NAME,
				url: SITE_ORIGIN,
				image: `${SITE_ORIGIN}/og-image.jpg`,
				jobTitle: role,
				description: summary,
				knowsAbout,
				sameAs: SAME_AS,
				nationality: { '@type': 'Country', name: 'Ukraine' },
				email: 'mailto:zoltic.sp.zoo@gmail.com',
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_ORIGIN}/#website`,
				url: SITE_ORIGIN,
				name: t('seo.og.siteName'),
				inLanguage: locale.value,
				publisher: { '@id': `${SITE_ORIGIN}/#person` },
				potentialAction: {
					'@type': 'SearchAction',
					target: `${SITE_ORIGIN}/works?q={search_term_string}`,
					'query-input': 'required name=search_term_string',
				},
			},
			{
				'@type': 'ProfilePage',
				'@id': `${SITE_ORIGIN}${route.path}#profilepage`,
				url: `${SITE_ORIGIN}${route.path}`,
				inLanguage: locale.value,
				mainEntity: { '@id': `${SITE_ORIGIN}/#person` },
				isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
			},
			...(breadcrumb ? [breadcrumb] : []),
		],
	};

	useHead({
		script: [
			{
				type: 'application/ld+json',
				innerHTML: JSON.stringify(graph),
			},
		],
	});
}

type TFn = (key: string) => string;
type LocalePathFn = (path: string) => string;

function buildBreadcrumb(path: string, t: TFn, localePath: LocalePathFn) {
	const normalized = path.replace(/^\/(uk|en)/, '') || '/';
	if (normalized === '/') return null;

	const items = [
		{
			'@type': 'ListItem',
			position: 1,
			name: t('home'),
			item: `${SITE_ORIGIN}${localePath('/')}`,
		},
	];

	if (normalized === '/about-me') {
		items.push({
			'@type': 'ListItem',
			position: 2,
			name: t('about-me'),
			item: `${SITE_ORIGIN}${localePath('/about-me')}`,
		});
	} else if (normalized === '/works') {
		items.push({
			'@type': 'ListItem',
			position: 2,
			name: t('works.title'),
			item: `${SITE_ORIGIN}${localePath('/works')}`,
		});
	}

	return {
		'@type': 'BreadcrumbList',
		'@id': `${SITE_ORIGIN}${path}#breadcrumb`,
		itemListElement: items,
	};
}
