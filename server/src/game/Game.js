SecretHitler = require("./games/SecretHitler");

function GameClass(socket, minPlayers, maxPlayers, players) {
  
  this.socket = socket;
  this.minPlayers = minPlayers;
  this.maxPlayers = maxPlayers;
  this.players = players;

  const nextRound = () => {
    throw new Error('Method not implemented');
  }

  const shufflePlayers = () => {
    for (let i = this.players.length - 1; i > 0; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      // const temp = this.players[i];
      // this.players[i] = this.players[j];
      // this.players[j] = temp;
      this.players[i], this.players[j] = this.players[j], this.players[i]
    }
  }
}

const createGame = id => {
  switch (id) {
    case 'secret-hitler': return new SecretHitler();
  }
}

module.exports = { GameClass, createGame }