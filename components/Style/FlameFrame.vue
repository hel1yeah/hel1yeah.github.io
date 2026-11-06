<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { FlameWrapOptions } from '~/vendor/canvas-ui/FlameWrap/FlameWrapVanilla';
import { flameOverhang, useFlameEngine } from '~/composables/useFlameEngine';

// Thin Vue wrapper around the canvasui FlameWrap engine (see vendor/canvas-ui):
// fire around the slot content. When WebGL is unavailable the canvas is hidden and
// the root gets `flame-frame--unavailable` so the consumer can style a fallback.
const props = defineProps<FlameWrapOptions>();

const contentEl = ref<HTMLElement | null>(null);
const outputEl = ref<HTMLCanvasElement | null>(null);
const { unavailable, start } = useFlameEngine(contentEl, outputEl, () => ({ ...props }));

const outputStyle = computed(() => {
	const { reach, glow } = flameOverhang(props);
	return {
		top: `${-reach}px`,
		left: `${-glow}px`,
		width: `calc(100% + ${glow * 2}px)`,
		height: `calc(100% + ${reach + glow}px)`,
	};
});

onMounted(start);
</script>

<template>
	<div class="flame-frame" :class="{ 'flame-frame--unavailable': unavailable }">
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

		.flame-frame--unavailable & {
			visibility: hidden;
		}
	}
</style>
