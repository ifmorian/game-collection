<template>
  <div class="nav">
    <li @click="this.$router.push('/login')" v-show="userid === ''" style="margin-left: auto">Login</li>
    <li @click="logout()" v-show="userid !== ''">Logout</li>
    <li @click="this.$joinLobby()" href="/profile" v-show="userid !== ''">Profile</li>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
import store from '../store';
export default {
  setup() {
    let userid = store.userid;
    return { userid };
  },
  data() {
    return {}
  },
  methods: {
    logout() {
      AuthenticationService.logout().then(res => {
        if (res.data) {
          store.userid.value = '';
          this.$leaveLobby();
        }
        else {
          console.error('Couldn\'t logout. Please try again')
        }
      });
    }
  }
}
</script>

<style scoped>
  @import '../assets/styles/nav-x.css';
  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 10em;
    height: 100%;

    font-size: 1.4em;
  }
</style>