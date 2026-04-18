<script setup lang="ts">
import { useJsonLd } from "~/composables/useJsonLd";

useHead({
  htmlAttrs: {
    lang: useI18n().locale.value,
  },
});

// Global JSON-LD (Person + WebSite) — applies on every route.
useJsonLd();
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
