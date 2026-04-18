export default {
	locales: [
		{ code: 'en', name: 'English', file: 'en-US.json', iso: 'en-US' },
		{ code: 'uk', name: 'Українська', file: 'uk-UA.json', iso: 'uk-UA' },
	],
	lazy: true,
	langDir: 'locales',
	defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE || 'en',
	strategy: 'prefix_except_default',
	detectBrowserLanguage: {
		useCookie: true,
		cookieKey: 'i18n_redirected',
		redirectOn: 'root', // Тільки на головній сторінці
		alwaysRedirect: false, // Не перенаправляти щоразу, якщо вже встановлено
		fallbackLocale: 'en',
	},
	bundle: {
		optimizeTranslationDirective: false,
	},
};
