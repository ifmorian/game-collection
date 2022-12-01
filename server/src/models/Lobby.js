class LobbyClass {
  constructor(name, password, userid) {
    this.name = name;
    this.password = password;
    this.owner = userid;
    this.players = [];
    this.room = name + (new Date().getTime());
  }
}

let lobbies = [];

const Lobby = (data, cb) => {
  let errorCode = 1;
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

module.exports = {Lobby, lobbies};