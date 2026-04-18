<script setup lang="ts">
	import TheHeaderNav from '~/components/TheHeaderNav.vue';
	import TheFooter from '~/components/TheFooter.vue';
</script>

<template>
	<div class="layout">
		<TheHeaderNav />
		<main class="layout__main">
			<slot />
		</main>

		<TheFooter />
	</div>
</template>

<style lang="scss" scoped>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-height: 100svh;
		padding-top: 100px;
	}

	.layout__main {
		flex: 1 0 auto;
		width: 100%;
	}
</style>
