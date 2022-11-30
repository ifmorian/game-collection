import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { RouterLink } from 'vue-router';

import './assets/main.css'

const app = createApp(App)

app.component('RouterLink', RouterLink);

app.use(router)

app.mount('#app')
