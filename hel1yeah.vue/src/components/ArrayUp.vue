<template>
  <a class="arrow-up" v-if="scroll > 400" @click="handleTop"
    ><img
      class="arrow-up__img"
      src="./../assets/images/up-arrow.svg"
      alt="arrow-up"
  /></a>
</template>

<script>
export default {
  name: 'ArrayUp',
  data() {
    return {
      scroll: null,
    }
  },
  methods: {
    handleTop() {
      window.scrollTo({
        top: 0,
      })
    },
    handleScroll() {
      this.scroll = window.scrollY
    },
  },
  computed: {},
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="scss" scoped>
.arrow-up {
  z-index: 100;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border: 1.25px solid var(--color-green);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: var(--color-green);

  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
}

.arrow-up__img {
  width: 30px;
  height: 30px;
}

// @media screen and (max-width: ) {

// }
</style>
