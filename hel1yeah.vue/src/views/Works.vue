<template>
  <section class="works" id="works">
    <comp-particles class="works__particles"></comp-particles>
    <div class="container">
      <Title>Работы</Title>
      <work-item></work-item>
      <!-- <div
          class="works__content-item"
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
        </div> -->
    </div>
  </section>
</template>

<script>
import Title from '@/components/Title.vue'
import WorkItem from '@/components/WorkItem.vue'
import CompParticles from '@/components/CompParticles.vue'

export default {
  name: 'Works',
  components: {
    Title,
    WorkItem,
    CompParticles,
  },
  data() {
    return {}
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
</style>
