import { useGlobalStore } from "~/stores/useGlobalStore";

// Applies the saved theme only after hydration has fully finished: the prerendered
// Pinia payload always carries the default theme and would otherwise overwrite the
// cookie value. `app:mounted` is too early — async pages are still hydrating then,
// and a theme switch mid-hydration breaks theme-dependent markup (e.g. the switcher icon).
export default defineNuxtPlugin((nuxtApp) => {
  const store = useGlobalStore();
  let synced = false;
  nuxtApp.hook("app:suspense:resolve", () => {
    if (synced) return;
    synced = true;
    store.syncThemeFromCookie();
  });
});
