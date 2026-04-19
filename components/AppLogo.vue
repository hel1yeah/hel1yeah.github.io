<script setup lang="ts">
const props = defineProps<{
  width?: string;
  height?: string;
}>();
</script>

<template>
  <img
    :width="props.width || '40'"
    :height="props.height || '40'"
    src="/logo.svg"
    alt="HELL_YEAH logo"
    class="app-logo"
    decoding="async"
    loading="eager"
  />
</template>

<style scoped lang="scss">
.app-logo {
  display: block;
  object-fit: contain;
}
</style>
