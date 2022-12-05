<template>
  <div class="games">
    <div class="games-container" v-for="game in games">
      <div class="games-game">
        <img class="games-game-logo" :src="game.logo">
        <div class="games-game-title">{{game.title}}</div>
        <div class="games-game-description">{{game.description}}</div>
      </div>
      <div class="full">
        <img class="full-image" :src="game.logo">
        <div class="full-side">
          <div class="full-title">{{game.title}}</div>
          <div class="full-description">{{game.description}}</div>
          <a class="full-rules" :href="game.rules" rel="noopener" target="_blank">Rules</a>
        </div>
        <div class="divider-horizontal"></div>
        <div class="full-side">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        games: [
          {
            title: 'Secret Hitler',
            logo: './src/assets/images/secret-hitler/logo.png',
            link: '/secret-hitler',
            rules: 'https://www.secrethitler.com/assets/Secret_Hitler_Rules.pdf',
            description: `The year is 1932. The place is pre-WWII Germany.
                          In Secret Hitler, players are German politicians
                          attempting to hold a fragile Liberal government
                          together and stem the rising tide of Fascism.
                          Watch out though—there are secret Fascists among
                          you, and one player is Secret Hitler.`
          },
        ]
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
    text-shadow: 0 0px 5px var(--color-background-mute);
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
    transition: width .3s linear, left .3s linear;
    transition-delay: .05s;
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
    border-bottom: 2px solid white;
  }

  .full-rules:hover {
    border-color: var(--blue);
  }

</style>