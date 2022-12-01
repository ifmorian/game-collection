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
}).close();

socket.on('connect', () => {
  console.log(`You're connected with id ${socket.id}`)
});

socket.on('update-lobby', (name, owner, players) => {
  store.lobby.value.name = name;
  store.lobby.value.owner = owner;
  store.lobby.value.players = players;
})

const app = createApp(App)

app.mixin({
  methods: {
    $updateSession: async () => {
      await AuthenticationService.checkLogin().then(res => {
        store.userid.value = res.data;
        if (res.data !== '') {
          socket.connect();
          socket.emit('rejoin-lobby', () => {
            $updateSession();
          })
        } else {
          store.lobby.value.name = 'Not connected';
          socket.close();
        }
      });
    },
    $isLoggedIn: () => {
      return store.userid.value !== '';
    },
    $joinLobby: (name, password, cb) => {
      socket.emit('join-lobby', name, password, cb)
    },
    $leaveLobby: () => {
      store.lobby.value = {
        name: 'Not connected',
        owner: '',
        players: []
      }
    }
  }
})

app.component('RouterLink', RouterLink);

app.use(router)

app.mount('#app')
