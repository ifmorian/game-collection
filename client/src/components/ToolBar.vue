<template>
  <div class="tools" :class="{'tools-active': (!(showChat || showLobby) && lobby.name !== 'Not connected')}">
    <span class="material-symbols-outlined tools-icon">handshake</span>
    <div v-if="!(showChat || showLobby)" class="open open-lobby" @click="showLobby = true">
      <span class="material-symbols-outlined open-icon lobby-icon">groups</span>
    </div>
    <div v-if="!(showChat || showLobby)" class="open open-chat" @click="showChat = true; focusInput()">
      <span class="material-symbols-outlined open-icon chat-icon">chat_bubble</span>
    </div>
  </div>
  <div class="box" :class="{'box-show': showChat}">
    <div class="box-main" :class="{'hide' : !showChat}">
      <div class="box-header">
        <div class="box-title">{{lobby.name}}</div>
        <span class="material-symbols-outlined exit-icon" @click="showChat = false">transit_enterexit</span>
      </div>
      <div class="divider title-divider"></div>
      <div ref="chatbox" class="chat-messages">
        <div v-for="(message, i) in lobby.messages" class="chat-messages-msg">
          <div v-if="i === 0 || (message.sender !== lobby.messages[i - 1].sender)" class="chat-messages-msg-sender">{{message.sender}}</div>
          <div class="chat-messages-msg-content">{{message.message}}</div>
        </div>
      </div>
      <form class="chat-messages-send">
        <input ref="input" type="text" name="message" id="message" class="input" v-model="message" maxlength="256">
        <button type="submit" value="Send" @click.prevent="sendMessage()" class="chat-messages-send-submit">
          <span class="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  </div>
  <div class="box" :class="{'box-show': showLobby}">
    <div class="box-main lobby-main" :class="{'hide' : !showLobby}">
      <div class="box-header">
        <div class="box-title">{{lobby.name}}</div>
        <span class="material-symbols-outlined exit-icon" @click="showLobby = false">transit_enterexit</span>
      </div>
      <div class="divider title-divider"></div>
      <div class="lobby-players">
        <div class="lobby-players-player" v-for="player in lobby.players">
          <span class="material-symbols-outlined connected-icon" v-if="player.active">person</span><span class="material-symbols-outlined connected-icon off" v-else>person_off</span>{{player.userid}}<span v-if="(player.userid === lobby.owner)" class="material-symbols-outlined owner-icon">star</span>
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
      let userid = store.userid;
      return { lobby, userid };
    },
    data() {
      return {
        showChat: false,
        showLobby: false,
        message: ''
      }
    },
    methods: {
      async sendMessage() {
        if (this.message === '') return;
        store.lobby.value.messages.push({sender: store.userid.value, message: this.message});
        await this.$nextTick();
        let el = this.$refs.chatbox.lastElementChild;
        el.scrollIntoView({behavior: 'smooth', block: 'end'});
        this.$sendMessage(this.message, () => {
          el.style.color = 'red';
        });
        this.message = '';
      },
      focusInput() {
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    }
  }
</script>

