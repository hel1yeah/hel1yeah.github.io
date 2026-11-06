<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
	createFlameWrap,
	type FlameWrapInstance,
	type FlameWrapOptions,
} from '~/vendor/canvas-ui/FlameWrap/FlameWrapVanilla';

// Thin Vue wrapper around the canvasui FlameWrap engine (see vendor/canvas-ui).
const props = defineProps<FlameWrapOptions>();

// The engine switches to html-in-canvas capture whenever its `source` canvas
// supports it. That mode moves the content into a canvas and needs a fixed-height
// box, which a content-sized block doesn't have. A source without a 2D context
// keeps the content as live DOM and makes the engine draw only the fire around it.
const DOM_CONTENT_SOURCE = { getContext: () => null } as unknown as HTMLCanvasElement;

// Fire canvas overhang, same formula as the upstream wrapper.
const MIN_HEIGHT = 24;
const MIN_SPREAD = 8;
const DEFAULT_HEIGHT = 170;

const contentEl = ref<HTMLElement | null>(null);
const outputEl = ref<HTMLCanvasElement | null>(null);
let instance: FlameWrapInstance | null = null;

// Vue keeps unset optional props as `undefined`; dropping them lets engine defaults apply.
const definedOptions = (): FlameWrapOptions =>
	Object.fromEntries(
		Object.entries(props).filter(([, value]) => value !== undefined),
	) as FlameWrapOptions;

const outputStyle = computed(() => {
	const reach = Math.round(Math.max(props.height ?? DEFAULT_HEIGHT, MIN_HEIGHT) * 1.5) + 40;
	const glow = Math.round(Math.max(props.spread ?? MIN_SPREAD, MIN_SPREAD) * 3) + 16;
	return {
		top: `${-reach}px`,
		left: `${-glow}px`,
		width: `calc(100% + ${glow * 2}px)`,
		height: `calc(100% + ${reach + glow}px)`,
	};
});

onMounted(() => {
	if (!contentEl.value || !outputEl.value) return;
	instance = createFlameWrap(
		{ source: DOM_CONTENT_SOURCE, content: contentEl.value, output: outputEl.value },
		definedOptions(),
	);
});

watch(
	() => ({ ...props }),
	() => instance?.setOptions(definedOptions()),
	{ deep: true },
);

onBeforeUnmount(() => {
	instance?.destroy();
	instance = null;
});
</script>

<template>
	<div class="flame-frame">
		<div ref="contentEl" class="flame-frame__content">
			<slot />
		</div>
		<canvas ref="outputEl" class="flame-frame__output" aria-hidden="true" :style="outputStyle" />
	</div>
</template>

<style scoped lang="scss">
	.flame-frame {
		position: relative;
	}

	.flame-frame__output {
		position: absolute;
		pointer-events: none;
	}
</style>
