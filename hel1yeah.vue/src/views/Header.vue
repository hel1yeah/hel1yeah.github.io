<template>
  <section class="header">
    <div class="container">
      <div class="header__inner-wrapper">
        <nav class="header__nav">
          <img
            class="header__logo"
            src="./../assets/hel1-logo.svg"
            alt="hel1-logo.svg"
          />

          <div class="burger-menu" @click="useBurger()" ref="burgerMenu">
            <span class="burger-menu-piece"></span>
            <span class="burger-menu-piece"></span>
            <span class="burger-menu-piece"></span>
          </div>

          <ul class="header__menu" :class="{ active: isActive }">
            <li class="header__menu-item"><a href="#">обо мне</a></li>
            <li class="header__menu-item"><a href="#">навыки</a></li>
            <li class="header__menu-item"><a href="#">работы</a></li>
          </ul>
          <a class="header__email" href="mailto:hel1_yeah@ukr.net"
            >hel1_yeah@ukr.net</a
          >
        </nav>
        <div class="header__title">
          <h1>дело, которым я живу</h1>
          <p>вёрстка & front-end</p>
        </div>
        <a class="header__arrow-down"
          ><img
            class="header__arrow-down--img"
            src="./../assets/images/down-arrow.svg"
            alt="down-arrow"
        /></a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    useBurger() {
      let clickDelay = 500
      const burgerMenu = this.$refs.burgerMenu
      burgerMenu.classList.toggle('active')
      this.isActive = !this.isActive

      if (!burgerMenu.classList.contains('active')) {
        burgerMenu.classList.add('closing')
      }

      setTimeout(() => {
        burgerMenu.classList.remove('closing')
      }, clickDelay)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 1;
  position: relative;
  height: 100vh;
  background: url('./../assets/images/header_bg.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  color: var(--color-light);

  & a {
    color: var(--color-light);
    font-family: 'MuseoSans';
    font-weight: 100;
    text-transform: lowercase;

    font-size: 0.9rem;
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
  font-family: 'MuseoSans', sans-serif;
  font-size: 0.9rem;
}
.header__logo {
  width: 100px;
  z-index: 999;
}
.burger-menu {
  display: none;
  position: relative;
  width: 40px;
  height: 30px;
  color: var(--color-light);
  cursor: pointer;
  z-index: 999;
}

$menu-animation-duration: 400ms;
$menu-animation-timing: ease-out;

.burger-menu-piece {
  display: block;
  position: absolute;
  width: 40px;
  border-top: 6px solid var(--color-light);
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
  }
}
.header__email {
}
.header__title {
  text-align: center;
  & p {
    font-family: 'MuseoSans', sans-serif;
    font-size: 2rem;
  }
}
.header__arrow-down {
  border: 1.25px solid var(--color-light);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: var(--color-light);

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
    top: 100%;
    li:first-child {
      margin-top: 40px;
    }
    &.active {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: absolute;
      top: 0;
      right: 0;
      width: 100vw;
      max-width: 100%;
      height: 100vh;
      background: var(--color-dark);
      .header__menu-item a {
        padding: 40px;
        font-size: 2rem;
      }
    }
  }
}
</style>
