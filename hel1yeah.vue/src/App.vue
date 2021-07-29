<template>
  <div id="app" data-theme="light">
    <!-- ========= HEADER PAGE ========= -->
    <Header>
    </Header>
    <!-- ========= /HEADER PAGE ========= -->

    <!-- ========= AboutMe PAGE ========= -->
    <AboutMe> </AboutMe>
    <!-- ========= /AboutMe PAGE ========= -->

    <!-- ========= Skills PAGE ========= -->
    <Skills> </Skills>
    <!-- ========= /Skills PAGE ========= -->

    <!-- ========= Works PAGE ========= -->
    <Works> </Works>
    <!-- ========= /Works PAGE ========= -->
    <!-- ========= Footer PAGE ========= -->
    <Footer> </Footer>
    <!-- ========= /Footer PAGE ========= -->
  </div>
</template>

<script>
import Header from '@/views/Header.vue'
import AboutMe from '@/views/AboutMe.vue'
import Skills from '@/views/Skills.vue'
import Works from '@/views/Works.vue'
import Footer from '@/views/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    AboutMe,
    Skills,
    Works,
    Footer,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
#app{
  margin: 0 0 5rem;
}
</style>
