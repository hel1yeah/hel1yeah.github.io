<template>
	<article :class="['about', { 'about--page': page, 'about--excerpt': !page }]">
		<header class="about__header">
			<span class="about__kicker">{{ $t('aboutMe.background') }}</span>
			<h2 class="about__role" ref="roleRef">{{ $t('aboutMe.jobTitle') }}</h2>
			<ul class="about__stack" aria-label="stack">
				<li v-for="tag in stackTags" :key="tag" class="about__tag">{{ tag }}</li>
			</ul>
		</header>

		<div class="about__body">
			<p class="about__p about__p--lead" ref="p1Ref">{{ $t('aboutMe.description1') }}</p>
			<p class="about__p" ref="p2Ref">{{ $t('aboutMe.description2') }}</p>
			<p class="about__p" ref="p3Ref">{{ $t('aboutMe.description3') }}</p>
			<p class="about__p" ref="p4Ref">{{ $t('aboutMe.description4') }}</p>
			<p class="about__p" ref="p5Ref">{{ $t('aboutMe.description5') }}</p>
		</div>
	</article>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { useFlyingLetters } from '~/composables/useFlyingLetters';
	import { useGlobalStore } from '~/stores/useGlobalStore';

	const props = defineProps({
		page: { type: Boolean, default: true },
	});

	const stackTags = ['Vue 3', 'Nuxt 3', 'TypeScript', 'Pinia', 'GSAP', 'SCSS'];

	const roleRef = ref<HTMLElement | null>(null);
	const p1Ref = ref<HTMLElement | null>(null);
	const p2Ref = ref<HTMLElement | null>(null);
	const p3Ref = ref<HTMLElement | null>(null);
	const p4Ref = ref<HTMLElement | null>(null);
	const p5Ref = ref<HTMLElement | null>(null);

	const globalStore = useGlobalStore();

	onMounted(() => {
		// Flying letters only on home excerpt — full /about-me page stays static.
		if (props.page) return;
		if (!globalStore.isDesktop) return;

		const targets = [roleRef, p1Ref, p2Ref, p3Ref, p4Ref, p5Ref];
		targets.forEach((r) =>
			useFlyingLetters(r, { useScrollTrigger: true }),
		);
	});
</script>

<style scoped lang="scss">
	.about {
		max-width: 70ch;
	}

	.about--page {
		width: 100%;
		max-width: $container-max;
		margin-inline: auto;
		padding-inline: $container-padding;
		padding-block: clamp(2rem, 5vw, 4rem);
	}

	.about__header {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
		margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
		padding-bottom: clamp(1.25rem, 2.5vw, 2rem);
		border-bottom: 1px solid var(--border);
	}

	.about__kicker {
		font-family: $font-family-mono;
		font-size: $font-size-xs;
		letter-spacing: $tracking-caps;
		text-transform: uppercase;
		color: var(--accent);
	}

	.about__role {
		font-size: clamp(1.5rem, 3.5vw, 2.25rem);
		font-weight: $font-weight-semibold;
		letter-spacing: -0.02em;
		line-height: 1.15;
		color: var(--fg);
		margin: 0;
	}

	.about__stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.about__tag {
		padding: 0.25rem 0.625rem;
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		font-family: $font-family-mono;
		font-size: $font-size-xs;
		letter-spacing: -0.005em;
		color: var(--fg-muted);
	}

	.about__body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.about__p {
		font-size: $font-size-base;
		line-height: 1.65;
		color: var(--fg-muted);
		margin: 0;
	}

	.about__p--lead {
		font-size: clamp(1rem, 1.4vw, 1.0625rem);
		color: var(--fg);
		line-height: 1.55;
	}

	// Excerpt mode (home page) — clamp paragraphs, no lead emphasis.
	.about--excerpt {
		.about__body {
			max-height: 14rem;
			overflow: hidden;
			mask-image: linear-gradient(to bottom, #000 65%, transparent 100%);
			-webkit-mask-image: linear-gradient(to bottom, #000 65%, transparent 100%);
		}

		.about__p--lead {
			font-size: $font-size-base;
			color: var(--fg-muted);
		}
	}
</style>
