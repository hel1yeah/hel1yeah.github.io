<template>
  <button
    :title="currentThemeName"
    :aria-label="`Switch to ${store.currentTheme === 'dark' ? 'light' : 'dark'} theme. Current: ${currentThemeName}`"
    class="theme-btn"
    type="button"
    @click="store.toggleTheme()"
    @keydown.enter="store.toggleTheme()"
    @keydown.space.prevent="store.toggleTheme()"
  >
    <!-- Moon (solid crescent, shown in dark) -->
    <svg
      v-if="store.currentTheme === 'dark'"
      class="theme-btn__icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-3.37.73 8.15 8.15 0 0 1-8.05-6.16 8.49 8.49 0 0 1 .25-4.29 1 1 0 0 0-.3-1.06 1 1 0 0 0-1-.22 10 10 0 1 0 13.7 12.14 1 1 0 0 0-.18-1z" />
    </svg>
    <!-- Sun (solid disc + rays, shown in light) -->
    <svg
      v-else
      class="theme-btn__icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
      <line x1="12" y1="2.4" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="21.6" />
      <line x1="2.4" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="21.6" y2="12" />
      <line x1="4.9" y1="4.9" x2="6.9" y2="6.9" />
      <line x1="17.1" y1="17.1" x2="19.1" y2="19.1" />
      <line x1="4.9" y1="19.1" x2="6.9" y2="17.1" />
      <line x1="17.1" y1="6.9" x2="19.1" y2="4.9" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGlobalStore } from "~/stores/useGlobalStore";

const store = useGlobalStore();
const { t } = useI18n();

const currentThemeName = computed(() =>
  store.currentTheme === "light" ? t("theme.nature") : t("theme.dark")
);
</script>

<style scoped lang="scss">
  .theme-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--fg);
    cursor: pointer;
    transition:
      background var(--duration-fast) var(--ease-out),
      border-color var(--duration-fast) var(--ease-out),
      color var(--duration-fast) var(--ease-out);

    &:hover {
      background: var(--bg-subtle);
      border-color: var(--border-strong);
      color: var(--fg);
    }

    &:active { transform: scale(0.95); }
  }

  .theme-btn__icon {
    transition: transform var(--duration-slow) var(--ease-out);
  }

  .theme-btn:hover .theme-btn__icon {
    transform: rotate(-15deg);
  }
</style>
