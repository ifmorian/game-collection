<template>
  <div class="nav">
    <a @click="this.$router.push('/login')">Login</a>
    <a @click="logout()" v-if="loggedIn">Logout</a>
    <a href="/profile" v-if="loggedIn">Profile</a>
  </div>
</template>

<script>
import Api from '../services/Api';
export default {
  data() {
    return {
      loggedIn: false
    }
  },
  methods: {
    login() {
      this.loggedIn = true;
    },
    logout() {
      this.loggedIn = false;
    }
  },
  // async created() {
  //   await Api().post('/login/isloggedin');
  // }
}
</script>

<style scoped>
  .nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    width: 20%;
    height: 100%;

    font-size: 1.4em;
  }

  a {
    margin-left: 2em;
    cursor: pointer;
  }
</style>