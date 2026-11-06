/**
 * Tiny blocking scripts injected into <head> of every prerendered page.
 * They run before the first paint, so the static HTML never flashes the
 * wrong theme or the wrong locale. Keep them dependency-free and small.
 */

const THEME_COOKIE = 'theme';
const LOCALE_COOKIE = 'i18n_redirected';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Applies the saved theme (`theme` cookie, default `dark`) to <html> before paint. */
export function themeBootScript(): string {
	return `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)${THEME_COOKIE}=([^;]+)/);var t=m?decodeURIComponent(m[1]):'dark';if(t!=='light')t='dark';var d=document.documentElement;d.setAttribute('data-theme',t);d.classList.add(t==='light'?'light':'app-dark');}catch(e){}})();`;
}

interface LocaleRedirectOptions {
	baseURL: string;
	defaultLocale: string;
	locales: readonly string[];
}

/**
 * On the root URL only: redirects to the saved locale (`i18n_redirected` cookie)
 * or, on a first visit, to the browser's preferred supported locale — before
 * Nuxt boots. This replaces the client-side redirect of @nuxtjs/i18n, which
 * showed the default-locale HTML first and caused a hydration mismatch.
 */
export function localeRedirectScript({ baseURL, defaultLocale, locales }: LocaleRedirectOptions): string {
	const base = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
	return `(function(){try{var base=${JSON.stringify(base)},def=${JSON.stringify(defaultLocale)},codes=${JSON.stringify(locales)};if(location.pathname!==base)return;var m=document.cookie.match(/(?:^|;\\s*)${LOCALE_COOKIE}=([^;]+)/);var target=m?decodeURIComponent(m[1]):null;if(codes.indexOf(target)<0){target=null;var langs=navigator.languages||[navigator.language||''];for(var i=0;i<langs.length&&!target;i++){var code=String(langs[i]).toLowerCase().split('-')[0];if(codes.indexOf(code)>=0)target=code;}target=target||def;document.cookie='${LOCALE_COOKIE}='+target+'; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax';}if(target!==def)location.replace(base+target+'/'+location.search+location.hash);}catch(e){}})();`;
}
