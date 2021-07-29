<template>
  <ul class="mobile-menu__list" :class="{ active: isActive }">
    <li class="mobile-menu__item">
      <a
        v-scroll-to="'#about-me'"
        @click="closeModal"
        class="mobile-menu__item--link"
        href="#"
        >обо мне</a
      >
    </li>
    <li class="mobile-menu__item">
      <a
        v-scroll-to="'#skills'"
        @click="closeModal"
        class="mobile-menu__item--link"
        href="#"
        >навыки</a
      >
    </li>
    <li class="mobile-menu__item">
      <a
        v-scroll-to="'#works'"
        @click="closeModal"
        class="mobile-menu__item--link"
        href="#"
        >работы</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MobileMenu',
  emits: ['closeModal'],
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style lang="scss" scoped>
.mobile-menu {
}
.mobile-menu__list {
  display: none;
}
.mobile-menu__list.active {
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: var(--color-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 4rem 0;
  scroll-behavior: inherit;
}
.mobile-menu__item--link {
  color: var(--color-light);
  padding: 2rem;
}
.mobile-menu__item {
}
</style>
