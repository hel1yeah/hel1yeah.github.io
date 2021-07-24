<template>
  <div id="app" data-theme="light">
    <!-- ========= HEADER PAGE ========= -->
    <Header> </Header>
    <!-- ========= /HEADER PAGE ========= -->
  </div>
</template>

<script>
import Header from '@/views/Header.vue'

export default {
  name: 'app',
  components: {
    Header,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
