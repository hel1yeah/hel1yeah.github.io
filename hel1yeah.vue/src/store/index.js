import { createStore } from 'vuex'

export default createStore({
  state: {
    isLinks: [
      {
        title: 'facebook',
        link: 'https://www.facebook.com/YuraLarsen',
        text: 'facebook.com/YuraLarsen',
        img: require('../assets/images/link-img/facebook.svg'),
      },
      {
        title: 'linkedin',
        link: 'https://www.linkedin.com/in/yura-larsen/',
        text: 'linkedin.com/in/yura-larsen',
        img: require('../assets/images/link-img/linkedin.svg'),
      },
      {
        title: 'github',
        link: 'https://github.com/hel1yeah',
        text: 'github: hel1yeah',
        img: require('../assets/images/link-img/github.svg'),
      },
      {
        title: 'telegram',
        link: 'https://t.me/hel1_yeah',
        text: 'telegram: @hel1_yeah ',
        img: require('../assets/images/link-img/telegram.svg'),
      },
      {
        title: 'ukr.net',
        link: 'mailto:hel1_yeah@ukr.net',
        text: 'hel1_yeah@ukr.net',
        img: require('../assets/images/link-img/mail.svg'),
      },
      {
        title: 'gmail',
        link: 'mailto:hel1rockua@gmail.com',
        text: 'hel1rockua@gmail.com',
        img: require('../assets/images/link-img/google.svg'),
      },
    ],
    isSkills: [
      { name: 'HTML5', level: '75%' },
      { name: 'CSS3, SCSS, BEM', level: '79%' },
      { name: 'лень', level: '0.1%' },
      { name: 'adaptive', level: '79%' },
      { name: 'JavaScript', level: '82%' },
      { name: 'Vue.js', level: '85%' },
      { name: 'git, github', level: '55%' },
      { name: 'PHOTOSHOP, FIGMA', level: '76%' },
      { name: 'Elementary', level: 'A2' },
      { name: 'humor', level: '69 (:' },
    ],
    isProjects: [
      {
        name: 'Prechu',
        descr: 'Первые шаги в путь Front-End',
        img: require('../assets/images/full-page/prechu.png'),
        demo: require('../assets/images/demo-page/prechu-demo.png'),
        id: 1,
      },
      {
        name: 'Prechu',
        descr: 'Первые шаги в путь Front-End',
        img: require('../assets/images/full-page/prechu.png'),
        demo: require('../assets/images/demo-page/prechu-demo.png'),
        id: 1,
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
})
