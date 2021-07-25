<template>
  <div id="app" data-theme="light">
    <!-- ========= HEADER PAGE ========= -->
    <Header> </Header>
    <!-- ========= /HEADER PAGE ========= -->
    
    <!-- ========= AboutMe PAGE ========= -->
    <AboutMe> </AboutMe>
    <!-- ========= /AboutMe PAGE ========= -->
  </div>
</template>

<script>
import Header from '@/views/Header.vue'
import AboutMe from '@/views/AboutMe.vue'

export default {
  name: 'app',
  components: {
    Header,
    AboutMe,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
