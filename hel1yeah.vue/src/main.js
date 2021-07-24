import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
import 'normalize.css/normalize.css'

import './assets/scss/main.scss'
app.use(store)
app.use(router)
app.mount('#app')
