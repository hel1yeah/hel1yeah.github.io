<template>
  <div class="works__content">
    <div
      class="works__content-item"
      v-for="project in projects"
      :key="project.id"
      :style="{ backgroundImage: `url(${project.demo})` }"
    >
      <div class="content-item__info">
        <h5 class="works__name">
          {{ project.name }}
        </h5>
        <p class="works__descr">{{ project.descr }}</p>
        <a
          class="works__link"
          v-if="project.link != null"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          >Сайт: {{ project.name }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { mapState } from 'vuex'

gsap.registerPlugin(ScrollTrigger)

export default {
  components: {},
  data() {
    return {}
  },
  mounted() {
    this.getWorks()
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
}
</script>

<style lang="scss" scoped>
.works__content {
  position: relative;
  margin: 2rem 0 0;
  display: grid;
  font-family: 'MuseoSans', serif;
  gap: 20px;
  color: var(--color-light);
  z-index: 1;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}
.works__content-item {
  z-index: 0;
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border: 2px solid var(--color-green);
  position: relative;
  overflow: hidden;
  transition: 0.7s;
  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 50%;
    left: -540px;
    background-color: var(--border-color);
    opacity: 0.7;
    width: 500px;
    height: 500px;
    transform: translateY(-50%) rotate(45deg);
    transition: 0.7s;
  }
  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 50%;
    right: -540px;
    background-color: var(--border-color);
    opacity: 0.7;
    width: 500px;
    height: 500px;
    transform: translateY(-50%) rotate(45deg);
    transition: 0.7s;
  }
  &:hover {
    &.works__content-item::before {
      left: -40px;
      transform: rotate(45deg) scale(2);
    }
    &.works__content-item::after {
      right: -40px;
      transform: rotate(45deg) scale(2);
    }
    & .content-item__info {
      opacity: 1;
    }
  }
}
.content-item__info {
  padding: 1rem;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  height: 100%;
  opacity: 0;
  transition: 1s;
  z-index: 2;
}
.works__name {
  font-size: 1.5rem;
}
.works__descr {
}
.works__link {
  color: var(--color-light);

  transition: 0.7s;
  &:hover {
    color: var(--color-grey);
    cursor: pointer;
  }
}
@media screen and (max-width: 769px) {
  .works__content {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  .content-item__info {
    padding: 0.5rem;
  }
  .works__name {
    font-size: 1.1rem;
  }
  .works__descr {
    font-size: 0.8rem;
  }
  .works__link {
    padding: 0.3rem;
  }
}

@media screen and (max-width: 639px) {
  .works__name {
    font-size: 1.7rem;
  }
  .works__descr {
    font-size: 1.2rem;
  }
}
@media screen and (max-width: 388px) {

}
</style>
