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

// Animation state
let animationId: number | null = null;
let isVisible = ref(true);
let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;

// Declare resize function
let resize: () => void;

onMounted(() => {
	const container = document.getElementById('particleWrapper');
	if (!container) return;

	// Create canvas
	canvas = document.createElement('canvas');
	context = canvas.getContext('2d');
	if (!context) return;

	let windowWidth = ref((canvas.width = container.clientWidth || 100));
	let windowHeight = ref((canvas.height = container.clientHeight || 100));
	canvas.id = 'canvas';
	container.appendChild(canvas);

	// Адаптивна кількість частинок
	const isMobile = globalStore.screenWidth < 768;
	const isTablet = globalStore.screenWidth >= 768 && globalStore.screenWidth < 1024;
	const numberParticlesStart = isMobile ? 300 : isTablet ? 600 : 900;

	const particleSpeed = 0.3;
	const velocity = 0.8;
	const circleWidth = 150;

	interface Particle {
		x: number;
		y: number;
		vel: { x: number; y: number; min: number; max: number };
		color: string;
		render: () => void;
		update: () => void;
		testBorder: () => void;
		setPosition: (pos: number, coor: string) => void;
	}
	let particles: Particle[] = [];

	const getRandomFloat = (min: number, max: number) =>
		Math.random() * (max - min) + min;

	function Particle(this: Particle, x: number, y: number) {
		this.x = x;
		this.y = y;

		this.vel = {
			x: getRandomFloat(-20, 20) / 100,
			y: getRandomFloat(-20, 20) / 100,
			min: getRandomFloat(2, 10),
			max: getRandomFloat(10, 100) / 10,
		};

		this.color =
			globalStore.theme === 'dark'
				? 'rgba(126, 62, 255, 0.03)'
				: 'rgba(255, 85, 38, 0.03)';
	}

	Particle.prototype.render = function () {
		if (!context) return;
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.x, this.y, 1, 0, Math.PI * 2);
		context.fill();
	};

	Particle.prototype.update = function () {
		const forceDirection = {
			x: getRandomFloat(-1, 1),
			y: getRandomFloat(-1, 1),
		};

		if (Math.abs(this.vel.x + forceDirection.x) < this.vel.max) {
			this.vel.x += forceDirection.x;
		}
		if (Math.abs(this.vel.y + forceDirection.y) < this.vel.max) {
			this.vel.y += forceDirection.y;
		}

		this.x += this.vel.x * particleSpeed;
		this.y += this.vel.y * particleSpeed;

		if (Math.abs(this.vel.x) > this.vel.min) {
			this.vel.x *= velocity;
		}
		if (Math.abs(this.vel.y) > this.vel.min) {
			this.vel.y *= velocity;
		}

		this.testBorder();
	};

	Particle.prototype.testBorder = function () {
		if (this.x > windowWidth.value) {
			this.setPosition(this.x, 'x');
		} else if (this.x < 0) {
			this.setPosition(windowWidth.value, 'x');
		}
		if (this.y > windowHeight.value) {
			this.setPosition(this.y, 'y');
		} else if (this.y < 0) {
			this.setPosition(windowHeight.value, 'y');
		}
	};

	Particle.prototype.setPosition = function (pos, coor) {
		if (coor === 'x') {
			this.x = pos;
		} else if (coor === 'y') {
			this.y = pos;
		}
	};

	function loop() {
		// Зупинити анімацію якщо не видно
		if (!isVisible.value) {
			animationId = null;
			return;
		}

		if (!context) return;

		const length = particles.length;
		for (let i = 0; i < length; i++) {
			particles[i].update();
			particles[i].render();
		}
		animationId = requestAnimationFrame(loop);
	}

	function init() {
		particles = [];
		const cx = windowWidth.value * 0.5;
		const cy = windowHeight.value * 0.5;
		const h = circleWidth;
		const w = circleWidth * 1.2;
		const A = { x: cx, y: cy + h };
		const B = { x: cx - w, y: cy - h };
		const C = { x: cx + w, y: cy - h };

		const perSide = Math.floor(numberParticlesStart / 3);
		for (let i = 0; i < numberParticlesStart; i++) {
			let x, y;
			if (i < perSide) {
				const t = i / perSide;
				x = A.x + (B.x - A.x) * t;
				y = A.y + (B.y - A.y) * t;
			} else if (i < 2 * perSide) {
				const t = (i - perSide) / perSide;
				x = B.x + (C.x - B.x) * t;
				y = B.y + (C.y - B.y) * t;
			} else {
				const t = (i - 2 * perSide) / (numberParticlesStart - 2 * perSide);
				x = C.x + (A.x - C.x) * t;
				y = C.y + (A.y - C.y) * t;
			}
			particles.push(new Particle(x, y));
		}
	}

	init();

	resize = function () {
		const container = document.getElementById('particleWrapper');
		if (!canvas || !context || !container) return;

		windowWidth.value = canvas.width = container.clientWidth || 100;
		windowHeight.value = canvas.height = container.clientHeight || 100;
		particles = [];
		context.clearRect(0, 0, windowWidth.value, windowHeight.value);
		init();
	};

	// Intersection Observer для паузи анімації коли не видно
	if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isVisible.value = entry.isIntersecting;

					if (entry.isIntersecting && !animationId) {
						// Відновити анімацію
						loop();
					} else if (!entry.isIntersecting && animationId) {
						// Зупинити анімацію
						cancelAnimationFrame(animationId);
						animationId = null;
					}
				});
			},
			{ threshold: 0.1 } // Тригер коли 10% видно
		);

		if (containerRef.value) {
			observer.observe(containerRef.value);
		}

		onUnmounted(() => {
			observer.disconnect();
		});
	}

	loop();

	// Watch для зміни теми
	watch(
		() => globalStore.theme,
		() => {
			resize();
		}
	);
});

onUnmounted(() => {
	// Очистити все
	if (animationId) {
		cancelAnimationFrame(animationId);
		animationId = null;
	}
	if (canvas) {
		canvas.remove();
		canvas = null;
	}
	if (resize) {
		window.removeEventListener('resize', resize);
	}
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
