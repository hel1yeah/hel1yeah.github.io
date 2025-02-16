<template>
  <section class="about-me" id="about-me">
    <div class="container">
      <div class="about-me__inner-wrapper">
        <h2 class="left-to-right-about-me">About me</h2>
        <div class="about-me__gread">
          <div class="about-me__background left-to-right-about-me">
            <h3 class="about-me__background-title">Background</h3>
            <p class="about-me__background-descr">
              Front-End Developer | Vue.js, Nuxt.js, TypeScript
            </p>
            <p class="about-me__background-descr">
              I entered the world of web development by chance, but it quickly became my passion. What started as a necessity turned into an obsession—I spent countless hours studying articles, videos, and documentation, constantly improving my skills. Instead of resting after work, I stayed up late, experimenting with code and building projects.
            </p>
            <p class="about-me__background-descr">
              Over time, I mastered HTML5, CSS3, JavaScript, and TypeScript, later expanding my expertise to Vue.js (2-3), Nuxt.js, Pinia, and API integrations. I also gained experience in mobile development with Ionic and Capacitor, working on PWA and .apk applications.
            </p>
            <p class="about-me__background-descr">
              Now, with 3+ years of experience in front-end development, I specialize in building scalable, high-performance applications. I thrive in team environments, enjoy solving complex UI challenges, and constantly seek to improve both my technical and analytical skills.
            </p>
            <p class="about-me__background-descr">
              I’m looking for an opportunity to work with like-minded professionals, contribute to innovative projects, and create meaningful, user-friendly products. Let’s build something great together!
            </p>
          </div>
          <div class="wrapper__merit-links">
            <div class="about-me__merit right-to-left-about-me">
              <h3 class="about-me__merit-title">Merits</h3>
              <div class="merit-wrapper">
                <div class="merit__item">
                  <div class="merit__item-square-outside">
                    <div class="merit__item-square-inside">
                      <p class="merit__item-square-inside-txt">101%</p>
                    </div>
                  </div>
                  <span class="merit__item--descr">Learnability</span>
                </div>
                <div class="merit__item">
                  <div class="merit__item-square-outside">
                    <div class="merit__item-square-inside">
                      <p class="merit__item-square-inside-txt">777</p>
                    </div>
                  </div>
                  <span class="merit__item--descr">Luck</span>
                </div>
                <div class="merit__item">
                  <div class="merit__item-square-outside">
                    <div class="merit__item-square-inside">
                      <p class="merit__item-square-inside-txt">100%</p>
                    </div>
                  </div>
                  <span class="merit__item--descr">
                    Loyalty to the
                    <br />King
                  </span>
                </div>
              </div>
            </div>
            <div class="about-me__links right-to-left-about-me">
              <h3 class="about-me__links-title">Link</h3>
              <ul class="about-me__links-list">
                <li class="about-me__links-list-item" v-for="(link, index) in links" :key="index">
                  <a
                    class="about-me__link"
                    :title="link.title"
                    :href="link.link"
                    target="_blank"
                  >{{ link.text }}</a>
                  <component v-bind:is="`${link.title}-icon-svg`" class="about-me__link-img"></component>
                </li>
              </ul>
            </div>
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

import FacebookIconSvg from '@/components/SVGcomponents/FacebookIconSvg.vue'
import LinkedinIconSvg from '@/components/SVGcomponents/LinkedinIconSvg.vue'
import GithubIconSvg from '@/components/SVGcomponents/GithubIconSvg.vue'
import TelegramIconSvg from '@/components/SVGcomponents/TelegramIconSvg.vue'
import UkrnetIconSvg from '@/components/SVGcomponents/UkrnetIconSvg.vue'
import GmailIconSvg from '@/components/SVGcomponents/GmailIconSvg.vue'

gsap.registerPlugin(ScrollTrigger)
export default {
  name: 'AboutMe',
  components: {
    FacebookIconSvg,
    LinkedinIconSvg,
    GithubIconSvg,
    TelegramIconSvg,
    UkrnetIconSvg,
    GmailIconSvg,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      links: (state) => state.isLinks,
    }),
  },
  mounted() {
    this.gsapLeftToRightAboutMe()
    this.gsapRightToLeftAboutMe()
  },
  methods: {
    gsapLeftToRightAboutMe() {
      gsap.from('.left-to-right-about-me', {
        scrollTrigger: {
          trigger: '.left-to-right-about-me',
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
        duration: 1.5,
        x: -50,
        opacity: 0,
        ease: 'power2.inOut',
        stagger: 0.2,
      })
    },
    gsapRightToLeftAboutMe() {
      gsap.from('.right-to-left-about-me', {
        scrollTrigger: {
          trigger: '.right-to-left-about-me',
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
        duration: 1.5,
        x: 50,
        opacity: 0,
        stagger: 0.5,
        ease: 'power2.inOut',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.about-me {
  margin: 4rem 0 0;
  overflow: hidden;
}
.container {
}
.about-me__inner-wrapper {
}
.about-me__title {
}
.about-me__gread {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 57% 40%;
  grid-template-rows: 1fr;
}

.wrapper__merit-links {
  display: flex;
  flex-direction: column;
}
.about-me__background {
}

.about-me__background-title {
}

.about-me__background-descr {
  font-family: "MuseoSans", sans-serif;
  font-size: 1.25rem;
  line-height: 1.5;
  margin: 0 0 1.75rem;
  color: var(--descr-text-color);
}

.about-me__merit-title {
}
.merit-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
  font-family: "MuseoSans", sans-serif;
}
.merit__item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1rem 0.3rem 0;
  width: 130px;
}
.merit__item-square-outside {
  border: 1.25px solid var(--border-color);
  width: 90px;
  height: 90px;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.merit__item-square-inside {
  border: 1px solid var(--color-green-light);
  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.merit__item-square-inside-txt {
  transform: rotate(45deg);
  color: var(--descr-text-color);
}
.merit__item--descr {
  font-weight: 300;
  margin: 2.5rem 0 0 0;
  color: var(--descr-text-color);
}

.about-me__links-title {
}
.about-me__links-list {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  transition: 1s;
}
.about-me__links-list-item {
  position: relative;
  display: inline-block;
  margin: 0.2rem 0 0.2rem;

  &:hover .about-me__link-img {
    opacity: 1;
    left: 100%;
  }
}
.about-me__link {
  font-family: "MuseoSans", sans-serif;
  color: var(--color-bright);
  display: inline-block;

  padding: 0.5rem;
}
.about-me__link-img {
  transition: 1s;
  opacity: 0;
  position: absolute;
  width: 40px;
  height: 40px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
@media screen and (max-width: 1120px) {
  .merit-wrapper {
    flex-direction: column;
  }
  .about-me__gread {
    grid-template-columns: 63% 35%;
    grid-template-rows: 1fr;
  }
}
@media screen and (max-width: 1050px) {
  .about-me__gread {
    grid-template-columns: 100%;
    grid-gap: 0;
  }
  .merit-wrapper {
    flex-direction: row;
  }
}
@media screen and (max-width: 475px) {
  .merit-wrapper {
    flex-direction: column;
    align-items: center;
  }
  .merit__item {
    margin: 3rem 0.3rem 0;
  }
}
</style>
