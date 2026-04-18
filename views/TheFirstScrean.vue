<script setup lang="ts">
import { ref, onMounted } from "vue";
import ParticleCanvas from "~/components/Style/ParticleCanvas.vue";
import { useReveal } from "~/composables/useReveal";

const { t } = useI18n();
const now = new Date().getFullYear();

const heroInnerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  useReveal(heroInnerRef, {
    childSelector: "[data-reveal]",
    y: 22,
    stagger: 0.16,
    duration: 1.25,
    delay: 0.25,
    immediate: true,
  });
});
</script>

<template>
  <section class="hero">
    <ParticleCanvas class="hero__canvas">
      <template #default>
        <div ref="heroInnerRef" class="hero__inner">
          <div data-reveal class="hero__eyebrow">
            <span class="hero__dot" />
            <span>{{ t("hero.status") }}</span>
          </div>

          <h1 data-reveal class="hero__title">
            <span>{{ t("hero.line1") }}</span>
            <span class="hero__title--accent">{{ t("hero.line2") }}</span>
          </h1>

          <p data-reveal class="hero__lead">{{ t("hero.lead") }}</p>

          <div data-reveal class="hero__actions">
            <NuxtLink to="/works" class="hero__cta hero__cta--primary">
              {{ t("hero.ctaPrimary") }}
              <span aria-hidden="true">→</span>
            </NuxtLink>
            <NuxtLink to="/about-me" class="hero__cta hero__cta--ghost">
              {{ t("hero.ctaSecondary") }}
            </NuxtLink>
          </div>

          <code data-reveal class="hero__kbd">
            <span class="hero__kbd-sub">© {{ now }}</span>
            <span class="hero__kbd-sep">/</span>
            <span>nuxt 3 · vue 3 · typescript</span>
          </code>
        </div>
      </template>
    </ParticleCanvas>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  width: 100%;
  // padding-block: clamp(2rem, 0vw, 4rem) 0;
}

// Override ParticleCanvas geometry: fixed height, rounded, subtle bg.
.hero :deep(.particle-wrapper) {
  min-height: min(calc(100svh - 140px), 720px);
  max-height: min(calc(100svh - 140px), 720px);
  border-radius: var(--radius-2xl);
  background:
    radial-gradient(ellipse 60% 50% at 50% 35%, var(--accent-soft) 0%, transparent 70%),
    var(--bg);
  border: 1px solid var(--border);
}

// Reset the slot container to a true full-bleed flex box (the original
// .text-position was anchored at top: 32% which pushes content below).
.hero :deep(.text-position) {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0;
  bottom: 0;
  transform: none !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: clamp(1.5rem, 4vw, 3rem);
  z-index: 2;
}

.hero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  text-align: center;
  width: 100%;
  max-width: 860px;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--fg-muted);
  font-family: $font-family-mono;
  font-size: $font-size-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.hero__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.6);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.6; transform: scale(0.85); }
}

.hero__title {
  display: flex;
  flex-direction: column;
  gap: 0.05em;
  margin: 0;
  font-size: clamp(2rem, 5.2vw, 4.25rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1;
  max-width: 20ch;
  color: var(--fg);
}

.hero__title--accent {
  background: var(--accent-gradient);
  background-size: 220% 220%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 10s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}

.hero__lead {
  max-width: 56ch;
  color: var(--fg-muted);
  font-size: clamp(1rem, 1.6vw, 1.125rem);
  line-height: 1.55;
}

.hero__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.25rem;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  letter-spacing: -0.005em;
  border: 1px solid var(--border);
  transition: transform var(--duration-fast) var(--ease-out),
              background var(--duration-base) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--border-strong);
    box-shadow: var(--shadow-md);
  }

  &:active { transform: translateY(0); }
}

.hero__cta--primary {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
  box-shadow: var(--shadow-glow);

  &:hover {
    background: var(--accent-hover);
  }
}

.hero__cta--ghost {
  background: var(--bg-elevated);
  color: var(--fg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &:hover {
    background: var(--bg-subtle);
  }
}

.hero__kbd {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  margin-top: clamp(0.75rem, 2vw, 1.25rem);
  padding: 0.375rem 0.75rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: $font-family-mono;
  font-size: $font-size-xs;
  color: var(--fg-subtle);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.hero__kbd-sep { opacity: 0.4; }
</style>
