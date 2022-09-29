<template>
  <section class="works" id="works">
    <div class="container">
      <h2 class="works__title left-to-right-works">The Works</h2>
      <work-item />
    </div>
    <particles />
  </section>
</template>

<script>
import WorkItem from '@/components/WorkItem.vue'
import Particles from '@/components/Particles.vue'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'Works',
  components: {
    WorkItem,
    Particles,
  },
  data() {
    return {}
  },
  methods: {
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
  },
  mounted() {
    this.gsapLeftToRightWorks()
  },
}
</script>

<style lang="scss">
.works {
  margin: 4rem 0 0;
  position: relative;
}

.container {
}
.works__title {
  z-index: 1;
}
</style>
