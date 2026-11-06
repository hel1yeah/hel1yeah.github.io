<template>
	<section ref="sectionRef" class="works">
		<header data-reveal class="works__header">
			<span class="works__kicker">{{ $t('works.title') }}</span>
			<h2 class="works__title">Selected work</h2>
		</header>

		<ul ref="gridRef" class="works__grid">
			<li
				v-for="(work, index) in works"
				:key="work.id ?? index"
				class="work-card"
				:class="`work-card--${cardVariant(index)}`"
				:style="cardStyle(index)"
			>
				<component
					:is="work.link ? 'a' : 'div'"
					:href="work.link"
					:target="work.link ? '_blank' : undefined"
					:rel="work.link ? 'noopener noreferrer' : undefined"
					:aria-label="work.link ? `Visit ${work.name} project` : undefined"
					class="work-card__link"
				>
					<div class="work-card__tile" aria-hidden="true">
						<div class="work-card__pattern" />
						<span class="work-card__initials">{{ initials(work.name) }}</span>
						<span class="work-card__index">
							{{ String(index + 1).padStart(2, '0') }}
						</span>
					</div>

					<div class="work-card__meta">
						<div class="work-card__heading">
							<h3 class="work-card__title">{{ work.name }}</h3>
							<span v-if="work.link" class="work-card__arrow" aria-hidden="true">↗</span>
						</div>
						<p class="work-card__descr">{{ work.descr }}</p>
					</div>
				</component>
				<span class="work-card__laser" aria-hidden="true" />
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
	import { WORKS } from '@/data/works';
	import { ref, onMounted } from 'vue';
	import { useReveal } from '~/composables/useReveal';
	import { useLaserReveal } from '~/composables/useLaserReveal';

	defineProps({
		page: { type: Boolean, default: false },
	});

	const works = WORKS;

	const sectionRef = ref<HTMLElement | null>(null);
	const gridRef = ref<HTMLElement | null>(null);

	onMounted(() => {
		// Section header fades up first.
		useReveal(sectionRef, {
			childSelector: '[data-reveal]',
			y: 20,
			stagger: 0.16,
			duration: 1.2,
		});
	});

	// Cards are "printed" by a laser beam as they scroll into view.
	useLaserReveal(gridRef, {
		itemSelector: '.work-card',
		beamSelector: '.work-card__laser',
	});

	// Height variation for masonry flow — deterministic per index so SSR/hydration match.
	const cardVariant = (index: number): 'sm' | 'md' | 'lg' | 'xl' => {
		const pos = index % 7;
		if (pos === 0) return 'xl';     // tallest
		if (pos === 2) return 'lg';
		if (pos === 5) return 'sm';     // shortest
		return 'md';
	};

	// Deterministic hue per card → stable across renders.
	const cardStyle = (index: number) => {
		const hue = (index * 47) % 360;
		return {
			'--tile-hue': String(hue),
		};
	};

	const initials = (name: string): string => {
		const parts = name.trim().split(/\s+/);
		if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	};
</script>

