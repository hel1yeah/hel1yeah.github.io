import axios from 'axios'
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
      { name: 'adaptive', level: '79%' },
      { name: 'JavaScript', level: '82%' },
      { name: 'Vue.js', level: '85%' },
      { name: 'git, github', level: '55%' },
      { name: 'PHOTOSHOP, FIGMA', level: '76%' },
      { name: 'Elementary', level: 'A2' },
      { name: 'GSAP', level: '55%' },
    ],
    menuList: [
      {
        scrollTo: '#about-me',
        name: 'обо мне'
      },
      {
        scrollTo: '#skills',
        name: 'навыки'
      },
      {
        scrollTo: '#works',
        name: 'работы'
      },
    ],
    isProjects: null,
    isLoading: false,
    error: null,
    isTheme: 'light'
  },
  mutations: {
    setProjectsUploadStart(state) {
      state.isProjects = null
      state.isLoading = true
    },
    setProjectsUploadSuccess(state, payload) {
      state.isProjects = payload
      state.isLoading = false
    },
    setProjectsUploadFailure(state, payload) {
      state.isProjects = null
      state.error = payload
      state.isLoading = false
    },
    setTheme(state, payload) {
      state.isTheme = payload
    }
  },
  actions: {
    getWorks({ commit }) {
      commit('setProjectsUploadStart')
      return new Promise((resolve) => {
        axios
          .get(
            'https://hel1-yeah-default-rtdb.europe-west1.firebasedatabase.app/works-data.json',
          )
          .then((response) => {
            if (response.status === 200) {
              commit('setProjectsUploadSuccess', response.data)
            }
          })
          .catch((err) => {
            commit('setProjectsUploadFailure', err)
          })
      })
    },
    changeTheme({ state, commit }) {
      const elem = document.getElementById('app')
      if (state.isTheme === 'light') {
        elem.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
        commit('setTheme', 'dark')
      } else {
        elem.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
        commit('setTheme', 'light')
      }
    },
    checkTheme({ commit }, theme) {
      const elem = document.getElementById('app')

      elem.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
      commit('setTheme', theme)

    }
  },
  modules: {},
})
