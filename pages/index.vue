<script setup lang="ts">
definePageMeta({
	layout: 'default',
});

import TheFirstScrean from '~/views/TheFirstScrean.vue';
import ThaAboutMe from '~/views/ThaAboutMe.vue';
import TheWorks from '~/views/TheWorks.vue';
import AppSkills from '~/components/AppSkills.vue';
import { useSeo } from '~/composables/useSeo';

useSeo('home', { path: '/' });
</script>

<template>
	<div class="index-page container">
		<!-- <h1>{{ $t("welcome") }}</h1>
    <LocalesSwitcher />
    <ThemeSwitcher />
    <AppLogo width="100" height="100" /> -->
		<TheFirstScrean />
		<ThaAboutMe />
		<AppSkills />
		<TheWorks />
	</div>
</template>

<style lang="scss" scoped></style>
