<script setup lang="ts">
import type { NuxtError } from '#app';
import GlitchText from '~/components/Style/GlitchText.vue';
import { useSeo } from '~/composables/useSeo';

const props = defineProps<{ error: NuxtError }>();

const { t } = useI18n();
const localePath = useLocalePath();

const isNotFound = computed(() => props.error.statusCode === 404);
const messageKey = computed(() => (isNotFound.value ? 'notFound' : 'generic'));

useSeo('notFound', { noindex: true });

const backToPortfolio = () => clearError({ redirect: localePath('/') });
</script>

<template>
  <NuxtLayout name="empty">
    <main class="not-found">
      <GlitchText tag="p" class="not-found__code" :text="String(error.statusCode)" />
      <GlitchText tag="h1" class="not-found__title" :text="t(`errorPage.${messageKey}.title`)" />
      <p class="not-found__lead">{{ t(`errorPage.${messageKey}.lead`) }}</p>
      <button type="button" class="not-found__cta" @click="backToPortfolio">
        {{ t('errorPage.cta') }}
        <span aria-hidden="true">→</span>
      </button>
    </main>
  </NuxtLayout>
</template>

<style scoped lang="scss">
  .not-found {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    text-align: center;
  }

  .not-found__code {
    font-family: $font-family-mono;
    font-size: clamp(4rem, 14vw, 8rem);
    font-weight: $font-weight-bold;
    line-height: 1;
    letter-spacing: -0.04em;
    background: var(--accent-gradient);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin: 0;
    animation: shift 8s ease-in-out infinite;
  }

  @keyframes shift {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }

  .not-found__title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: $font-weight-semibold;
    letter-spacing: -0.02em;
    color: var(--fg);
    margin: 0;
  }

  .not-found__lead {
    max-width: 46ch;
    color: var(--fg-muted);
    font-size: $font-size-base;
    line-height: 1.55;
    margin: 0;
  }

  .not-found__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.75rem 1.25rem;
    background: var(--fg);
    color: var(--bg);
    border: 0;
    border-radius: var(--radius-md);
    cursor: pointer;
    font: inherit;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    transition: filter var(--duration-fast) var(--ease-out);

    span { transition: transform var(--duration-base) var(--ease-out); }

    &:hover {
      filter: brightness(0.92);

      span { transform: translateX(3px); }
    }
  }
</style>
