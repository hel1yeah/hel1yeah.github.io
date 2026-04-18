<script setup lang="ts">
import AppLogo from "./AppLogo.vue";
import AppThemeSwitcher from "./AppThemeSwitcher.vue";
import AppLocalesSwitcher from "./AppLocalesSwitcher.vue";
import TheMobileMenu from "./TheMobileMenu.vue";

const localePath = useLocalePath();

const links = [
  { label: "home", to: "/" },
  { label: "about-me", to: "/about-me" },
];
</script>

<template>
  <nav class="nav">
    <NuxtLink :to="localePath('/')" class="nav__logo" aria-label="Home">
      <AppLogo width="40" height="40" />
    </NuxtLink>

    <!-- Desktop links -->
    <ul class="nav__list">
      <li v-for="link in links" :key="link.label" class="nav__item">
        <NuxtLink :to="localePath(link.to)" class="nav__link">
          {{ $t(link.label) }}
        </NuxtLink>
      </li>
    </ul>

    <!-- Desktop actions -->
    <div class="nav__actions">
      <a
        href="/Yurii_Larsen_Front-end-Vue.pdf"
        download
        class="nav__cv"
        :title="$t('buttons.downloadCV')"
      >
        <svg
          class="nav__cv-icon"
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span class="nav__cv-text">{{ $t('buttons.downloadCV') }}</span>
      </a>
      <AppLocalesSwitcher />
      <AppThemeSwitcher />
    </div>

    <!-- Mobile menu (burger + drawer) -->
    <div class="nav__mobile">
      <TheMobileMenu :links="links">
        <template #actions>
          <a
            href="/Yurii_Larsen_Front-end-Vue.pdf"
            download
            class="nav__cv nav__cv--accent"
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {{ $t('buttons.downloadCV') }}
          </a>
          <div class="nav__tools-row">
            <AppLocalesSwitcher />
            <AppThemeSwitcher />
          </div>
        </template>
      </TheMobileMenu>
    </div>
  </nav>
</template>

<style scoped lang="scss">
  .nav {
    position: fixed;
    top: 0.875rem;
    left: 0.875rem;
    right: 0.875rem;
    z-index: 100;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    max-width: $container-max;
    margin-inline: auto;
    padding: 0.5rem 0.625rem 0.5rem 1rem;

    background: var(--bg-overlay);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(14px) saturate(140%);
    -webkit-backdrop-filter: blur(14px) saturate(140%);
    box-shadow: var(--shadow-sm);
    transition: border-color var(--duration-base) var(--ease-out);

    &:hover { border-color: var(--border-strong); }
  }

  .nav__logo {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.5rem;
    border-radius: var(--radius-sm);
    transition: background var(--duration-fast) var(--ease-out);

    &:hover { background: var(--bg-subtle); }
  }

  // ───── Desktop links ─────
  .nav__list {
    display: flex;
    gap: 0.125rem;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: $breakpoint-md) { display: none; }
  }

  .nav__item { position: relative; }

  .nav__link {
    position: relative;
    display: inline-block;
    padding: 0.5rem 0.875rem;
    color: var(--fg-muted);
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    letter-spacing: -0.005em;
    border-radius: var(--radius-sm);
    transition:
      color var(--duration-fast) var(--ease-out),
      background var(--duration-fast) var(--ease-out);

    &:hover { color: var(--fg); background: var(--bg-subtle); }

    &::after {
      content: "";
      position: absolute;
      left: 0.875rem; right: 0.875rem; bottom: 0.25rem;
      height: 1.5px; border-radius: 2px;
      background: var(--accent-gradient);
      background-size: 200% 100%;
      transform: scaleX(0);
      transform-origin: left center;
      transition: transform var(--duration-base) var(--ease-out);
    }

    &:hover::after { transform: scaleX(0.5); }

    &.router-link-active,
    &.router-link-exact-active {
      color: var(--fg);

      &::after {
        transform: scaleX(1);
        animation: nav-shine 3s var(--ease-in-out) infinite;
      }
    }
  }

  @keyframes nav-shine {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }

  // ───── Desktop actions ─────
  .nav__actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    @media (max-width: $breakpoint-md) { display: none; }
  }

  .nav__cv {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--fg);
    font-family: $font-family-mono;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    letter-spacing: -0.005em;
    text-decoration: none;
    transition:
      background var(--duration-fast) var(--ease-out),
      border-color var(--duration-fast) var(--ease-out),
      color var(--duration-fast) var(--ease-out);

    &:hover {
      background: var(--bg-subtle);
      border-color: var(--border-strong);
      .nav__cv-icon { transform: translateY(1px); color: var(--accent); }
    }

    &--accent {
      justify-content: center;
      padding: 0.75rem 1rem;
      background: var(--accent);
      color: #fff;
      border-color: transparent;
      box-shadow: var(--shadow-glow);
      font-size: 0.8125rem;

      &:hover {
        background: var(--accent-hover);
        border-color: transparent;
        filter: brightness(1.05);
        color: #fff;
      }
    }
  }

  .nav__cv-icon {
    flex-shrink: 0;
    color: var(--fg-muted);
    transition:
      transform var(--duration-base) var(--ease-out),
      color var(--duration-fast) var(--ease-out);
  }

  // ───── Mobile trigger wrapper ─────
  .nav__mobile {
    display: none;

    @media (max-width: $breakpoint-md) {
      display: inline-flex;
    }
  }

  .nav__tools-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
</style>
