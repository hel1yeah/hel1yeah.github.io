<template>
  <div>
    <!-- ========= HEADER PAGE ========= -->
    <Header></Header>
    <!-- ========= /HEADER PAGE ========= -->

    <!-- ========= AboutMe PAGE ========= -->
    <AboutMe></AboutMe>
    <!-- ========= /AboutMe PAGE ========= -->

    <!-- ========= Skills PAGE ========= -->
    <Skills></Skills>
    <!-- ========= /Skills PAGE ========= -->

    <!-- ========= Works PAGE ========= -->
    <Works></Works>
    <!-- ========= /Works PAGE ========= -->
    <!-- ========= Footer PAGE ========= -->
    <Footer></Footer>
    <!-- ========= /Footer PAGE ========= -->
    <ArrayUp />
    <ThemeSwitch />
  </div>
</template>

<script>
import Header from '@/views/Header.vue'
import AboutMe from '@/views/AboutMe.vue'
import Skills from '@/views/Skills.vue'
import Works from '@/views/Works.vue'
import Footer from '@/views/Footer.vue'

import ArrayUp from '@/components/ArrayUp.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

export default {
  name: 'app',
  components: {
    Header,
    AboutMe,
    Skills,
    Works,
    Footer,
    ArrayUp,
    ThemeSwitch,
  },
  data() {
    return {}
  },

}
</script>

<style lang="scss" scoped>
#app {
  margin: 0 0 5rem;
}
</style>
