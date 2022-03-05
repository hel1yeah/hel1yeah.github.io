<template>
  <section 
    class="header" 
    :class="theme === 'light' ? 'header-light' : 'header-dark'">
    <div class="container">
      <div class="header__inner-wrapper">
        <nav class="header__nav">

          <TheHeaderLogo />            
          <ThemeSwitch />
          
          <div class="burger-menu right-to-left" @click="useBurger()" ref="burgerMenu">
            <span class="burger-menu-piece"></span>
            <span class="burger-menu-piece"></span>
            <span class="burger-menu-piece"></span>
          </div>

          <ul class="header__menu top-down" :class="{ active: isActive }">
            <li class="header__menu-item" v-for="item in menuList" :key="item.scrollTo">
              <a v-scroll-to="item.scrollTo" href="#">{{ item.name }}</a>
            </li>
          </ul>
          <a class="header__email right-to-left" href="mailto:hel1_yeah@ukr.net">hel1_yeah@ukr.net</a>
        </nav>
        <div class="header__title">
          <h1>Любимое дело</h1>
          <p>вёрстка & front-end</p>
        </div>
        <a class="header__arrow-down upwards">
          <img
            v-scroll-to="'#about-me'"
            class="header__arrow-down--img"
            src="./../assets/images/down-arrow.svg"
            alt="down-arrow"
          />
        </a>
      </div>
    </div>
    <ArrayUp></ArrayUp>
    <MobileMenu :isActive="isActive" @closeModal="useBurger" />
  </section>
</template>

<script>
import ArrayUp from '@/components/ArrayUp.vue'
import MobileMenu from '@/components/MobileMenu.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

import TheHeaderLogo from '@/components/SVGcomponents/TheHeaderLogo.vue'

import { mapState } from 'vuex'
import { gsap } from 'gsap'

export default {
  name: 'Header',
  components: {
    ArrayUp,
    MobileMenu,
    ThemeSwitch,
    TheHeaderLogo,
  },
  data() {
    return {
      isActive: false,
    }
  },
  mounted() {
    this.gsapUpwards()
    this.gsapLeftToRight()
    this.gsapRightToLeft()
    this.gsapTopDown()
  },

  methods: {
    useBurger() {
      let clickDelay = 500
      let body = document.querySelector('body')
      const burgerMenu = this.$refs.burgerMenu
      burgerMenu.classList.toggle('active')
      body.classList.toggle('close')

      this.isActive = !this.isActive

      if (!burgerMenu.classList.contains('active')) {
        burgerMenu.classList.add('closing')
      }

      setTimeout(() => {
        burgerMenu.classList.remove('closing')
      }, clickDelay)
    },
    gsapUpwards() {
      gsap.from('.upwards', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power2.inOut',
      })
    },
    gsapLeftToRight() {
      gsap.from('.left-to-right', {
        duration: 1.7,
        x: -50,
        opacity: 0,
        ease: 'power2.inOut',
      })
    },
    gsapRightToLeft() {
      gsap.from('.right-to-left', {
        duration: 1.2,
        x: 50,
        opacity: 0,
        ease: 'power2.inOut',
      })
    },
    gsapTopDown() {
      gsap.from('.top-down', {
        duration: 1.1,
        y: -50,
        opacity: 0,
        ease: 'power2.inOut',
      })
    },
  },
  computed: {
    ...mapState({
      menuList: (state) => state.menuList,
      theme: (state) => (state.isTheme)
    }),

  },
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 1;
  position: relative;
  height: 100vh;
  transition: var(--speed);
  
  &.header-dark {
    background: url("./../assets/images/header_bg-dark.webp");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-color: var(--header-color-text);
    overflow: hidden;
  }
  &.header-light {
    background: url("./../assets/images/header_bg.webp");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-color: var(--header-color-text);
    overflow: hidden;
  }

  & a {
    color: var(--header-color-text);
    font-family: "MuseoSans";
    font-weight: 100;
    text-transform: lowercase;
    font-size: 0.9rem;
    transition: var(--speed);
  }
}
.header__inner-wrapper {
  height: 100vh;
  max-height: 100vh;
  padding: 1.25rem 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.header__nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "MuseoSans", sans-serif;
  font-size: 0.9rem;
}

.burger-menu {
  display: none;
  position: relative;
  width: 40px;
  height: 30px;
  color: var(--header-color-text);
  cursor: pointer;
  z-index: 1000;
}

$menu-animation-duration: 400ms;
$menu-animation-timing: ease-out;

.burger-menu-piece {
  display: block;
  position: absolute;
  width: 40px;
  border-top: 6px solid var(--header-color-text);
  transform-origin: 50% 50%;
  transition: transform $menu-animation-duration $menu-animation-timing;

  &:nth-child(1) {
    top: 0;
  }

  &:nth-child(2) {
    top: 12px;
    opacity: 1;
    transition: transform $menu-animation-duration $menu-animation-timing,
      opacity 0ms linear $menu-animation-duration / 2;
  }

  &:nth-child(3) {
    top: 24px;
  }

  .active & {
    &:nth-child(1) {
      animation: burger-open-top $menu-animation-duration $menu-animation-timing
        forwards;
    }

    &:nth-child(2) {
      opacity: 0;
      transition: transform $menu-animation-duration $menu-animation-timing,
        opacity 0ms linear $menu-animation-duration / 2;
    }

    &:nth-child(3) {
      animation: burger-open-bot $menu-animation-duration $menu-animation-timing
        forwards;
    }
  }

  .closing & {
    &:nth-child(1) {
      animation: burger-close-top $menu-animation-duration
        $menu-animation-timing forwards;
    }

    &:nth-child(3) {
      animation: burger-close-bot $menu-animation-duration
        $menu-animation-timing forwards;
    }
  }
}

@keyframes burger-open-top {
  50% {
    transform: translate3d(0, 12px, 0);
  }
  100% {
    transform: translate3d(0, 12px, 0) rotate(45deg);
  }
}

@keyframes burger-open-bot {
  50% {
    transform: translate3d(0, -12px, 0);
  }
  100% {
    transform: translate3d(0, -12px, 0) rotate(-45deg);
  }
}

@keyframes burger-close-top {
  0% {
    transform: translate3d(0, 12px, 0) rotate(45deg);
  }
  50% {
    transform: translate3d(0, 12px, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes burger-close-bot {
  0% {
    transform: translate3d(0, -12px, 0) rotate(-45deg);
  }
  50% {
    transform: translate3d(0, -12px, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
.header__menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
}
.header__menu-item {
  & a {
    text-transform: uppercase;
    font-weight: bold;
    padding: 20px;
    position: relative;
    transition: var(--speed)
  }
}
.header__email {
}
.header__title {
  text-align: center;

  & p {
    font-family: "MuseoSans", sans-serif;
    font-size: 2rem;
    color: var(--header-color-text);
    transition: var(--speed);
  }
}
.header__arrow-down {
  border: 1.25px solid var(--header-color-text);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: var(--header-color-text);

  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
}

.header__arrow-down--img {
  width: 30px;
  height: 30px;
}

@media screen and (max-width: 931px) {
  .header__email {
    display: none;
  }
}
@media screen and (max-width: 605px) {
  .burger-menu {
    display: block;
  }
  .header__menu {
    display: none;
    position: absolute;
  }
}
</style>
