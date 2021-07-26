<template>
  <div id="app" data-theme="light">
    <!-- ========= HEADER PAGE ========= -->
    <Header> </Header>
    <!-- ========= /HEADER PAGE ========= -->
    
    <!-- ========= AboutMe PAGE ========= -->
    <AboutMe> </AboutMe>
    <!-- ========= /AboutMe PAGE ========= -->

    <!-- ========= Skills PAGE ========= -->
    <Skills> </Skills>
    <!-- ========= /Skills PAGE ========= -->

    <!-- ========= Skills PAGE ========= -->
    <Works> </Works>
    <!-- ========= /Skills PAGE ========= -->
  </div>
</template>

<script>
import Header from '@/views/Header.vue'
import AboutMe from '@/views/AboutMe.vue'
import Skills from '@/views/Skills.vue'
import Works from '@/views/Works.vue'

export default {
  name: 'app',
  components: {
    Header,
    AboutMe,
    Skills,
    Works,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
