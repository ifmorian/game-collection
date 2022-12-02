<template>
  <div class="tools">
    <div v-if="!showChat" class="open" @click="showChat = true">
      <span class="material-symbols-outlined open-icon">chat_bubble</span>
    </div>
  </div>
  <div class="chat" :class="{'chat-show': showChat}" @click="showChat = false">
    <div class="chat-main" :class="{'display-none' : !showChat}">
      <div class="chat-title">{{lobby.name}}</div>
      <div class="divider title-divider"></div>
      <div class="chat-messages">
        <div class="chat-messages-msg">
          <div class="chat-messages-msg-sender">Orian</div>
          <div class="chat-messages-msg-content">Hi</div>
        </div>
        <div class="chat-messages-msg">
          <div class="chat-messages-msg-sender">Orian</div>
          <div class="chat-messages-msg-content">Was geht?</div>
        </div>
        <div class="chat-messages-msg">
          <div class="chat-messages-msg-sender">Luis</div>
          <div class="chat-messages-msg-content">Nix du loser, hau ab hsawdawda adawdawdjhkahdkhakdakhdkahd</div>
        </div>
        <div class="chat-messages-msg">
          <div class="chat-messages-msg-sender">Orian123</div>
          <div class="chat-messages-msg-content">Hi</div>
        </div>
        <div class="chat-messages-msg">
          <div class="chat-messages-msg-sender">Orian123</div>
          <div class="chat-messages-msg-content">Hi</div>
        </div>
        <div class="chat-messages-msg">
          <div class="chat-messages-msg-sender">Orian123</div>
          <div class="chat-messages-msg-content">Hi</div>
        </div>
        <div class="chat-messages-msg">
          <div class="chat-messages-msg-sender">Orian123</div>
          <div class="chat-messages-msg-content">Hi</div>
        </div>
        <div class="chat-messages-msg">
          <div class="chat-messages-msg-sender">Orian123</div>
          <div class="chat-messages-msg-content">Hi</div>
        </div>
        <div class="chat-messages-msg">
          <div class="chat-messages-msg-sender">Orian123</div>
          <div class="chat-messages-msg-content">Hi</div>
        </div>
        <div class="chat-messages-msg">
          <div class="chat-messages-msg-sender">Orian123</div>
          <div class="chat-messages-msg-content">Hi</div>
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
        showChat: false
      }
    }
  }
</script>

<style scoped>
  .tools {
    position: fixed;
    bottom: -10vw;
    right: -10vw;
    width: 17vw;
    height: 17vw;
    border-radius: 10vw;
    background-image: radial-gradient(var(--color-shadow-transparent) 0%, transparent 60%);
  }

  .open {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5vw;
    margin-top: 5vw;
    border-radius: 2.5vw;
    width: 0;
    height: 0;
    opacity: 0;
    transition: all .5s, box-shadow .3s;
  }

  .open:hover .open-icon {
    margin-bottom: .2vw;
  }

  .open:hover {
    box-shadow: 0 0 .4vw var(--color-shadow-transparent);
  }

  .tools:hover > .open {
    opacity: 1;
    width: 4vw;
    height: 4vw;
    margin-left: -.7vw;
    margin-top: -.7vw;
    cursor: pointer;
    background-color: var(--color-background-mute);
  }

  .open-icon {
    font-size: 0;
    transition: font-size .5s, margin .3s;
  }

  .tools:hover .open-icon {
    font-size: 1.6vw;
  }

  .display-none {
    display: none;
  }

  .chat {
    position: fixed;
    width: 0;
    height: 0;
    border-radius: .8vw;
    bottom: 5vw;
    right: 5vw;
    background-color: var(--color-background-mute);
    transition: all .2s;
  }

  .chat-show {
    width: 17vw;
    height: 20vw;
    padding: .8vw 1.1vw;
  }

  .chat-title {
    font-size: 150%;
  }

  .chat-messages {
    width: 100%;
    height: 15vw;
    overflow-y: scroll;
  }

  .chat-messages-msg:nth-child(even) {
    background: var(--color-background-soft);
  }

  .chat-messages-msg {
    display: flex;
    flex-direction: row;
    padding: 2% 1.5%;
  }

  .chat-messages-msg-sender {
    width: 20%;
    word-break: break-all;
  }

  .chat-messages-msg-content {
    width: 75%;
    margin-left: auto;
    word-break: break-all;
  }

</style>