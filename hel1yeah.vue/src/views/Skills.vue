<template>
  <section class="skills" id="skills">
    <div class="container">
      <h2 class="skills__title left-to-right-skills">Skills</h2>
      <div class="skills__content">
        <div class="skills__content--item">
          <div
            class="content-item up-skills"
            v-for="skill in skills"
            :key="skill.level"
          >
            <div class="circle">
              <div class="circle-inner">
                <span class="circle-inner__txt">{{ skill.level }}</span>
              </div>
            </div>
            <span class="skills-descr">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'Skills',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      skills: (state) => state.isSkills,
    }),
  },
  mounted() {
    this.gsapUpSkills()
    this.gsapLeftToRightSkills()
  },
  methods: {
    gsapUpSkills() {
      gsap.from('.up-skills', {
        scrollTrigger: {
          trigger: '.up-skills',
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power2.inOut',
        stagger: 0.2,
      })
    },
    gsapLeftToRightSkills() {
      gsap.from('.left-to-right-skills', {
        scrollTrigger: {
          trigger: '.left-to-right-skills',
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

<style lang="scss" scoped>
.skills {
  margin: 4rem 0 0;
}
.container {
}
.skills__title {
}
.skills__content {
  margin: 2rem 0 0;
}
.skills__content--item {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(4, 1fr);
}
.content-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0.5rem 1rem 0.5rem 0;
}
.circle {
  width: 4rem;
  height: 4rem;
  border: 2px solid var(--color-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem 0 0;
}
.circle-inner {
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid var(--color-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle-inner__txt {
  font-family: 'MuseoSans', sans-serif;
  font-weight: lighter;
  color: var(--descr-text-color);
}
.skills-descr {
  color: var(--descr-text-color);
}
@media screen and (max-width: 1200px) {
  .skills__content--item {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
}

@media screen and (max-width: 940px) {
  .skills__content--item {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
}
@media screen and (max-width: 605px) {
  .skills__content--item {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
}
</style>
