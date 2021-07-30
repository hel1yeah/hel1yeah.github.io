<template>
  <section class="about-me" id="about-me">
    <div class="container">
      <div class="about-me__inner-wrapper">
        <h2 class="about-me__title">Обо мне</h2>
        <div class="about-me__gread">
          <div class="about-me__background">
            <h3 class="about-me__background-title">Бэкграунд</h3>
            <p class="about-me__background-descr">
              Junior Front - End Developer. В мир Web-разработки попал случайно,
              по работе нужно было разобраться в некоторых тонкостях этой сферы.
              И я разобрался. Потратив огромное количество часов на всевозможные
              статьи и видео, эта вселенная оставила очень большое впечатление.
            </p>
            <p class="about-me__background-descr">
              Настолько большое, что вместо того чтобы отдыхать после работы, я,
              сам того не замечая, засиживался До позднего вечера за
              разработкой. Так Front-End стал для меня хобби, которым мне
              хочется заниматься.
            </p>
            <p class="about-me__background-descr">
              Изучив самостоятельно HTML5, CSS3, Photoshop, мне всё ещё
              казалось, что я чего-то не знаю. Следующий шаг - курсы, к
              сожалению, выделил из них мало чего полезного для себя, потому что
              большую часть материала знал до этого. Дальше - я взялся за
              изучение: jQuery, Gulp, GitHub, Git, Figma. Сейчас я изучаю
              JavaScript, дальше будет <s>React </s> Vue.js!
            </p>
            <p class="about-me__background-descr">
              Если у Вас есть советы, пожелания, предложения по практике или
              работе, буду рад знакомству!
            </p>
          </div>
          <div class="wrapper__merit-links">
            <div class="about-me__merit">
              <h3 class="about-me__merit-title">Заслуги</h3>
              <div class="merit-wrapper">
                <div class="merit__item">
                  <div class="merit__item-square-outside">
                    <div class="merit__item-square-inside">
                      <p class="merit__item-square-inside-txt">101%</p>
                    </div>
                  </div>
                  <span class="merit__item--descr">Обучаемость</span>
                </div>
                <div class="merit__item">
                  <div class="merit__item-square-outside">
                    <div class="merit__item-square-inside">
                      <p class="merit__item-square-inside-txt">777</p>
                    </div>
                  </div>
                  <span class="merit__item--descr">Удача</span>
                </div>
                <div class="merit__item">
                  <div class="merit__item-square-outside">
                    <div class="merit__item-square-inside">
                      <p class="merit__item-square-inside-txt">100%</p>
                    </div>
                  </div>
                  <span class="merit__item--descr"
                    >Преданность <br />
                    королю</span
                  >
                </div>
              </div>
            </div>
            <div class="about-me__links">
              <h3 class="about-me__links-title">Связь</h3>
              <ul class="about-me__links-list">
                <li
                  class="about-me__links-list-item"
                  v-for="(link, index) in links"
                  :key="index"
                >
                  <a
                    class="about-me__link"
                    :title="link.title"
                    :href="link.link"
                    target="_blank"
                    >{{ link.text }}
                  </a>
                  <img
                    class="about-me__link-img"
                    :src="link.img"
                    :alt="link.title"
                  />
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

export default {
  name: 'AboutMe',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      links: (state) => state.isLinks,
    }),
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.about-me {
  margin: 4rem 0 0;
}
.container {
}
.about-me__inner-wrapper {
}
.about-me__title {
  margin: 4rem 0 0;
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
  font-family: 'MuseoSans', sans-serif;
  font-size: 1.25rem;
  line-height: 1.5;
  margin: 0 0 1.75rem;
}

.about-me__merit-title {
}
.merit-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
  font-family: 'MuseoSans', sans-serif;
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
  border: 1.25px solid var(--color-green);
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
}
.merit__item--descr {
  font-weight: 300;
  margin: 2.5rem 0 0 0;
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
  font-family: 'MuseoSans', sans-serif;
  color: var(--color-green);
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
