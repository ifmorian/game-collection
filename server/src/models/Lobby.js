class LobbyClass {
  constructor(name, password, userid) {
    this.name = name;
    this.password = password;
    this.owner = userid;
    this.players = [];
    this.room = name + (new Date().getTime());
  }
  delete() {
    lobbies = lobbies.filter(l => l.name !== this.name);
  }
}

let lobbies = [];

const Lobby = (data, cb) => {
  let errorCode = 1;
  if (lobbies.some(l => l.players.some(player => player.userid === data.userid))) {
    cb(7);
    return;
  }
  if (data.name === '') errorCode *= 3;
  if (lobbies.some(l => { return l.name === data.name; })) {
    errorCode *= 5;
  }
  if (errorCode === 1) {
    let newLobby = new LobbyClass(data.name, data.password, data.userid);
    lobbies.push(newLobby);
  }
  cb(errorCode);
}

module.exports = {Lobby, getLobbies: () => { return lobbies }};