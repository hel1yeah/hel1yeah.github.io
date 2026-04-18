<script setup lang="ts">
import AppAboutMe from '@/components/AppAboutMe.vue';
import { useSeo } from '~/composables/useSeo';

definePageMeta({
	layout: 'default',
});

useSeo('aboutMe', { path: '/about-me' });
</script>
<template>
	<AppAboutMe :page="true" />
</template>

<style scoped lang="scss"></style>
