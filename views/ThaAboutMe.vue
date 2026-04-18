<template>
	<section ref="sectionRef" class="about-section" id="about">
		<header data-reveal class="about-section__header">
			<span class="about-section__kicker">{{ $t('about-me') }}</span>
			<h2 class="about-section__title">A quick introduction</h2>
		</header>

		<div class="about-section__grid">
			<div data-reveal class="about-section__col about-section__col--bio">
				<AppAboutMe :page="false" />
				<NuxtLink
					:to="localePath('/about-me')"
					class="about-section__cta"
				>
					{{ $t('buttons.readMore') }}
					<span aria-hidden="true">→</span>
				</NuxtLink>
			</div>

			<aside class="about-section__col about-section__col--side">
				<section data-reveal class="panel">
					<h3 class="panel__title">{{ $t('aboutMe.merits') }}</h3>
					<ul class="stats">
						<li v-for="stat in stats" :key="stat.label" class="stats__item">
							<span class="stats__value">{{ stat.value }}</span>
							<span class="stats__label">{{ stat.label }}</span>
						</li>
					</ul>
				</section>

				<section data-reveal class="panel">
					<h3 class="panel__title">{{ $t('aboutMe.links') }}</h3>
					<ul class="links">
						<li v-for="link in links" :key="link.title" class="links__item">
							<a
								class="links__a"
								:href="link.link"
								:title="link.title"
								target="_blank"
								rel="noopener noreferrer"
							>
								<component :is="iconComponents[link.title]" class="links__icon" />
								<span class="links__text">{{ link.text }}</span>
								<span class="links__arrow" aria-hidden="true">↗</span>
							</a>
						</li>
					</ul>
				</section>
			</aside>
		</div>
	</section>
</template>

<script setup lang="ts">
	import FacebookIconSvg from '@/components/SVGcomponents/FacebookIconSvg.vue';
	import LinkedinIconSvg from '@/components/SVGcomponents/LinkedinIconSvg.vue';
	import GithubIconSvg from '@/components/SVGcomponents/GithubIconSvg.vue';
	import TelegramIconSvg from '@/components/SVGcomponents/TelegramIconSvg.vue';
	import UkrnetIconSvg from '@/components/SVGcomponents/UkrnetIconSvg.vue';
	import GmailIconSvg from '@/components/SVGcomponents/GmailIconSvg.vue';
	import AppAboutMe from '@/components/AppAboutMe.vue';
	import { ref, onMounted } from 'vue';
	import { useReveal } from '~/composables/useReveal';

	const { t } = useI18n();
	const localePath = useLocalePath();

	const sectionRef = ref<HTMLElement | null>(null);
	onMounted(() =>
		useReveal(sectionRef, {
			childSelector: '[data-reveal]',
			y: 22,
			stagger: 0.18,
			duration: 1.2,
		}),
	);

	const iconComponents: Record<string, unknown> = {
		linkedin: LinkedinIconSvg,
		github: GithubIconSvg,
		facebook: FacebookIconSvg,
		telegram: TelegramIconSvg,
		ukrnet: UkrnetIconSvg,
		gmail: GmailIconSvg,
	};

	const stats = [
		{ value: '101%', label: t('aboutMe.meritsData.learnability') },
		{ value: '777', label: t('aboutMe.meritsData.luck') },
		{ value: '100%', label: t('aboutMe.meritsData.loyalty') },
	];

	const links = [
		{ title: 'linkedin',  link: 'https://www.linkedin.com/in/yura-larsen/', text: 'linkedin.com/in/yura-larsen' },
		{ title: 'github',    link: 'https://github.com/hel1yeah',              text: 'github.com/hel1yeah' },
		{ title: 'telegram',  link: 'https://t.me/hel1_yeah',                   text: '@hel1_yeah' },
		{ title: 'facebook',  link: 'https://www.facebook.com/YuraLarsen',      text: 'facebook.com/YuraLarsen' },
		{ title: 'gmail',     link: 'mailto:hel1yeaharms@gmail.com',            text: 'hel1yeaharms@gmail.com' },
		{ title: 'ukrnet',    link: 'mailto:hel1_yeah@ukr.net',                 text: 'hel1_yeah@ukr.net' },
	];
</script>

<style lang="scss" scoped>
	.about-section {
		margin-top: clamp(4rem, 8vw, 7rem);
	}

	.about-section__header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
	}

	.about-section__kicker {
		font-family: $font-family-mono;
		font-size: $font-size-xs;
		letter-spacing: $tracking-caps;
		text-transform: uppercase;
		color: var(--accent);
	}

	.about-section__title {
		font-size: clamp(1.75rem, 4vw, 2.75rem);
		font-weight: $font-weight-semibold;
		letter-spacing: -0.025em;
		color: var(--fg);
	}

	.about-section__grid {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.9fr);
		gap: clamp(1.5rem, 3vw, 2.5rem);

		@media (max-width: 900px) {
			grid-template-columns: 1fr;
		}
	}

	.about-section__col--bio {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.about-section__col--side {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.about-section__cta {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		color: var(--fg);
		font-size: $font-size-sm;
		font-weight: $font-weight-medium;
		transition:
			transform var(--duration-fast) var(--ease-out),
			background var(--duration-base) var(--ease-out),
			border-color var(--duration-fast) var(--ease-out);

		&:hover {
			transform: translateY(-2px);
			background: var(--bg-subtle);
			border-color: var(--border-strong);
		}

		span { transition: transform var(--duration-base) var(--ease-out); }
		&:hover span { transform: translateX(3px); }
	}

	// ───── Panels (shared container on the right column) ─────
	.panel {
		padding: 1.25rem;
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
	}

	.panel__title {
		font-family: $font-family-mono;
		font-size: $font-size-xs;
		font-weight: $font-weight-medium;
		letter-spacing: $tracking-caps;
		text-transform: uppercase;
		color: var(--fg-subtle);
		margin: 0 0 0.875rem;
	}

	// ───── Stats ─────
	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.stats__item {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		padding: 0.75rem 0.5rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		text-align: center;
	}

	.stats__value {
		font-size: $font-size-xl;
		font-weight: $font-weight-bold;
		letter-spacing: -0.02em;
		background: var(--accent-gradient);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.stats__label {
		font-size: $font-size-xs;
		color: var(--fg-muted);
		line-height: 1.2;
	}

	// ───── Links ─────
	.links {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.links__a {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.625rem;
		border-radius: var(--radius-sm);
		color: var(--fg-muted);
		font-size: $font-size-sm;
		transition:
			background var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out);

		&:hover {
			background: var(--bg-subtle);
			color: var(--fg);

			.links__icon { color: var(--accent); }
			.links__arrow { opacity: 1; transform: translate(2px, -2px); }
		}
	}

	.links__icon {
		flex-shrink: 0;
		width: 1.125rem;
		height: 1.125rem;
		color: var(--fg-subtle);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.links__icon :deep(path),
	.links__icon :deep(svg) {
		fill: currentColor;
	}

	.links__text {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: $font-family-mono;
		letter-spacing: -0.005em;
	}

	.links__arrow {
		flex-shrink: 0;
		opacity: 0;
		color: var(--accent);
		transition:
			opacity var(--duration-fast) var(--ease-out),
			transform var(--duration-base) var(--ease-out);
	}
</style>
