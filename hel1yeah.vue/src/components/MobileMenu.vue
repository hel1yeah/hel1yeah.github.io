<template>
  <ul class="mobile-menu__list" :class="{ active: isActive }">
    <li v-for="item in menuList" :key="item.scrollTo" class="mobile-menu__item">
      <a
        class="mobile-menu__item--link"
        v-scroll-to="item.scrollTo"
        @click="closeModal"
        href="#"
      >{{ item.name }}</a>
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
    menuList: {
      type: Array,
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
  justify-content: center;
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

@media screen and (max-width: 605px) {
  .mobile-menu__list.active {
    justify-content: center;
    font-size: 1.5rem;
    padding-top: 10rem
  }
  .mobile-menu__item {
    margin: 30px;
  }
}
</style>
