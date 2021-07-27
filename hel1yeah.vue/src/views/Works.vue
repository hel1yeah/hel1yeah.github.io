<template>
  <section class="works">
    <div class="container">
      <h2 class="works__title">Работы</h2>
      <div class="works__content">
        <div
          class="works__content-item"
          v-for="project in projects"
          :key="project.id"
          :style="{ backgroundImage: `url(${project.demo})` }"
        >
          <h5 class="works__name">
            {{ project.name }}
          </h5>
          <p class="works__descr">{{ project.descr }}</p>
          <a
            v-if="project.link !== null"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            >Сайт: {{ project.name }}</a
          >
          <a class="works__link" :href="project.img" download
            >crfxfnmsdfsdfgsdffg ffds</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Works',
  data() {
    return {}
  },
  methods: {
    getWorks() {
      this.$store.dispatch('getWorks')
    },
  },
  computed: {
    ...mapState({
      projects: (state) => state.isProjects,
    }),
  },
  mounted() {
    this.getWorks()
  },
}
</script>

<style lang="scss" scoped>
.works {
  margin: 4rem 0 0;
}
.container {
}
.works__title {
}
.works__content {
  z-index: 1;
  margin: 2rem 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-family: 'MuseoSans', serif;
  color: var(--color-light);
}
.works__content-item {
  width: 350px;
  height: 350px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 0 0 120px;
  border: 2px solid var(--color-green);
  position: relative;
  overflow: hidden;
  transition: 0.7s;
  &::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: -360px;
    background-color: var(--color-green);
    opacity: 0.7;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
    transition: 0.7s;
  }
  &::after {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    right: -360px;
    background-color: var(--color-green);
    opacity: 0.7;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
    transition: 0.7s;
  }
  &:hover {
    cursor: pointer;
    &.works__content-item::before {
      left: 100px;
      transform: translateX(12%) rotate(45deg) scale(2);
    }
    &.works__content-item::after {
      right: 100px; 
      transform: translateX(-12%) rotate(45deg) scale(2);
    }
  }
}
.works__name {
  z-index: 2;
}
.works__descr {
  z-index: 2;
}
.works__link {
  z-index: 2;
}
</style>
