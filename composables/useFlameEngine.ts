import { onBeforeUnmount, ref, watch, type Ref } from 'vue';
import {
	createFlameWrap,
	type FlameWrapInstance,
	type FlameWrapOptions,
} from '~/vendor/canvas-ui/FlameWrap/FlameWrapVanilla';

// The engine switches to html-in-canvas capture whenever its `source` canvas
// supports it. That mode moves the content into a canvas and needs a fixed-height
// box, so we hand it a source without a 2D context: the content stays live DOM and
// the engine draws only the fire around it.
const DOM_CONTENT_SOURCE = { getContext: () => null } as unknown as HTMLCanvasElement;

const MIN_HEIGHT = 24;
const MIN_SPREAD = 8;
const DEFAULT_HEIGHT = 170;
const DEFAULT_SPREAD = 8;

interface FlameOverhang {
	/** Pixels the fire canvas reaches above the content. */
	reach: number;
	/** Pixels the fire canvas reaches left, right and below the content. */
	glow: number;
}

/** Fire canvas overhang around the content — same formula as the upstream wrapper. */
export function flameOverhang(options: Pick<FlameWrapOptions, 'height' | 'spread'>): FlameOverhang {
	return {
		reach: Math.round(Math.max(options.height ?? DEFAULT_HEIGHT, MIN_HEIGHT) * 1.5) + 40,
		glow: Math.round(Math.max(options.spread ?? DEFAULT_SPREAD, MIN_SPREAD) * 3) + 16,
	};
}

// Vue keeps unset optional props as `undefined`; dropping them lets engine defaults apply.
const definedOptions = (options: FlameWrapOptions): FlameWrapOptions =>
	Object.fromEntries(
		Object.entries(options).filter(([, value]) => value !== undefined),
	) as FlameWrapOptions;

interface FlameEngine {
	/** True when WebGL can't draw (context lost after a GPU reset/switch, or no WebGL2). */
	unavailable: Ref<boolean>;
	start: () => void;
}

/**
 * Runs one Canvas UI FlameWrap engine around `contentEl`, drawn into `outputEl`.
 * Handles WebGL context loss: Chrome paints a lost context as a white "sad face"
 * box, so callers should hide the canvas while `unavailable` is true; the engine
 * restarts on `webglcontextrestored`.
 */
export function useFlameEngine(
	contentEl: Ref<HTMLElement | null>,
	outputEl: Ref<HTMLCanvasElement | null>,
	options: () => FlameWrapOptions,
): FlameEngine {
	const unavailable = ref(false);
	let instance: FlameWrapInstance | null = null;
	let listening: HTMLCanvasElement | null = null;

	function stop() {
		instance?.destroy();
		instance = null;
	}

	function onContextLost(event: Event) {
		// preventDefault() tells the browser we will handle restoration.
		event.preventDefault();
		stop();
		unavailable.value = true;
	}

	function start() {
		const content = contentEl.value;
		const output = outputEl.value;
		if (!content || !output || instance) return;
		if (listening !== output) {
			output.addEventListener('webglcontextlost', onContextLost);
			output.addEventListener('webglcontextrestored', start);
			listening = output;
		}
		instance = createFlameWrap(
			{ source: DOM_CONTENT_SOURCE, content, output },
			definedOptions(options()),
		);
		unavailable.value = instance === null;
	}

	watch(
		options,
		(next) => instance?.setOptions(definedOptions(next)),
		{ deep: true },
	);

	onBeforeUnmount(() => {
		listening?.removeEventListener('webglcontextlost', onContextLost);
		listening?.removeEventListener('webglcontextrestored', start);
		listening = null;
		stop();
	});

	return { unavailable, start };
}
