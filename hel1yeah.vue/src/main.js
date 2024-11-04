import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuescrollto from './../node_modules/vue-scrollto'

import 'normalize.css/normalize.css'

import './assets/scss/main.scss'

const app = createApp(App)
app.use(store)
// app.use(router)
app.use(vuescrollto, {
  container: 'body',
  easing: 'ease',
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
