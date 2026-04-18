<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import AppLogo from "./AppLogo.vue";

interface NavLink {
  label: string;
  to: string;
}

const props = defineProps<{
  links: NavLink[];
}>();

const localePath = useLocalePath();
const route = useRoute();

const isOpen = ref(false);
const open = () => (isOpen.value = true);
const close = () => (isOpen.value = false);
const toggle = () => (isOpen.value = !isOpen.value);

// Close on route change
watch(() => route.fullPath, close);

// Lock body scroll while open
watch(isOpen, (next) => {
  if (import.meta.client) {
    document.body.style.overflow = next ? "hidden" : "";
  }
});

// Escape key handler (client-only)
function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

if (import.meta.client) {
  window.addEventListener("keydown", onKeydown);
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
  });
}

defineExpose({ open, close, toggle, isOpen });
</script>

<template>
  <!-- Burger trigger -->
  <button
    class="burger"
    :class="{ 'burger--open': isOpen }"
    :aria-expanded="isOpen"
    :aria-label="isOpen ? 'Close menu' : 'Open menu'"
    aria-controls="mobile-drawer"
    type="button"
    @click="toggle"
  >
    <span class="burger__glow" aria-hidden="true" />
    <span class="burger__bar burger__bar--1" />
    <span class="burger__bar burger__bar--2" />
    <span class="burger__bar burger__bar--3" />
  </button>

  <!-- Drawer -->
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div
        v-if="isOpen"
        class="drawer-backdrop"
        @click="close"
        aria-hidden="true"
      />
    </Transition>

    <Transition name="drawer-slide">
      <aside
        v-if="isOpen"
        id="mobile-drawer"
        class="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div class="drawer__head">
          <NuxtLink :to="localePath('/')" class="drawer__logo" aria-label="Home">
            <AppLogo width="36" height="36" />
          </NuxtLink>
          <button
            class="drawer__close"
            type="button"
            aria-label="Close menu"
            @click="close"
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul class="drawer__list">
          <li
            v-for="(link, i) in props.links"
            :key="link.label"
            class="drawer__item"
            :style="{ '--i': i }"
          >
            <NuxtLink
              :to="localePath(link.to)"
              class="drawer__link"
              @click="close"
            >
              <span class="drawer__link-index">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <span class="drawer__link-text">{{ $t(link.label) }}</span>
              <span class="drawer__link-arrow" aria-hidden="true">→</span>
            </NuxtLink>
          </li>
        </ul>

        <div class="drawer__foot">
          <slot name="actions" />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
  // ───── Burger ─────
  .burger {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    overflow: hidden;
    transition:
      border-color var(--duration-fast) var(--ease-out),
      background var(--duration-fast) var(--ease-out);

    &:hover,
    &--open {
      border-color: var(--border-strong);
      background: var(--bg-subtle);
      .burger__glow { opacity: 0.7; }
    }
  }

  .burger__glow {
    position: absolute;
    inset: -20%;
    background: radial-gradient(
      circle at 50% 50%,
      var(--accent) 0%,
      transparent 60%
    );
    filter: blur(10px);
    opacity: 0;
    transition: opacity var(--duration-base) var(--ease-out);
    pointer-events: none;
  }

  .burger__bar {
    position: absolute;
    left: 50%;
    width: 18px;
    height: 1.5px;
    background: var(--accent-gradient);
    background-size: 200% 100%;
    border-radius: 2px;
    transform: translateX(-50%);
    transform-origin: center;
    box-shadow: 0 0 6px rgba(124, 58, 237, 0.5);
    transition:
      top var(--duration-base) var(--ease-out),
      transform var(--duration-base) var(--ease-out),
      opacity var(--duration-fast) linear,
      background-position var(--duration-slow) linear;
  }

  .burger__bar--1 { top: 13px; }
  .burger__bar--2 { top: 20px; width: 12px; }
  .burger__bar--3 { top: 27px; }

  .burger--open {
    .burger__bar {
      background-position: 100% 50%;
      box-shadow: 0 0 12px rgba(124, 58, 237, 0.7);
    }

    .burger__bar--1 { top: 20px; transform: translateX(-50%) rotate(45deg); }
    .burger__bar--2 { opacity: 0; transform: translateX(-50%) scaleX(0); }
    .burger__bar--3 { top: 20px; transform: translateX(-50%) rotate(-45deg); }
  }
