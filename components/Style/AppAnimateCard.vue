<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import { useGlobalStore } from "@/stores/useGlobalStore";

const globalStore = useGlobalStore();

interface Props {
  width?: number;
  height?: number;
  shape?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: 100,
  height: 200,
  shape: "square",
});

const cardWidth = ref(props.width);
const cardHeight = ref(props.height);

// Перевірка чи це мобільний пристрій
const isMobile = computed(() => !globalStore.isDesktop);

// Випадкова затримка анімації (до 10s, щоб не збити цикл)
const animationDelay = ref("0s");
onMounted(() => {
  const delay = Math.random() * 10; // 0 до 10 секунд
  animationDelay.value = `-${delay.toFixed(2)}s`; // мінус, щоб одразу почати з середини

  if (!globalStore.isDesktop) {
    cardWidth.value = props.width * 0.7;
    cardHeight.value = props.height * 0.7;
  }
});
</script>

<template>
  <div
    :class="['animated-card', shape, { 'no-animation': isMobile }]"
    :style="{
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      '--animation-delay': animationDelay,
    }"
  >
    <div :class="['animated-card__inner', shape]">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}

.animated-card {
  padding: 0.2rem;
  position: relative;
  // border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 1.5em;
  color: $text-color;
  cursor: pointer;
  z-index: 10;

  &.circle {
    border-radius: 50%;

    &::before,
    &::after {
      border-radius: 50%;
    }
  }
}
.animated-card__inner {
  background: $background-color;
  border-radius: 5px;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  &.circle {
    border-radius: 50%;

    &::before,
    &::after {
      border-radius: 50%;
    }
  }
}
// .animated-card:hover {
//   color: $text-color;
//   transition: color 1s;
// }
// .animated-card:hover:before,
// .animated-card:hover:after {
//   animation: none;
//   opacity: 0;
// }

.animated-card::before {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-image: linear-gradient(
    var(--rotate),
    var(--animate-card-color-1),
    var(--animate-card-color-2) 43%,
    var(--animate-card-color-3)
  );
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: spin 10s linear infinite;

  animation: spin 10s linear infinite;
  animation-delay: var(--animation-delay, 0s);
}

.animated-card::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  transform: scale(0.8);
  filter: blur(calc(300px / 6));
  background-image: linear-gradient(
    var(--rotate),
    var(--animate-card-color-1),
    var(--animate-card-color-2) 43%,
    var(--animate-card-color-3)
  );
  opacity: 1;
  transition: opacity 0.5s;
  animation: spin 10s linear infinite;

  animation: spin 10s linear infinite;
  animation-delay: var(--animation-delay, 0s);
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }

  30% {
    --rotate: 180deg;
  }

  60% {
    --rotate: 90deg;
  }
  100% {
    --rotate: 360deg;
  }
}

// Відключення анімації на мобільних пристроях
.animated-card.no-animation::before,
.animated-card.no-animation::after {
  animation: none !important;
}
</style>
