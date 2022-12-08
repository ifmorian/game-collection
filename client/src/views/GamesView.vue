<template>
  <div class="games">
    <div class="games-container" v-for="game in games">
      <div class="games-game" @click="game.fullScreen = true">
        <img class="games-game-logo" :src="game.logo">
        <div class="games-game-title">{{game.title}}</div>
        <div class="games-game-description">{{game.description}}</div>
      </div>
      <div class="full" v-if="game.fullScreen">
        <span class="material-symbols-outlined close-icon" @click="game.fullScreen = false">close</span>
        <img class="full-image" :src="game.logo">
        <div class="full-side">
          <div class="full-title">{{game.title}}</div>
          <div class="full-description">{{game.description}}</div>
          <a class="full-rules" :href="game.rules" rel="noopener" target="_blank">Rules</a>
        </div>
        <div class="divider-horizontal"></div>
        <div class="full-side">
          <div class="full-lobby-title">{{lobby.name}}</div>
          <div class="full-lobby-players">
            <div class="full-lobby-players-player"
              v-bind:key="player"
              v-for="(player, index) in lobby.players"
            >
              <div class="index-icon">{{(index + 1)}}</div><span class="material-symbols-outlined connected-icon" v-if="player.active">person</span><span class="material-symbols-outlined connected-icon off" v-else>person_off</span><span style="padding-top: .4%">{{player.userid}}</span><span v-if="(player.userid === lobby.owner)" class="material-symbols-outlined owner-icon">star</span>
            </div>
          </div>
          <div class="full-lobby-join">
            <div class="full-lobby-join-count">
              <div class="full-lobby-join-count-max" :style="{'color': lobby.players.length >= game.minPlayers ? 'var(--success)' : 'var(--error)'}">{{(lobby.players.length + '/' + game.maxPlayers)}}</div>
              <div class="full-lobby-join-count-min" v-if="(lobby.players.length < game.minPlayers)">min: {{game.minPlayers}}</div>
            </div>
            <div class="full-lobby-join-group">
              <button class="full-lobby-join-button" @click="joinGame(game.id)">Start Game</button>
              <div class="full-lobby-join-error">{{error}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store';
  export default {
    setup() {
      let lobby = store.lobby;
      return { lobby };
    },
    data() {
      return {
        error: '',
        games: [
          {
            title: 'Secret Hitler',
            logo: './src/assets/images/secret-hitler/logo.png',
            id: 'secret-hitler',
            rules: 'https://www.secrethitler.com/assets/Secret_Hitler_Rules.pdf',
            minPlayers: 2,
            maxPlayers: 3,
            description: `The year is 1932. The place is pre-WWII Germany.
                          In Secret Hitler, players are German politicians
                          attempting to hold a fragile Liberal government
                          together and stem the rising tide of Fascism.
                          Watch out though—there are secret Fascists among
                          you, and one player is Secret Hitler.`,
            fullScreen: false
          },
        ]
      }
    },
    methods: {
      joinGame(id) {
        this.$joinGame(id, errorCode => {
          if (errorCode === 0) this.$updateSession();
          else if (errorCode === 1) this.error = 'You must be in a lobby';
          // else if (errorCode === 2) 
        });
      }
    }
  }
</script>

<style scoped>
  .games {
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns: repeat(auto-fill, 12.75rem);
    gap: 2rem;
    justify-items: center;
    width: 120%;
    justify-content: center;
  }
  .games-game {
    width: 12.75rem;
    height: 17rem;
    background: var(--color-background-mute);
    cursor: pointer;
    outline: 3px solid var(--color-border);
    transition: outline .3s;
  }

  .games-game:hover {
    outline-color: var(--color-border-hover);
  }

  .games-game:hover .games-game-logo {
    transform: scale(1.15);
  }

  .games-game:hover .games-game-title::after {
    width: 100%;
    left: 0;
  }
  .games-game:hover .games-game-title {
    height: 60%;
  }

  .games-game:hover .games-game-description {
    visibility: visible;
    opacity: 1;
  }

  .games-game-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    border-top: 2px solid var(--red);
    background: rgba(0, 0, 0, .5);
    font-weight: bold;
    font-size: 120%;
    display: flex;
    justify-content: center;
    padding-top: 5%;
    box-sizing: border-box;
    backdrop-filter: blur(2px);
    transition: height .3s;
    /* text-shadow: 0 0px 5px var(--color-background-mute); */
    color: rgba(250, 250, 250, 0.8);
  }

  .games-game-title::after {
    content: '';
    position: absolute;
    top: -2px;
    left: 50%;
    width: 0;
    height: 100%;
    border-top: 4px solid var(--blue);
    box-sizing: border-box;
    transition: width .3s ease, left .3s ease;
  }

  .games-game-logo {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: transparent;
    transition: transform .3s;
  }

  .games-game-description {
    color: rgba(250, 250, 250, 0.8);
    font-size: 90%;
    line-height: 100%;
    position: absolute;
    bottom: 4%;
    height: 46%;
    width: 100%;
    padding: 8%;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    visibility: hidden;
    opacity: 0;
    transition: visibility .3s, opacity .3s;
  }

  .divider-horizontal {
    width: 4px;
    border-radius: 2px;
    background: var(--color-text);
  }

  .full {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    top: 10%;
    left: 15%;
    width: 70%;
    height: 80%;
    background: var(--color-background-mute);
    padding: 3%;
  }

  .full::before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .3);
  }
  .full-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: contain;
    opacity: .3;
  }

  .full-side {
    display: flex;
    flex-direction: column;
    width: 42%;
  }

  .full-title {
    font-size: 200%;
    font-weight: bold;
  }

  .full-description {
    font-size: 110%;
    overflow-x: scroll;
    overflow-wrap: anywhere;
    margin-bottom: 5%;
  }

  .full-rules {
    margin-top: auto;
    font-size: 120%;
    width: max-content;
    color: var(--color-text);
    font-weight: bold;
  }

  .full-rules::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: var(--red);
    transition: width .3s, background-color .1s;
  }

  .full-rules:hover::after {
    width: 100%;
    background: var(--blue);
  }

  .full-lobby-title {
    font-size: 150%;
    font-weight: bold;
    margin-bottom: 3%;
  }

  .full-lobby-players {
    padding: 3%;
    overflow-y: scroll;
    overflow-x: hidden;
    left: -10%;
    width: 110%;
    margin-bottom: 7%;
  }

  .full-lobby-players-player {
    display: flex;
    align-items: flex-start;
    overflow-wrap: anywhere;
    line-height: 160%;
  }

  .full-lobby-join {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: auto;
    justify-content: center;
    height: 4rem;
  }

  .full-lobby-join-count {
    display: flex;
    flex-direction: column;
    margin-right: 10%;
  }

  .full-lobby-join-count-max {
    font-size: 300%;
    font-weight: bold;
  }
  .full-lobby-join-count-min {
    font-size: 120%;
    margin-top: -30%;
  }

  .full-lobby-join-group {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
  }

  .full-lobby-join-button {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: var(--red);
    border: none;
    color: var(--color-text);
    font-size: 150%;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    border-radius: 5px;
    transition: background-color .5s, color .5s;
  }

  .full-lobby-join-button:hover {
    background-color: var(--blue);
    color: var(--color-background);
  }

  .full-lobby-join-error {
    color: var(--error);
    position: absolute;
    bottom: -1.5rem;
  }

  .index-icon {
    font-weight: bold;
    font-size: 160%;
    padding-right: 10%;
    height: 160%;
    margin-top: .15rem;
  }

  .owner-icon {
    font-size: 120%;
    margin-left: .3rem;
    margin-top: .15rem;
    color: gold;
  }

  .connected-icon {
    font-size: 1.4rem;
    color: var(--success);
    opacity: .6;
    margin-right: 5%;
    margin-top: .16rem;
  }

  .close-icon {
    position: absolute;
    font-size: 200%;
    top: 4%;
    right: 3%;
    cursor: pointer;
    z-index: 1;
    transition: color .2s;
  }

  .close-icon:hover {
    color: var(--red);
  }

  .off {
    color: var(--error);
  }

</style>