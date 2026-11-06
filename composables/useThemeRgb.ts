import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import { useGlobalStore } from '~/stores/useGlobalStore';

/** Linear RGB in the 0–1 range, as WebGL effects expect it. */
export type Rgb = [number, number, number];

type Theme = 'dark' | 'light';

const TRANSITION_MS = 600;

const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3;

/**
 * Returns an RGB ref that follows the site theme and eases between the two
 * palette colors when the theme is switched.
 */
export function useThemeRgb(palette: Readonly<Record<Theme, Rgb>>): Ref<Rgb> {
	const store = useGlobalStore();
	const color = ref<Rgb>([...palette.dark]);
	let frameId: number | null = null;

	const tweenTo = (target: Rgb) => {
		if (frameId !== null) cancelAnimationFrame(frameId);
		const from: Rgb = [...color.value];
		const startedAt = performance.now();

		const tick = (now: number) => {
			const progress = Math.min((now - startedAt) / TRANSITION_MS, 1);
			const eased = easeOutCubic(progress);
			color.value = from.map(
				(channel, index) => channel + (target[index] - channel) * eased,
			) as Rgb;
			frameId = progress < 1 ? requestAnimationFrame(tick) : null;
		};
		frameId = requestAnimationFrame(tick);
	};

	onMounted(() => {
		// <html data-theme> is set before paint by the inline head script, so the
		// first frame already uses the saved theme instead of easing into it.
		const initialTheme: Theme =
			document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
		color.value = [...palette[initialTheme]];
	});

	watch(
		() => store.theme,
		(theme) => tweenTo(palette[theme]),
	);

	onBeforeUnmount(() => {
		if (frameId !== null) cancelAnimationFrame(frameId);
	});

	return color;
}
