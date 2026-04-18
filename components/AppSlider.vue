<script setup lang="ts">
import { computed } from "vue";

interface SkillItem {
  name: string;
  level: string;
  link?: string;
}

const props = defineProps<{
  items: SkillItem[];
  animationDuration: number;
  loop?: boolean;
  rtl?: boolean;
}>();

// Duplicate the list so the marquee can translate by exactly -50% and loop.
const doubled = computed(() => [...props.items, ...props.items]);

const cssVars = computed(() => ({
  "--marquee-duration": `${props.animationDuration}ms`,
  "--marquee-direction": props.rtl ? "reverse" : "normal",
}));
</script>

<template>
  <div class="marquee" :style="cssVars">
    <div class="marquee__track">
      <component
        :is="item.link ? 'a' : 'span'"
        v-for="(item, index) in doubled"
        :key="index"
        :href="item.link"
        :target="item.link ? '_blank' : undefined"
        :rel="item.link ? 'noopener noreferrer' : undefined"
        class="marquee__chip"
        :class="{ 'marquee__chip--link': item.link }"
      >
        <span class="marquee__icon" aria-hidden="true">{{ item.level }}</span>
        <span class="marquee__name">{{ item.name }}</span>
      </component>
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-block: 0.5rem;

  // Fade edges so chips dissolve instead of hard-cutting.
  $fade-width: 12%;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 #{$fade-width},
    #000 calc(100% - #{$fade-width}),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    #000 #{$fade-width},
    #000 calc(100% - #{$fade-width}),
    transparent 100%
  );
}

.marquee__track {
  display: flex;
  gap: 0.75rem;
  width: max-content;
  will-change: transform;
  animation: marquee var(--marquee-duration, 40s) linear infinite;
  animation-direction: var(--marquee-direction, normal);
}

// Single-direction translate by half-width (because we duplicated items).
@keyframes marquee {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}

// Pause on hover for readability.
.marquee:hover .marquee__track {
  animation-play-state: paused;
}

.marquee__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 0.5rem 0.875rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--fg-muted);
  font-family: $font-family-mono;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  letter-spacing: -0.005em;
  text-decoration: none;
  white-space: nowrap;
  transition:
    color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.marquee__chip--link {
  cursor: pointer;

  &:hover {
    color: var(--fg);
    border-color: var(--border-strong);
    background: var(--bg-subtle);
    transform: translateY(-2px);
  }
}

.marquee__icon {
  font-size: 1rem;
  line-height: 1;
}

.marquee__name {
  line-height: 1;
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
</style>
