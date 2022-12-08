Game = require('../Game');

module.exports = class SecretHitler extends Game.GameClass{
  constructor(socket, minPlayers, maxPlayers, players) {
    super(socket, minPlayers, maxPlayers, players);
    
  }
}