<style scoped>
  @import '../assets/styles/form.css';
  .tools {
    position: fixed;
    bottom: -6vw;
    right: -6vw;
    width: 12vw;
    height: 12vw;
    border-radius: 10vw;
    border: .1vw solid transparent;
    transition: width .3s, height .3s, bottom .3s, right .3s, border-color .3s;
  }

  .tools-active:hover {
    bottom: -9.75vw;
    right: -9.75vw;
    width: 19.5vw;
    height: 19.5vw;
    border: .1vw solid rgba(var(--color-text-rgb), .2);
  }

  .tools-active > .tools-icon {
    opacity: 1;
  }

  .tools-icon {
    position: absolute;
    right: 7.5vw;
    bottom: 7.5vw;
    opacity: .2;
    transition: font-size .3s, opacity .2s, right .3s, bottom .3s, font-variation-settings .3s;
    user-select: none;
    font-variation-settings: 'FILL' 0, 'wght' 100;
    font-size: 2.5vw;
  }

  .tools-active:hover .tools-icon {
    font-size: 4vw;
    opacity: .2;
    right: 11.5vw;
    bottom: 11.5vw;
    font-variation-settings: 'wght' 200;
  }

  .tools-active:hover > .open {
    opacity: 1;
    width: 4vw;
    height: 4vw;
    cursor: pointer;
    background-color: var(--color-background-mute);
  }

  .tools-active:hover > .open-chat {
    margin-left: -1.4vw;
    margin-top: 3.7vw;
  }

  .tools-active:hover > .open-lobby {
    margin-top: -1.4vw;
    margin-left: 3.7vw;
  }

  .open {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5vw;
    margin-top: 5vw;
    border-radius: 2.5vw;
    width: 0;
    height: 0;
    opacity: 0;
    transition: box-shadow .3s, margin-left .5s, margin-top .5s, opacity .3s, width .5s, height .5s, border-radius .5s;
  }

  .open:hover .open-icon {
    margin-bottom: .2vw;
  }

  .open:hover {
    box-shadow: 0 0 .4vw rgba(var(--color-text-rgb), .4);
  }

  .open-icon {
    font-size: 0;
    transition: font-size .5s, margin .3s;
  }

  .tools:hover .chat-icon {
    font-size: 1.6vw;
  }
  .tools:hover .lobby-icon {
    font-size: 2vw;
  }

  .box {
    position: fixed;
    width: 0;
    height: 0;
    border-radius: .8vw;
    bottom: 5vw;
    right: 5vw;
    background-color: var(--color-background-mute);
    transition: all .2s;
  }

  .box-header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .exit-icon {
    margin-left: auto;
    cursor: pointer;
    transition: color .2s;
  }

  .exit-icon:hover {
    color: var(--red);
  }

  .box-main {
    height: 100%;
    transition: opacity .15s;
    transition-delay: .12s;
    opacity: 1;
    display: grid;
    grid-template-rows: 1fr 1fr 12fr 1fr;
  }

  .hide {
    visibility: hidden;
    opacity: 0;
  }

  .box-show {
    width: 20vw;
    height: 30vw;
    padding: .8vw 1.1vw;
    padding-bottom: 1vw;
  }

  .box-title {
    font-size: 150%;
    word-break: break-all;
  }

  .chat-messages {
    width: 100%;
    overflow-y: scroll;
    margin-bottom: 5%;
  }

  .chat-messages-msg {
    display: flex;
    flex-direction: column;
    padding: 2% 1.5%;
  }

  .chat-messages-msg-sender {
    width: 100%;
    word-break: break-all;
    margin-top: 2%;
    font-size: 85%;
    font-style: italic;
  }

  .chat-messages-msg-content {
    width: 100%;
    margin-left: auto;
    word-break: break-all;
    padding: 1% 3%;
    border-radius: .8vw;
    background: var(--color-background-soft);
    font-size: 95%;
  }

  .chat-messages-send {
    display: flex;
    flex-direction: row;
  }

  .input {
    width: 85%;
    border-radius: .8vw;
  }

  .input:focus {
    border-color: var(--red);
  }

  .chat-messages-send-submit {
    background: transparent;
    border: none;
    margin: 0 auto;
  }

  .chat-messages-send-submit > span {
    color: var(--color-text);
    cursor: pointer;
    transition: color .2s;
  }

  .chat-messages-send-submit:hover > span {
    color: var(--blue);
  }

  .lobby-main {
    display: flex;
    flex-direction: column;
  }

  .lobby-players {
    overflow-y: scroll;
  }

  .lobby-players-player {
    display: flex;
    flex-direction: row;
    align-items: center;
    word-break: break-all;
    margin-bottom: 3%;
  }

  .owner-icon {
    font-size: 1rem;
    margin-left: .3rem;
    margin-top: -.15rem;
    color: gold;
  }

  .connected-icon {
    font-size: 1.4rem;
    color: var(--success);
    opacity: .6;
    margin-bottom: auto;
  }

  .off {
    color: var(--error);
  }

</style>