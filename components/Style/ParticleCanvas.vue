<template>
	<div ref="containerRef" class="particle-wrapper" id="particleWrapper">
		<span class="text-position">
			<slot />
		</span>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useGlobalStore } from '~/stores/useGlobalStore';

const globalStore = useGlobalStore();
const containerRef = ref<HTMLElement | null>(null);

const PARTICLE_SPEED = 0.3;
const VELOCITY_DAMPING = 0.8;
const TRIANGLE_SIZE = 150;
const PARTICLE_SIZE = 2;
// With prefers-reduced-motion the trails are simulated up front and drawn once.
const STATIC_FRAMES = 150;
const PARTICLE_COLORS = {
	dark: 'rgba(126, 62, 255, 0.03)',
	light: 'rgba(255, 85, 38, 0.03)',
} as const;

interface Particle {
	x: number;
	y: number;
	vel: { x: number; y: number; min: number; max: number };
}

let animationId: number | null = null;
let isVisible = true;
let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let width = 0;
let height = 0;
let reducedMotion = false;
let resizeObserver: ResizeObserver | null = null;
let intersectionObserver: IntersectionObserver | null = null;
let resizeFrame: number | null = null;

const getRandomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

// Адаптивна кількість частинок
function particleCount(): number {
	const screenWidth = globalStore.screenWidth;
	if (screenWidth < 768) return 300;
	if (screenWidth < 1024) return 600;
	return 900;
}

function createParticle(x: number, y: number): Particle {
	return {
		x,
		y,
		vel: {
			x: getRandomFloat(-20, 20) / 100,
			y: getRandomFloat(-20, 20) / 100,
			min: getRandomFloat(2, 10),
			max: getRandomFloat(10, 100) / 10,
		},
	};
}

function updateParticle(particle: Particle) {
	const forceX = getRandomFloat(-1, 1);
	const forceY = getRandomFloat(-1, 1);
	const vel = particle.vel;

	if (Math.abs(vel.x + forceX) < vel.max) vel.x += forceX;
	if (Math.abs(vel.y + forceY) < vel.max) vel.y += forceY;

	particle.x += vel.x * PARTICLE_SPEED;
	particle.y += vel.y * PARTICLE_SPEED;

	if (Math.abs(vel.x) > vel.min) vel.x *= VELOCITY_DAMPING;
	if (Math.abs(vel.y) > vel.min) vel.y *= VELOCITY_DAMPING;

	// Wrap around the edges
	if (particle.x > width) particle.x = 0;
	else if (particle.x < 0) particle.x = width;
	if (particle.y > height) particle.y = 0;
	else if (particle.y < 0) particle.y = height;
}

// Один крок: оновити всі частинки й намалювати їх одним кольором (fillRect ~2× швидший за arc)
function step() {
	if (!context) return;
	context.fillStyle = PARTICLE_COLORS[globalStore.theme];
	for (const particle of particles) {
		updateParticle(particle);
		context.fillRect(particle.x - 1, particle.y - 1, PARTICLE_SIZE, PARTICLE_SIZE);
	}
}

// Частинки стартують по контуру трикутника в центрі
function initParticles() {
	const count = particleCount();
	const cx = width * 0.5;
	const cy = height * 0.5;
	const w = TRIANGLE_SIZE * 1.2;
	const vertices = [
		{ x: cx, y: cy + TRIANGLE_SIZE },
		{ x: cx - w, y: cy - TRIANGLE_SIZE },
		{ x: cx + w, y: cy - TRIANGLE_SIZE },
	];
	const perSide = Math.floor(count / 3);

	particles = Array.from({ length: count }, (_, index) => {
		const side = Math.min(Math.floor(index / perSide), 2);
		const sideLength = side < 2 ? perSide : count - 2 * perSide;
		const t = (index - side * perSide) / sideLength;
		const from = vertices[side];
		const to = vertices[(side + 1) % 3];
		return createParticle(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
	});
}

function loop() {
	if (!isVisible) {
		animationId = null;
		return;
	}
	step();
	animationId = requestAnimationFrame(loop);
}

function startLoop() {
	if (reducedMotion || animationId !== null) return;
	loop();
}

function stopLoop() {
	if (animationId !== null) cancelAnimationFrame(animationId);
	animationId = null;
}

function redraw() {
	const container = containerRef.value;
	if (!canvas || !context || !container) return;
	width = canvas.width = container.clientWidth || 100;
	height = canvas.height = container.clientHeight || 100;
	context.clearRect(0, 0, width, height);
	initParticles();
	if (reducedMotion) {
		for (let frame = 0; frame < STATIC_FRAMES; frame++) step();
	}
}

onMounted(() => {
	const container = containerRef.value;
	if (!container) return;

	canvas = document.createElement('canvas');
	context = canvas.getContext('2d');
	if (!context) return;
	canvas.id = 'canvas';
	container.appendChild(canvas);

	reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	redraw();

	// Перемальовуємо при зміні розміру контейнера
	let lastWidth = container.clientWidth;
	let lastHeight = container.clientHeight;
	resizeObserver = new ResizeObserver(() => {
		if (container.clientWidth === lastWidth && container.clientHeight === lastHeight) return;
		lastWidth = container.clientWidth;
		lastHeight = container.clientHeight;
		if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
		resizeFrame = requestAnimationFrame(() => {
			resizeFrame = null;
			redraw();
		});
	});
	resizeObserver.observe(container);

	// Пауза анімації, коли блок поза екраном
	intersectionObserver = new IntersectionObserver(
		([entry]) => {
			isVisible = entry.isIntersecting;
			if (isVisible) startLoop();
			else stopLoop();
		},
		{ threshold: 0.1 },
	);
	intersectionObserver.observe(container);

	startLoop();
});

// Нова тема → новий колір частинок
watch(
	() => globalStore.theme,
	() => redraw(),
);

onUnmounted(() => {
	stopLoop();
	if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
	resizeObserver?.disconnect();
	intersectionObserver?.disconnect();
	canvas?.remove();
	canvas = null;
	context = null;
});
</script>

<style scoped lang="scss">
.particle-wrapper {
	width: 100%;
	height: 100%;
	min-height: 300px;
	max-height: 600px;
	border-radius: 50px;
	overflow: hidden;
	position: relative;

	@include md {
		min-height: 250px;
		max-height: 500px;
		border-radius: 30px;
	}

	& > .text-position {
		position: absolute;
		top: 32%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;

		@include md {
			top: 28%;
		}
	}
}
</style>
