<script setup lang="ts">
	import UkraineFlagSvg from './SVGcomponents/UkraineFlagSvg.vue';
	import UkFlagSvg from './SVGcomponents/UkFlagSvg.vue';

	const { locale, locales, setLocaleCookie } = useI18n();
	const switchLocalePath = useSwitchLocalePath();

	const currentLocale = computed(() => locale.value);
	const otherLocale = computed(() => {
		return locales.value.find((l) => l.code !== currentLocale.value);
	});

	const toggleLocale = async () => {
		if (otherLocale.value) {
			// Зберігаємо вибір користувача в cookie
			setLocaleCookie(otherLocale.value.code);
			// Перенаправляємо на нову мову
			await navigateTo(switchLocalePath(otherLocale.value.code));
		}
	};
</script>

<template>
	<button
		class="locale-btn"
		:title="`Switch to ${otherLocale?.name}`"
		:aria-label="`Switch to ${otherLocale?.name}. Current: ${currentLocale}`"
		type="button"
		@click="toggleLocale"
		@keydown.enter="toggleLocale"
		@keydown.space.prevent="toggleLocale"
	>
		<span class="locale-btn__code">{{ currentLocale.toUpperCase() }}</span>
	</button>
</template>

<style scoped lang="scss">
	.locale-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2rem;
		height: 2rem;
		padding: 0 0.5rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--fg-muted);
		cursor: pointer;
		font-family: $font-family-mono;
		font-size: $font-size-xs;
		font-weight: $font-weight-medium;
		letter-spacing: $tracking-wide;
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

	.locale-btn__code {
		line-height: 1;
	}
</style>