<style lang="scss" scoped>
	.works {
		width: 100%;
		max-width: $container-max;
		margin-inline: auto;
		margin-block: clamp(4rem, 8vw, 7rem);
		padding-inline: $container-padding;
	}

	.works__header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
	}

	.works__kicker {
		font-family: $font-family-mono;
		font-size: $font-size-xs;
		letter-spacing: $tracking-caps;
		text-transform: uppercase;
		color: var(--accent);
	}

	.works__title {
		font-size: clamp(1.75rem, 4vw, 2.75rem);
		font-weight: $font-weight-semibold;
		letter-spacing: -0.025em;
		color: var(--fg);
	}

	// ───── Masonry-ish grid (row-major, fills by span count) ─────
	// Small row-unit (8px) + per-variant grid-row: span N gives a masonry feel
	// while preserving left-to-right DOM order, so numbering reads naturally.
	.works__grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-auto-rows: 8px;
		grid-auto-flow: row dense;
		gap: clamp(0.75rem, 1.5vw, 1.25rem);
		list-style: none;
		padding: 0;
		margin: 0;

		@media (max-width: $breakpoint-lg) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		@media (max-width: $breakpoint-sm) {
			grid-template-columns: 1fr;
			grid-auto-rows: auto;
			grid-auto-flow: row;
		}
	}

	.work-card {
		position: relative;
		isolation: isolate;
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-xl);
		overflow: hidden;
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		transition:
			transform var(--duration-base) var(--ease-out),
			border-color var(--duration-base) var(--ease-out),
			box-shadow var(--duration-base) var(--ease-out);

		&:hover {
			transform: translateY(-4px);
			border-color: var(--border-strong);
			box-shadow: var(--shadow-lg);
		}

		// Height variants — row spans create masonry rhythm.
		// Tuned for dense packing without overly tall tiles.
		&--sm { grid-row: span 12; }  // ≈ 136px tile + meta
		&--md { grid-row: span 16; }  // ≈ 176px tile + meta
		&--lg { grid-row: span 18; }  // ≈ 224px tile + meta
		&--xl { grid-row: span 24; }  // ≈ 272px tile + meta

		// Mobile: don't force span, let content size naturally
		@media (max-width: $breakpoint-sm) {
			grid-row: auto !important;
		}
	}

	// ───── Laser beam (driven by useLaserReveal; hidden at rest) ─────
	.work-card__laser {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 3;
		height: 3px;
		// sits just above the clip edge, so it stays visible while the card is printed
		transform: translateY(-100%);
		opacity: 0;
		pointer-events: none;

		// heat band over the freshly revealed strip
		&::before {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			bottom: 100%;
			height: 72px;
			background: linear-gradient(to top, var(--accent-soft), transparent);
		}

		// white-hot core with accent glow and a slight flicker
		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(90deg, transparent, #fff 18%, #fff 82%, transparent);
			box-shadow:
				0 0 6px 1px var(--accent),
				0 0 18px 4px var(--accent),
				0 0 44px 10px var(--accent-soft);
			animation: laser-flicker 0.16s steps(2) infinite;
		}
	}

	@keyframes laser-flicker {
		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0.82;
		}
	}

	.work-card__link {
		display: flex;
		flex-direction: column;
		height: 100%;
		text-decoration: none;
		color: inherit;
	}

	.work-card__tile {
		position: relative;
		flex: 1 1 auto;
		min-height: 0;
		display: grid;
		place-items: center;
		overflow: hidden;
		background:
			radial-gradient(
				120% 80% at 20% 15%,
				hsl(var(--tile-hue) 78% 62% / 0.55) 0%,
				hsl(calc(var(--tile-hue) + 45) 72% 52% / 0.35) 45%,
				transparent 80%
			),
			radial-gradient(
				100% 80% at 90% 95%,
				hsl(calc(var(--tile-hue) + 180) 82% 58% / 0.35) 0%,
				transparent 60%
			),
			var(--bg-subtle);
		transition: filter var(--duration-base) var(--ease-out);

		@media (max-width: $breakpoint-sm) {
			aspect-ratio: 4 / 3;
		}
	}

	.work-card:hover .work-card__tile { filter: brightness(1.08) saturate(1.12); }

	// Subtle diagonal line grid overlay for texture.
	.work-card__pattern {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(to right, var(--border) 1px, transparent 1px),
			linear-gradient(to bottom, var(--border) 1px, transparent 1px);
		background-size: 32px 32px;
		opacity: 0.35;
		mask-image: radial-gradient(ellipse at center, #000 35%, transparent 80%);
		-webkit-mask-image: radial-gradient(ellipse at center, #000 35%, transparent 80%);
		pointer-events: none;
	}

	.work-card__initials {
		position: relative;
		font-family: $font-family-mono;
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: $font-weight-bold;
		letter-spacing: -0.03em;
		color: var(--fg);
		mix-blend-mode: overlay;
		text-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);
	}

	:root[data-theme="light"] .work-card__initials { mix-blend-mode: multiply; }

	.work-card__index {
		position: absolute;
		top: 0.875rem;
		left: 0.875rem;
		font-family: $font-family-mono;
		font-size: $font-size-xs;
		letter-spacing: $tracking-wide;
		color: var(--fg-muted);
		padding: 0.25rem 0.5rem;
		background: var(--bg-overlay);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}

	.work-card__meta {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		padding: clamp(1rem, 2vw, 1.375rem);
	}

	.work-card__heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.work-card__title {
		font-size: $font-size-lg;
		font-weight: $font-weight-semibold;
		letter-spacing: -0.015em;
		color: var(--fg);
		margin: 0;
	}

	.work-card__arrow {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		flex-shrink: 0;
		border-radius: var(--radius-pill);
		background: var(--bg-subtle);
		border: 1px solid var(--border);
		color: var(--fg-muted);
		font-size: 0.875rem;
		line-height: 1;
		transition:
			transform var(--duration-base) var(--ease-out),
			background var(--duration-base) var(--ease-out),
			color var(--duration-base) var(--ease-out);
	}

	.work-card:hover .work-card__arrow {
		transform: translate(2px, -2px);
		background: var(--accent);
		color: #fff;
		border-color: transparent;
	}

	.work-card__descr {
		font-size: $font-size-sm;
		line-height: 1.5;
		color: var(--fg-muted);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
