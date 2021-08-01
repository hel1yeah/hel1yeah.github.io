<template>
  <section class="works" id="works">
    <comp-particles class="works__particles"></comp-particles>
    <div class="container">
      <h2 class="works__title left-to-right-works">Работы</h2>
      <div class="works__content ">
        
        <div
          class="works__content-item up-works"
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
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import CompParticles from '@/components/CompParticles.vue'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
export default {
  name: 'Works',
  components: {
    CompParticles,
  },
  data() {
    return {}
  },
  methods: {
    getWorks() {
      this.$store.dispatch('getWorks')
    },
    gsapLeftToRightWorks() {
      gsap.from('.left-to-right-works', {
        scrollTrigger: {
          trigger: '.left-to-right-works',
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power2.inOut',
      })
    },
    gsapUpWorks() {
      gsap.from('.up-works', {
        scrollTrigger: {
          trigger: '.up-works',
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.inOut',
        stagger: 0.2,
      })
    },
  },
  computed: {
    ...mapState({
      projects: (state) => state.isProjects,
    }),
  },
  mounted() {
    this.getWorks()
    this.gsapUpWorks()
    this.gsapLeftToRightWorks()()
  },
}
</script>

<style lang="scss" scoped>
.works {
  margin: 4rem 0 0;
  position: relative;
}
.works__particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.container {
}
.works__title {
}
.works__content {
  position: relative;
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
  z-index: 0;
  width: 350px;
  height: 350px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 0 0 5rem;
  border: 2px solid var(--color-green);
  position: relative;
  overflow: hidden;
  transition: 0.7s;
  &::before {
    content: '';
    z-index: -1;
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
    z-index: -1;
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
    &.works__content-item::before {
      left: 100px;
      transform: translateX(12%) rotate(45deg) scale(2);
    }
    &.works__content-item::after {
      right: 100px;
      transform: translateX(-12%) rotate(45deg) scale(2);
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
  .works__content-item {
    width: 300px;
    height: 300px;
    margin: 0 0 2rem;
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
  .works__content {
    justify-content: center;
  }
  .works__content-item {
    width: 350px;
    height: 350px;
    margin: 0 0 1rem;
  }
  .works__name {
    font-size: 1.7rem;
  }
  .works__descr {
    font-size: 1.2rem;
  }
}
@media screen and (max-width: 388px) {
  .works__content-item {
    width: 275px;
    height: 275px;
  }
}
</style>
