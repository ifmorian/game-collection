import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { RouterLink } from 'vue-router';
import store from './store'
import AuthenticationService from './services/AuthenticationService';

import './assets/main.css'

import socket from './services/SocketHandler';

const app = createApp(App)

app.mixin({
  methods: {
    $updateSession: async function anonymous() {
      await AuthenticationService.checkLogin().then(res => {
        store.userid.value = res.data;
        if (res.data !== '') {
          socket.connect();
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
        players: [],
        messages: []
      }
      socket.emit('leave-lobby', () => {
        console.error('Could not leave lobby: Session does not exist.')
      })
    },
    $sendMessage: (msg, err) => {
      socket.emit('message-to-server', msg, err);
    },
    $joinGame: (id, err) => {
      if (store.userid.value === '') return err(1);
      socket.emit('create-game', id, err);
    }
  }
})

app.component('RouterLink', RouterLink);

app.use(router)

app.mount('#app')
