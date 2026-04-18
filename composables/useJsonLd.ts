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

	const role = t('seo.jsonLd.role');
	const summary = t('seo.jsonLd.summary');
	const knowsAbout = t('seo.jsonLd.knowsAbout')
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);

	const graph = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': `${SITE_ORIGIN}/#person`,
				name: PERSON_NAME,
				alternateName: PERSON_ALT_NAME,
				url: SITE_ORIGIN,
				jobTitle: role,
				description: summary,
				knowsAbout,
				sameAs: SAME_AS,
				nationality: { '@type': 'Country', name: 'Ukraine' },
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_ORIGIN}/#website`,
				url: SITE_ORIGIN,
				name: t('seo.og.siteName'),
				inLanguage: locale.value,
				publisher: { '@id': `${SITE_ORIGIN}/#person` },
			},
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
