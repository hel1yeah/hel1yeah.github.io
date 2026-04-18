import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

// Типи
type Theme = "dark" | "light";
type ScreenSize = "mobile" | "tablet" | "desktop";

// Константи для тем
const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

const THEME_CLASSES = {
  [THEMES.LIGHT]: "light",
  [THEMES.DARK]: "app-dark",
} as const;

export const useGlobalStore = defineStore("global", () => {
  // State
  const screenWidth = ref<number>(0);
  const screenSize = ref<ScreenSize>("desktop");

  // Створюємо cookie для теми з використанням вбудованого useCookie
  const themeCookie = useCookie<Theme>("theme", {
    default: () => THEMES.DARK,
    maxAge: 60 * 60 * 24 * 365, // 1 рік
    path: "/",
    sameSite: "strict",
    watch: true, // Спостерігаємо за змінами cookie
  });

  const theme = ref<Theme>(themeCookie.value);

  // Getters
  const isMobile = computed(() => screenSize.value === "mobile");
  const isTablet = computed(() => screenSize.value === "tablet");
  const isDesktop = computed(() => screenSize.value === "desktop");
  const currentTheme = computed(() => theme.value);

  // Actions
  function updateScreenWidth(width: number) {
    screenWidth.value = width;

    // Визначаємо розмір екрану на основі ширини
    if (width < 768) {
      screenSize.value = "mobile";
    } else if (width < 1024) {
      screenSize.value = "tablet";
    } else {
      screenSize.value = "desktop";
    }
  }

  function toggleTheme() {
    const themes: Theme[] = [THEMES.LIGHT, THEMES.DARK];
    const currentIndex = themes.indexOf(theme.value);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme;
    themeCookie.value = newTheme;
  }

  // Спостерігаємо за змінами теми та встановлюємо її в HTML
  watch(
    theme,
    (newTheme) => {
      if (import.meta.client) {
        document.documentElement.setAttribute("data-theme", newTheme);
        // Оновлюємо класи теми
        Object.values(THEME_CLASSES).forEach((className) => {
          document.documentElement.classList.remove(className);
        });
        document.documentElement.classList.add(THEME_CLASSES[newTheme]);
      }
    },
    { immediate: true }
  );

  return {
    // State
    screenWidth,
    screenSize,
    theme,

    // Getters
    isMobile,
    isTablet,
    isDesktop,
    currentTheme,

    // Actions
    updateScreenWidth,
    toggleTheme,
    setTheme,
  };
});
