import { type Ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Реєструємо тільки на клієнті
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);

	// Оптимізація ScrollTrigger для кращої продуктивності
	ScrollTrigger.config({
		autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
		limitCallbacks: true, // Обмежити кількість викликів
		syncInterval: 50, // Зменшити частоту оновлень (default 200)
	});
}

interface FlyingLettersOptions {
	useScrollTrigger?: boolean;
}

export const useFlyingLetters = (
	textRef: Ref<HTMLElement | null>,
	options: FlyingLettersOptions = {}
) => {
	// Перевірка на SSR
	if (typeof window === 'undefined') return;

	const { useScrollTrigger = true } = options;
	const text = textRef.value;

	if (!text) return;

	const originalText = text.innerText;
	// Split by words instead of letters
	const words = originalText.split(' ');

	// Clear existing content safely
	text.textContent = '';

	// Create elements using DOM API for words
	const fragment = document.createDocumentFragment();
	for (let i = 0; i < words.length; i++) {
		if (words[i].trim() !== '') {
			const div = document.createElement('div');
			div.style.position = 'relative';
			div.style.display = 'inline-block';
			div.style.marginRight = '0.25em'; // Add space between words
			div.textContent = words[i]; // Safe text content assignment
			fragment.appendChild(div);
		}
	}
	text.appendChild(fragment);

	const wordElements = text.getElementsByTagName('div');

	const timelineOptions: gsap.TimelineVars = {};

	if (useScrollTrigger) {
		timelineOptions.scrollTrigger = {
			trigger: text,
			start: 'top+=50 bottom', // коли верх блоку на 50px вище нижнього краю viewport
			end: 'center-=200 center', // коли центр блоку співпадає з центром viewport
			scrub: true, // плавна прив'язка до скролу
			markers: false, // вкл = дебаг
		};
	}

	gsap
		.timeline(timelineOptions)
		.set(text, { perspective: 400 })
		.from(wordElements, {
			opacity: 0,
			x: () => gsap.utils.random(-400, 400),
			y: () => gsap.utils.random(40, 400),
			z: () => gsap.utils.random(0, 400),
			stagger: { amount: 0.6 },
			duration: 1,
		});
};
