<template>
<div>
  <h2 class="components-title">
    <slot></slot>
  </h2>
</div>
  
</template>

<script>


export default {
  name: 'Title',
  data() {
    return {}
  },
  mounted() {
    
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.components-title{
  color: var(--color-dark); 
}</style>
