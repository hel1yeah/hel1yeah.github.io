<template>
  <h2 class="components-title left-to-right-works">
    <slot></slot>
  </h2>
</template>

<script>
import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
export default {
  name: 'Title',
  data() {
    return {}
  },
  mounted() {
    this.gsapLeftToRightWorks()
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
}
</script>

<style lang="scss" scoped></style>
