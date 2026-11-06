<script setup lang="ts">
/**
 * Glitch text — adapted from Vue Bits `GlitchText` (MIT + Commons Clause,
 * Copyright (c) 2025 David Haz; see vendor/vue-bits/). Two clipped copies of the
 * text tear sideways with an RGB split in short bursts (every `cycle` seconds,
 * permanently while hovered). Pure CSS; disabled under prefers-reduced-motion.
 */
withDefaults(
	defineProps<{
		text: string;
		tag?: string;
		/** Length of one burst cycle in seconds (burst ≈ last 13% of it). */
		cycle?: number;
	}>(),
	{ tag: 'span', cycle: 3 },
);
</script>

<template>
	<component
		:is="tag"
		class="glitch"
		:data-text="text"
		:style="{ '--glitch-cycle': `${cycle}s` }"
	>
		{{ text }}
	</component>
</template>

<style scoped lang="scss">
	.glitch {
		position: relative;

		&::before,
		&::after {
			content: attr(data-text);
			// alt text "" keeps the decorative copies out of the accessibility tree
			content: attr(data-text) / '';
			position: absolute;
			inset: 0;
			overflow: hidden;
			// copies are solid text on the page background, so a torn slice hides the original
			color: var(--fg);
			background: var(--bg);
			opacity: 0;
			pointer-events: none;
		}

		&::before {
			transform: translateX(-0.06em);
			text-shadow: 0.04em 0 cyan;
		}

		&::after {
			transform: translateX(0.06em);
			text-shadow: -0.04em 0 red;
		}

		@media (prefers-reduced-motion: no-preference) {
			&::before {
				animation:
					glitch-tear 0.5s linear infinite alternate-reverse,
					glitch-burst var(--glitch-cycle) steps(1, end) infinite;
			}

			&::after {
				animation:
					glitch-tear 0.75s linear infinite alternate-reverse,
					glitch-burst var(--glitch-cycle) steps(1, end) infinite;
			}

			// Hover: glitch continuously (tear only, no burst gating).
			&:hover {
				&::before,
				&::after {
					opacity: 1;
				}

				&::before {
					animation: glitch-tear 0.5s linear infinite alternate-reverse;
				}

				&::after {
					animation: glitch-tear 0.75s linear infinite alternate-reverse;
				}
			}
		}
	}

	// Copies are visible only during the burst window at the end of each cycle.
	@keyframes glitch-burst {
		0% { opacity: 0; }
		87% { opacity: 1; }
		91% { opacity: 0; }
		93% { opacity: 1; }
		100% { opacity: 0; }
	}

	// Slice sequence from Vue Bits GlitchText.
	@keyframes glitch-tear {
		0% { clip-path: inset(20% 0 50% 0); }
		5% { clip-path: inset(10% 0 60% 0); }
		10% { clip-path: inset(15% 0 55% 0); }
		15% { clip-path: inset(25% 0 35% 0); }
		20% { clip-path: inset(30% 0 40% 0); }
		25% { clip-path: inset(40% 0 20% 0); }
		30% { clip-path: inset(10% 0 60% 0); }
		35% { clip-path: inset(15% 0 55% 0); }
		40% { clip-path: inset(25% 0 35% 0); }
		45% { clip-path: inset(30% 0 40% 0); }
		50% { clip-path: inset(20% 0 50% 0); }
		55% { clip-path: inset(10% 0 60% 0); }
		60% { clip-path: inset(15% 0 55% 0); }
		65% { clip-path: inset(25% 0 35% 0); }
		70% { clip-path: inset(30% 0 40% 0); }
		75% { clip-path: inset(40% 0 20% 0); }
		80% { clip-path: inset(20% 0 50% 0); }
		85% { clip-path: inset(10% 0 60% 0); }
		90% { clip-path: inset(15% 0 55% 0); }
		95% { clip-path: inset(25% 0 35% 0); }
		100% { clip-path: inset(30% 0 40% 0); }
	}
</style>
