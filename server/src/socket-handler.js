const Lobby = require('./models/Lobby');

module.exports = function(socket, io, session) {
  function checkSession() {
    return session !== undefined;
  }
  function getLobby() {
    return Lobby.getLobbies().find(l => l.players.some(player => player.userid === session.userid));
  }
  function updateLobby(lobby) {
    io.to(lobby.room).emit('update-lobby', lobby.name, lobby.owner, lobby.players, lobby.messages);
  }

  socket.on('join-lobby', (name, password, cb) => {
    if (!checkSession()) {
      cb(0);
      return;
    }
    if (Lobby.getLobbies().some(l => l.players.some(player => player.userid === session.userid))) {
      cb(4); //already in lobby
      return;
    }
    let lobby = Lobby.getLobbies().find(l => { return l.name === name; })
    if (lobby === undefined) {
      cb(2); //lobby doesnt exist
      return;
    }
    if (lobby.password === password) {
      lobby.players.push({
        userid: session.userid,
        active: true
      });
      socket.join(lobby.room);
      updateLobby(lobby);
      cb(1);
    } else {
      cb(3); //wrong password
    }
  });
  socket.on('rejoin-lobby', (err) => { 
    if (!checkSession()) {
      err();
      return;
    }
    let lobby = getLobby();
    if (lobby === undefined) return;
    lobby.players.find(player => player.userid === session.userid).active = true;
    socket.join(lobby.room);
    updateLobby(lobby);
  });
  socket.on('leave-lobby', (err) => {
    if (!checkSession()) {
      err();
      return;
    }
    let lobby = getLobby();
    if (lobby === undefined) return;
    lobby.players = lobby.players.filter(player => player.userid !== session.userid);
    socket.leave(lobby.room);
    if (lobby.players.length === 0) {
      lobby.delete();
    } else if (lobby.owner === session.userid) {
      lobby.owner = lobby.players[0].userid;
    }
    updateLobby(lobby);
  });

  socket.on('disconnect', () => {
    if (!checkSession()) return;
    let lobby = getLobby()
    if (lobby === undefined) return;
    lobby.players.find(player => player.userid === session.userid).active = false;
    updateLobby(lobby);
  });

  socket.on('message-to-server', (msg, err) => {
    if (!checkSession()) return err();
    let lobby = getLobby();
    if (lobby === undefined) return err();
    let message = {
      sender: session.userid,
      message: msg.substring(0, 256)
    };
    lobby.newMessage(message);
    socket.to(lobby.room).emit('message-to-client', message);
  });
}