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
        img: require('../assets/images/link-img/telegram.svg') ,
      },
      {
        title: 'ukr.net',
        link: 'mailto:hel1_yeah@ukr.net',
        text: 'hel1_yeah@ukr.net',
        img: require('../assets/images/link-img/mail.svg') ,
      },
      {
        title: 'gmail',
        link: 'mailto:hel1rockua@gmail.com',
        text: 'hel1rockua@gmail.com',
        img: require('../assets/images/link-img/google.svg'),
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
})
