<script setup lang="ts">
import { useJsonLd } from "~/composables/useJsonLd";
import { useGlobalStore } from "~/stores/useGlobalStore";
import { themeFaviconLinks } from "~/utils/themeFavicon";

const globalStore = useGlobalStore();

useHead({
  htmlAttrs: {
    lang: useI18n().locale.value,
  },
  // Favicon follows the site theme (dark/light tile with the accent glow).
  link: computed(() => themeFaviconLinks(globalStore.theme)),
});

// Global JSON-LD (Person + WebSite) — applies on every route.
useJsonLd();
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
