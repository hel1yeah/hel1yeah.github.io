<template>
	<section ref="sectionRef" class="skills" id="skills">
		<header data-reveal class="skills__header">
			<span class="skills__kicker">{{ $t('skills') }}</span>
			<h2 class="skills__title">Tools I build with</h2>
		</header>

		<div data-reveal class="skills__content">
			<AppSlider
				v-for="(skill, index) in skills"
				:key="index"
				:items="skill"
				:animationDuration="getAnimationDuration(index)"
				loop
				:rtl="index % 2 === 0"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
	import AppSlider from '@/components/AppSlider.vue';
	import { ref, onMounted } from 'vue';
	import { useReveal } from '~/composables/useReveal';

	// Different durations per row — rhythm comes from varying speeds.
	const getAnimationDuration = (index: number) => {
		const durations = [55000, 42000, 68000];
		return durations[index];
	};

	const sectionRef = ref<HTMLElement | null>(null);
	onMounted(() =>
		useReveal(sectionRef, {
			childSelector: '[data-reveal]',
			y: 20,
			stagger: 0.2,
			duration: 1.2,
		}),
	);

	const skills: { name: string; level: string; link: string }[][] = [
		[
			{
				name: 'HTML5',
				level: '🏗️',
				link: 'https://developer.mozilla.org/',
			},
			{
				name: 'CSS3',
				level: '🎨',
				link: 'https://www.w3.org/Style/CSS/',
			},
			{
				name: 'SCSS',
				level: '🎨',
				link: 'https://sass-lang.com/',
			},
			{ name: 'BEM', level: '🎨', link: 'https://getbem.com/' },
			{
				name: 'Adaptive',
				level: '📱',
				link: 'https://developer.mozilla.org/',
			},
			{
				name: 'JavaScript',
				level: '⚡',
				link: 'https://www.javascript.com/',
			},
			{
				name: 'TypeScript',
				level: '💎',
				link: 'https://www.typescriptlang.org/',
			},
		],
		[
			{ name: 'Vue.js', level: '🔥', link: 'https://vuejs.org/' },
			{ name: 'Git', level: '🌿', link: 'https://git-scm.com/' },
			{ name: 'GitHub', level: '🌿', link: 'https://github.com/' },
			{
				name: 'Photoshop',
				level: '🖌️',
				link: 'https://www.adobe.com/products/photoshop.html',
			},
			{ name: 'Figma', level: '🖌️', link: 'https://www.figma.com/' },
			{ name: 'Elementary', level: '🧩', link: 'https://elementary.io/' },
			{ name: 'GSAP', level: '✨', link: 'https://gsap.com/' },
		],
		[
			{ name: 'REST API', level: '🌐', link: 'https://restfulapi.net/' },
			{ name: 'Axios', level: '🌐', link: 'https://axios-http.com/' },
			{ name: 'Pinia', level: '🗄️', link: 'https://pinia.vuejs.org/' },
			{ name: 'Vuex', level: '🗄️', link: 'https://vuex.vuejs.org/' },
			{ name: 'Pixi.js', level: '🎮', link: 'https://pixijs.com/' },
			{ name: 'Capacitor', level: '📲', link: 'https://capacitorjs.com/' },
			{ name: 'Ionic', level: '📲', link: 'https://ionicframework.com/' },
			{
				name: 'SEO',
				level: '🚀',
				link: 'https://developers.google.com/search',
			},
		],
	];
</script>

<style scoped lang="scss">
	.skills {
		margin-top: clamp(4rem, 8vw, 7rem);
	}

	.skills__header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
	}

	.skills__kicker {
		font-family: $font-family-mono;
		font-size: $font-size-xs;
		letter-spacing: $tracking-caps;
		text-transform: uppercase;
		color: var(--accent);
	}

	.skills__title {
		font-size: clamp(1.75rem, 4vw, 2.75rem);
		font-weight: $font-weight-semibold;
		letter-spacing: -0.025em;
		color: var(--fg);
	}

	.skills__content {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
