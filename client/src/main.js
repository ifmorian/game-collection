import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { RouterLink } from 'vue-router';
import store from './store'
import AuthenticationService from './services/AuthenticationService';
import { io } from 'socket.io-client';

import './assets/main.css'

const socket = io('http://localhost:3000', {
  withCredentials: true
});

socket.on('connect', () => {
  console.log(`You're connected with id ${socket.id}`)
});

const app = createApp(App)

app.mixin({
  methods: {
    $updateSession: async () => {
      await AuthenticationService.checkLogin().then(res => {
        store.userid.value = res.data;
      });
    },
    $isLoggedIn: () => {
      return store.userid.value !== '';
    },
    $joinLobby: () => {
      socket.emit('join-lobby', ('test', 'test'), () => {})
    }
  }
})

app.component('RouterLink', RouterLink);

app.use(router)

app.mount('#app')
