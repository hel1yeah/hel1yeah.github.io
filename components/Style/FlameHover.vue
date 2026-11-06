<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { FlameWrapOptions } from '~/vendor/canvas-ui/FlameWrap/FlameWrapVanilla';
import { flameOverhang, useFlameEngine } from '~/composables/useFlameEngine';

/**
 * One shared FlameWrap engine that "ignites" whichever element is passed as
 * `target` (e.g. the hovered link). Place it inside the positioned container
 * that holds the targets. The WebGL engine is created on the first ignition and
 * paused (canvas `display: none`) whenever nothing is burning.
 */
const props = defineProps<FlameWrapOptions & { target: HTMLElement | null }>();

const FADE_MS = 220;
// Moving between neighbours fires leave → enter; a short grace period avoids a flicker.
const LEAVE_GRACE_MS = 60;

const rootEl = ref<HTMLElement | null>(null);
const proxyEl = ref<HTMLElement | null>(null);
const outputEl = ref<HTMLCanvasElement | null>(null);
const proxyStyle = ref<Record<string, string>>({});
const shown = ref(false);
const burning = ref(false);
let leaveTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const flameOptions = (): FlameWrapOptions => {
	const { target: _target, ...options } = props;
	return { ...options };
};
const { unavailable, start, resize, isRunning } = useFlameEngine(proxyEl, outputEl, flameOptions);

const outputStyle = computed(() => {
	const { reach, glow } = flameOverhang(props);
	return {
		top: `${-reach}px`,
		left: `${-glow}px`,
		width: `calc(100% + ${glow * 2}px)`,
		height: `calc(100% + ${reach + glow}px)`,
		display: shown.value ? 'block' : 'none',
	};
});

function clearTimers() {
	if (leaveTimer) clearTimeout(leaveTimer);
	if (hideTimer) clearTimeout(hideTimer);
	leaveTimer = hideTimer = null;
}

async function ignite(target: HTMLElement) {
	const root = rootEl.value;
	if (!root) return;
	const rootRect = root.getBoundingClientRect();
	const rect = target.getBoundingClientRect();
	proxyStyle.value = {
		top: `${rect.top - rootRect.top}px`,
		left: `${rect.left - rootRect.left}px`,
		width: `${rect.width}px`,
		height: `${rect.height}px`,
	};
	shown.value = true;
	await nextTick();
	if (isRunning()) resize();
	else start();
	requestAnimationFrame(() => {
		burning.value = true;
	});
}

function extinguish() {
	burning.value = false;
	// Hiding the canvas pauses the engine (its IntersectionObserver sees it leave).
	hideTimer = setTimeout(() => {
		shown.value = false;
	}, FADE_MS);
}

watch(
	() => props.target,
	(target) => {
		clearTimers();
		if (target) {
			void ignite(target);
		} else {
			leaveTimer = setTimeout(extinguish, LEAVE_GRACE_MS);
		}
	},
);

onBeforeUnmount(clearTimers);
</script>

<template>
	<div ref="rootEl" class="flame-hover" aria-hidden="true">
		<div ref="proxyEl" class="flame-hover__proxy" :style="proxyStyle" />
		<canvas
			ref="outputEl"
			class="flame-hover__output"
			:class="{ 'flame-hover__output--burning': burning && !unavailable }"
			:style="outputStyle"
		/>
	</div>
</template>

<style scoped lang="scss">
	.flame-hover {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.flame-hover__proxy {
		position: absolute;
	}

	.flame-hover__output {
		position: absolute;
		opacity: 0;
		transition: opacity 220ms var(--ease-out);

		&--burning {
			opacity: 1;
		}
	}
</style>
