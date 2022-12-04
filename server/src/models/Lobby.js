class LobbyClass {
  constructor(name, password, userid) {
    this.name = name;
    this.password = password;
    this.owner = userid;
    this.players = [];
    this.room = name + (new Date().getTime());
    this.messages = [];
  }
  delete() {
    lobbies = lobbies.filter(l => l.name !== this.name);
  }
  newMessage(msg) {
    this.messages.push(msg);
    if (this.messages.length > 10) this.messages.splice(0, 1);
  }
}

let lobbies = [];

const Lobby = (data, cb) => {
  if (lobbies.some(l => l.players.some(player => player.userid === data.userid))) cb(2);
  else if (data.name === '') cb(3);
  else if (data.name.lenght > 36) cb(4);
  else if (lobbies.some(l => { return l.name === data.name; })) cb(5);
  else {
    let newLobby = new LobbyClass(data.name, data.password, data.userid);
    lobbies.push(newLobby);
    cb(1);
  }
}

module.exports = {Lobby, getLobbies: () => { return lobbies }};