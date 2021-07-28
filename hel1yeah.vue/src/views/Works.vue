<template>
  <section class="works" id="works">
    <div class="container">
      <h2 class="works__title">Работы</h2>
      <div class="works__content">
        <div
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

          <!-- <a class="works__link" :href="project.img" download>Скачать макет</a> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Works',
  data() {
    return {}
  },
  methods: {
    getWorks() {
      this.$store.dispatch('getWorks')
    },
  },
  computed: {
    ...mapState({
      projects: (state) => state.isProjects,
    }),
  },
  mounted() {
    this.getWorks()
  },
}
</script>

<style lang="scss" scoped>
.works {
  margin: 4rem 0 0;
}
.container {
}
.works__title {
}
.works__content {
  margin: 2rem 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-family: 'MuseoSans', serif;
  color: var(--color-light);
}
.works__content-item {
  z-index: 1;
  width: 350px;
  height: 350px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 0 0 120px;
  border: 2px solid var(--color-green);
  position: relative;
  overflow: hidden;
  transition: 0.7s;
  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    left: -360px;
    background-color: var(--color-green);
    opacity: 0.7;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
    transition: 0.7s;
  }
  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    right: -360px;
    background-color: var(--color-green);
    opacity: 0.7;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
    transition: 0.7s;
  }
  &:hover {
    &.works__content-item::before {
      left: 100px;
      transform: translateX(12%) rotate(45deg) scale(2);
    }
    &.works__content-item::after {
      right: 100px;
      transform: translateX(-12%) rotate(45deg) scale(2);
    }
    & .content-item__info{
      opacity: 1;
    }
  }
}
.content-item__info {
  padding: 20px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  height: 100%;
  opacity: 0;
  transition: 1s;
}
.works__name {
  font-size: 1.5rem;
  z-index: 2;
}
.works__descr {
  z-index: 2;
}
.works__link {
  color: var(--color-light);
  z-index: 2;
  transition: .7s;
  &:hover{
    color: var(--color-grey);
    cursor: pointer;
  }
}
</style>
