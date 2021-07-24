<template>
  <section class="header">
    <div class="container">
      <div class="header__inner-wrapper">
        <nav class="header__nav">
          <div class="header__logo">Logo</div>
          <ul class="header__menu">
            <li class="header__menu-item">обо мне</li>
            <li class="header__menu-item">навыки</li>
            <li class="header__menu-item">работы</li>
          </ul>
          <a class="header__email" href="mailto:hel1_yeah@ukr.net"
            >hel1_yeah@ukr.net</a
          >
        </nav>
        <div class="header__title">
          <h1>дело, которым я живу</h1>
          <p>вёрстка & front-end</p>
        </div>
        <div class="header__arrow-down">></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
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
  
}
.header__menu {
}
.header__menu-item {
  text-transform: uppercase;
  font-weight: bold;
}
.header__email {
}
.header__title {
  text-align: center;
  & h1 {
    font-size: 2rem;
  }
  & p {
    font-family: 'MuseoSans', sans-serif;
    font-size: 1rem;
  }
}
.header__arrow-down {
}
</style>
