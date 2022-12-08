<template>
  <div class="main">
    <div class="lobby">
      <div class="lobby-header">
        <div class="lobby-title">{{lobby.name}}</div>
        <span v-if="lobby.name !== 'Not connected'" class="material-symbols-outlined leave-icon" @click="$leaveLobby()">logout</span>
      </div>
      <div class="lobby-players">
        <div class="lobby-players-player"
          v-bind:key="player"
          v-for="player in lobby.players"
        >
          <span class="material-symbols-outlined connected-icon" v-if="player.active">person</span><span class="material-symbols-outlined connected-icon off" v-else>person_off</span>{{player.userid}}<span v-if="(player.userid === lobby.owner)" class="material-symbols-outlined owner-icon">star</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Join a Lobby</div>
      <div class="divider title-divider"></div>
      <form class="card-form" style="margin-bottom: 10%">
        <div class="card-form-group">
          <label for="join-name">Lobby Name</label>
          <input type="text" id="join-name" placeholder="lobby name" class="input" v-model="joinName" maxlength="36"
            @input="this.joinNameError = ''"
            :class="{'input-error': (joinNameError !== '')}"
          >
          <div class="card-form-error">{{joinNameError}}</div>
        </div>
        <div class="card-form-group">
          <label for="join-password">Password</label>
          <input type="text" id="join-password" placeholder="password (can be empty)" class="input" v-model="joinPassword"
            @input="this.joinPasswordError = ''"
            :class="{'input-error': (joinPasswordError !== '')}"
          >
          <div class="card-form-error">{{joinPasswordError}}</div>
        </div>
        <div class="card-form-group">
          <button @click.prevent="join()" type="submit" class="card-form-submit input">join</button>
          <div class="card-form-error" :class="{'card-form-submit-success': (joinServerError === 'Joined lobby!')}">{{joinServerError}}</div>
        </div>
      </form>
      <div class="card-title">Create a Lobby</div>
      <div class="divider title-divider"></div>
      <form class="card-form">
        <div class="card-form-group">
          <label for="create-name">Lobby Name</label>
          <input type="text" id="create-name" placeholder="lobby name" class="input" v-model="createName" maxlength="36"
            @input="this.createNameError = ''"
            :class="{'input-error': (createNameError !== '')}"
          >
          <div class="card-form-error">{{createNameError}}</div>
        </div>
        <div class="card-form-group">
          <label for="create-password">Password</label>
          <input type="text" id="create-password" placeholder="password (optional)" class="input" v-model="createPassword"
            @input="this.createPasswordError = ''"
            :class="{'input-error': (createPasswordError !== '')}"
          >
          <div class="card-form-error">{{createPasswordError}}</div>
        </div>
        <div class="card-form-group">
          <button @click.prevent="create()" type="submit" class="card-form-submit input">create</button>
          <div class="card-form-error"  :class="{'card-form-submit-success': createServerError === 'Created lobby!'}">{{createServerError}}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import AuthenticationService from '../services/AuthenticationService';
  import store from '../store';
  export default {
    setup() {
      let lobby = store.lobby;
      let userid = store.userid;
      return { lobby, userid };
    },
    data() {
      return {
        lobbyTitle: 'Not connected',
        joinName: '',
        joinNameError: '',
        joinPassword: '',
        joinPasswordError: '',
        joinServerError: '',
        createName: '',
        createNameError: '',
        createPassword: '',
        createPasswordError: '',
        createServerError: '',
      };
    },
    mounted() {
      this.createName = this.userid === '' ? '' : `${this.userid}'${['s', 'x', 'z'].includes(this.userid.charAt(this.userid.length - 1)) ? '' : 's'} Game`
    },
    methods: {
      async join() {
        this.joinNameError = '';
        this.joinPasswordError = '';
        this.joinServerError = '';
        this.createNameError = '';
        this.createPasswordError = '';
        this.createServerError = '';
        await this.$updateSession();
        if (!this.$isLoggedIn()) {
          this.$router.push('/login?from=/lobby');
          return;
        }
        if (this.joinName === '') {
          this.joinNameError = 'Can\'t be empty'
          return;
        }
        this.$joinLobby(this.joinName, this.joinPassword, errorCode => {
          switch (errorCode) {
            case 0:
              this.$updateSession();
              this.$router.push('/login?from=/lobby');
              break;
            case 2:
              this.joinNameError = 'Lobby doesn\'t exist';
              break;
            case 3:
              this.joinPasswordError = 'Wrong password';
              break;
            case 4:
              this.joinServerError = 'You are already in a lobby';
              break;
            default:
              this.joinServerError = 'Joined lobby!';

          }
        });
      },
      async create() {
        this.joinNameError = '';
        this.joinPasswordError = '';
        this.joinServerError = '';
        this.createNameError = '';
        this.createPasswordError = '';
        this.createServerError = '';
        await this.$updateSession();
        if (!this.$isLoggedIn()) {
          this.$router.push('/login?from=/lobby');
          return;
        }
        AuthenticationService.createLobby({
          name: this.createName,
          password: this.createPassword
        }).then(res => {
          switch (res.data.errorCode) {
            case 2:
              this.createServerError = 'You are already in a lobby';
              break;
            case 3:
              this.createNameError = 'Can\'t be empty';
              break;
            case 4:
              this.createNameError = 'Max-length: 36';
              break;
            case 5:
              this.createNameError = 'Lobby already exists';
              break;
            case 1:
              this.$joinLobby(this.createName, this.createPassword, (errorCode) => {
                if (errorCode === 0) {
                  this.$updateSession();
                  this.$router.push('/login?from=/lobby');
                }
                else if (errorCode !== 1) {
                  this.createServerError = 'Couldn\'t join lobby';
                }
                else
                  this.createServerError = 'Created lobby!';
              });

          }
        }).catch(err => {
          this.createServerError = 'Something went wrong';
          console.error(err);
        });
      }
    }
  }
</script>

<style scoped>
  @import '../assets/styles/form.css';
  .main {
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 130%;
    margin-top: 2%;
  }

  .card {
    margin-left: 0;
  }

  .card-title {
    font-size: 1.7rem;
  }

  .card-form {
    width: 100%;
  }

  .card-form-group {
    margin-bottom: 5%;
  }

  .input {
    width: 70%;
  }

  .card-form-submit {
    margin-top: 3%;
  }

  .lobby {
    width: 30%;
    margin: 0 3%;
    padding: 3% 5%;
    padding-bottom: 3%;
    background: var(--color-background-soft);
  }

  .lobby-header{
    display: flex;
    flex-direction: row;
    margin-bottom: 10%;
    max-width: 100%;
  }

  .lobby-title {
    font-weight: bold;
    overflow-wrap: anywhere;
    margin-right: 1%;
  }

  .leave-icon {
    margin-left: auto;
    margin-top: .2rem;
    cursor: pointer;
    transition: .2s ease;
  }

  .leave-icon:hover {
    color: var(--red)
  }

  .lobby-players {
    font-size: 1rem;
  }

  .lobby-players-player {
    display: flex;
    flex-direction: row;
    word-break: break-all;
  }

  .owner-icon {
    font-size: 1rem;
    margin-left: .3rem;
    margin-top: -.15rem;
    color: gold;
    align-self: center;
  }

  .connected-icon {
    position: absolute;
    left: -15%;
    font-size: 1.4rem;
    color: var(--success);
    opacity: .6;
  }

  .off {
    color: var(--error);
  }
</style>