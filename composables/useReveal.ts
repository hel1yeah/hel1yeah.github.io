import type { Ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

interface RevealOptions {
	/** Distance (px) the element moves on the Y axis before settling. */
	y?: number;
	/** Stagger between child targets (seconds). */
	stagger?: number;
	/** Animation duration (seconds). */
	duration?: number;
	/** Extra delay before animation starts (seconds). */
	delay?: number;
	/** When the animation should trigger relative to the scroll viewport. */
	start?: string;
	/** Disable ScrollTrigger — play immediately on mount. */
	immediate?: boolean;
	/** CSS selector to resolve children of the passed element. */
	childSelector?: string;
}

/**
 * Fade + translate-up reveal, scroll-triggered by default.
 * Pass a single element ref; if `childSelector` is set, animates its children with stagger.
 * SSR-safe and a no-op for users with `prefers-reduced-motion`.
 */
export function useReveal(
	elementRef: Ref<HTMLElement | null>,
	options: RevealOptions = {},
) {
	if (typeof window === 'undefined') return;

	const prefersReduced = window.matchMedia?.(
		'(prefers-reduced-motion: reduce)',
	).matches;
	if (prefersReduced) return;

	const {
		y = 18,
		stagger = 0.14,
		duration = 1.1,
		delay = 0,
		start = 'top 85%',
		immediate = false,
		childSelector,
	} = options;

	const el = elementRef.value;
	if (!el) return;

	const targets: HTMLElement | HTMLElement[] = childSelector
		? Array.from(el.querySelectorAll<HTMLElement>(childSelector))
		: el;

	if (Array.isArray(targets) && targets.length === 0) return;

	const tweenVars: gsap.TweenVars = {
		opacity: 0,
		y,
		duration,
		delay,
		stagger,
		ease: 'power2.out',
	};

	if (!immediate) {
		tweenVars.scrollTrigger = {
			trigger: el,
			start,
			toggleActions: 'play none none none', // one-shot, no reverse on scroll back
		};
	}

	gsap.from(targets, tweenVars);
}
