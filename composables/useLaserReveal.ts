import { onBeforeUnmount, onMounted, type Ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

interface LaserRevealOptions {
	/** Items inside the container that get "printed" by the beam. */
	itemSelector: string;
	/** Beam element inside each item (absolutely positioned, hidden by default). */
	beamSelector: string;
	/** ScrollTrigger start for each item. */
	start?: string;
	/** Seconds for the beam to sweep one item. */
	duration?: number;
	/** Items per visual row — siblings in a row start slightly staggered. */
	columns?: number;
	/** Extra delay per column position (seconds). */
	columnDelay?: number;
}

const HIDDEN = 'inset(0% 0% 100% 0%)';
const SHOWN = 'inset(0% 0% 0% 0%)';

/**
 * Laser-print reveal: when an item scrolls into view, a beam sweeps it top to
 * bottom and the item appears behind the beam (clip-path in sync with the beam).
 * Works in every browser; no-op under prefers-reduced-motion (items stay visible).
 * Call from setup — it registers its own mount/unmount hooks.
 */
export function useLaserReveal(
	containerRef: Ref<HTMLElement | null>,
	options: LaserRevealOptions,
): void {
	let context: gsap.Context | null = null;

	onMounted(() => {
		const container = containerRef.value;
		if (!container) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const {
			itemSelector,
			beamSelector,
			start = 'top 88%',
			duration = 1.1,
			columns = 3,
			columnDelay = 0.12,
		} = options;

		context = gsap.context(() => {
			const items = container.querySelectorAll<HTMLElement>(itemSelector);
			items.forEach((item, index) => {
				const beam = item.querySelector<HTMLElement>(beamSelector);
				if (!beam) return;

				const offset = (index % columns) * columnDelay;
				gsap.set(item, { clipPath: HIDDEN });

				gsap
					.timeline({ scrollTrigger: { trigger: item, start, once: true } })
					.set(beam, { opacity: 1, top: '0%' }, offset)
					.fromTo(
						item,
						{ clipPath: HIDDEN },
						// clip-path is cleared afterwards so hover shadows aren't clipped
						{ clipPath: SHOWN, duration, ease: 'power1.inOut', clearProps: 'clipPath' },
						offset,
					)
					.to(beam, { top: '100%', duration, ease: 'power1.inOut' }, offset)
					.to(beam, { opacity: 0, duration: 0.35, ease: 'power1.out' });
			});
		}, container);
	});

	onBeforeUnmount(() => {
		context?.revert();
		context = null;
	});
}
