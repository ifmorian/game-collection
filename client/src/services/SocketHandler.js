import io from 'socket.io-client';

import store from '../store';

const socket = io('http://localhost:3000', {
  withCredentials: true
}).close();

socket.on('connect', () => {
  console.log(`You're connected with id ${socket.id}`)
  socket.emit('rejoin-lobby', () => {
    console.error('Could not rejoin lobby: Session does not exist.')
  })
});

socket.on('update-lobby', (name, owner, players, messages) => {
  store.lobby.value.name = name;
  store.lobby.value.owner = owner;
  store.lobby.value.players = players;
  store.lobby.value.messages = messages;
});

socket.on('message-to-client', (message) => {
  store.lobby.value.messages.push(message);
});

export default socket;