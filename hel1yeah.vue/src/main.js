import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuescrollto from './../node_modules/vue-scrollto'
import particles from "particles.vue3";

import 'normalize.css/normalize.css'

import './assets/scss/main.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(particles)
app.use(vuescrollto, {
  container: 'body',
  duration: 700,
  easing: 'line',
  offset: -60,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
})
app.mount('#app')
