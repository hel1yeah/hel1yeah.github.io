<template>
  <section class="works" id="works">
    <!-- <comp-particles></comp-particles> -->

    <div class="container">
      <h2 class="works__title left-to-right-works">Работы</h2>
      <work-item></work-item>
    </div>
  </section>
</template>

<script>
import WorkItem from '@/components/WorkItem.vue'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'Works',
  components: {
    WorkItem,
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
.works.works__particles {
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
</style>