</style>

<!-- Global drawer styles (teleported to body, outside scoped scope) -->
<style lang="scss">
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  .drawer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 201;
    height: 100svh;
    width: min(86vw, 360px);

    display: flex;
    flex-direction: column;
    padding: 1.25rem;

    background: var(--bg-elevated);
    border-right: 1px solid var(--border);
    box-shadow: var(--shadow-lg);

    &::before {
      content: "";
      position: absolute;
      top: 0; right: -1px; bottom: 0;
      width: 1px;
      background: var(--accent-gradient);
      background-size: 100% 200%;
      animation: drawer-edge-shine 6s linear infinite;
      opacity: 0.6;
      pointer-events: none;
    }
  }

  @keyframes drawer-edge-shine {
    0%   { background-position: 0 0%; }
    100% { background-position: 0 200%; }
  }

  .drawer__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .drawer__logo {
    display: inline-flex;
    padding: 0.125rem 0.5rem;
    border-radius: var(--radius-sm);
    text-decoration: none;
  }

  .drawer__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--fg-muted);
    cursor: pointer;
    transition:
      background var(--duration-fast) var(--ease-out),
      color var(--duration-fast) var(--ease-out),
      border-color var(--duration-fast) var(--ease-out);

    &:hover {
      background: var(--bg-subtle);
      border-color: var(--border-strong);
      color: var(--fg);
    }
  }

  .drawer__list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1 1 auto;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .drawer__item {
    opacity: 0;
    transform: translateX(-20px);
    animation: drawer-item-in 0.45s var(--ease-out) forwards;
    animation-delay: calc(var(--i, 0) * 70ms + 140ms);
  }

  @keyframes drawer-item-in {
    to { opacity: 1; transform: translateX(0); }
  }

  .drawer__link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 0.75rem;
    color: var(--fg-muted);
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    border-radius: var(--radius-md);
    text-decoration: none;
    transition:
      background var(--duration-fast) var(--ease-out),
      color var(--duration-fast) var(--ease-out);

    &:hover,
    &.router-link-active {
      background: var(--bg-subtle);
      color: var(--fg);

      .drawer__link-arrow {
        opacity: 1;
        transform: translateX(0);
        color: var(--accent);
      }
    }
  }

  .drawer__link-index {
    font-family: var(--font-family-mono, ui-monospace, monospace);
    font-size: 0.75rem;
    color: var(--fg-subtle);
    letter-spacing: 0.08em;
  }

  .drawer__link-text { flex: 1; }

  .drawer__link-arrow {
    opacity: 0;
    transform: translateX(-6px);
    color: var(--fg-subtle);
    transition:
      opacity var(--duration-base) var(--ease-out),
      transform var(--duration-base) var(--ease-out),
      color var(--duration-fast) var(--ease-out);
  }

  .drawer__foot {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);
  }

  // ─── Transitions ───
  .drawer-slide-enter-active,
  .drawer-slide-leave-active {
    transition:
      transform 0.42s var(--ease-out),
      opacity 0.3s linear;
    will-change: transform, opacity;
  }

  .drawer-slide-enter-from,
  .drawer-slide-leave-to {
    transform: translateX(-100%);
    opacity: 0.6;
  }

  .drawer-fade-enter-active,
  .drawer-fade-leave-active {
    transition: opacity 0.32s var(--ease-out);
  }

  .drawer-fade-enter-from,
  .drawer-fade-leave-to { opacity: 0; }
</style>
