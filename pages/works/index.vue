<script setup lang="ts">
import AppWorks from '@/components/AppWorks.vue';
import { useSeo } from '~/composables/useSeo';

definePageMeta({
	layout: 'default',
});

useSeo('works', { path: '/works' });
</script>
<template>
	<AppWorks :page="true" />
</template>

<style scoped lang="scss"></style>
