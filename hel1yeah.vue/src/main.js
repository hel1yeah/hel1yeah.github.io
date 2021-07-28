import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuescrollto from './../node_modules/vue-scrollto'
const app = createApp(App)
import 'normalize.css/normalize.css'

import './assets/scss/main.scss'
app.use(store)
app.use(router)
app.use(vuescrollto, {
  container: 'body',
  duration: 700,
  easing: 'ease-in-out',
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
