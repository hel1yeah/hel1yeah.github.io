import { useGlobalStore } from "~/stores/useGlobalStore";

export default defineNuxtPlugin((nuxtApp) => {
  const store = useGlobalStore();

  // Debounce function to optimize resize events
  function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return function (...args: Parameters<T>) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Функція для оновлення ширини екрану
  const updateScreenWidth = () => {
    if (import.meta.client) {
      store.updateScreenWidth(window.innerWidth);
    }
  };

  // Debounced version with 300ms delay
  const debouncedUpdate = debounce(updateScreenWidth, 300);

  // Оновлюємо ширину при ініціалізації
  if (import.meta.client) {
    updateScreenWidth();

    // Додаємо слухач події resize
    window.addEventListener("resize", debouncedUpdate);

    // Cleanup on app unmount to prevent memory leaks
    nuxtApp.hook("app:unmounted", () => {
      window.removeEventListener("resize", debouncedUpdate);
    });
  }
});
