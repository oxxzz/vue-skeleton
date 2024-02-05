import '@icon-park/vue-next/styles/index.css'
import './assets/main.css'

import { install as installIconPark } from '@icon-park/vue-next/es/all'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
installIconPark(app)

app.mount('#app')
