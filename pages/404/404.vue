<script setup lang="ts">
import { useSeo } from '~/composables/useSeo';

definePageMeta({
  layout: 'empty',
});

useSeo('notFound', { noindex: true });
</script>

<template>
  <main class="not-found">
    <p class="not-found__code">404</p>
    <h1 class="not-found__title">Page not found</h1>
    <p class="not-found__lead">
      The link may be broken or the page may have been moved.
    </p>
    <NuxtLink to="/" class="not-found__cta">
      Back to portfolio
      <span aria-hidden="true">→</span>
    </NuxtLink>
  </main>
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
    border-radius: var(--radius-md);
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    transition: filter var(--duration-fast) var(--ease-out);

    &:hover { filter: brightness(0.92); }

    span { transition: transform var(--duration-base) var(--ease-out); }
    &:hover span { transform: translateX(3px); }
  }
</style>
