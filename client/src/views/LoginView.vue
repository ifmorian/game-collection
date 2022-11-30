<template>
  <div class="card">
    <div class="card-title">Login</div>
    <div class="divider"></div>
    <form action="/login/login" method="post" class="card-form">
      <div class="card-form-group">
        <label for="username">Username</label>
        <input type="text" id="username" placeholder="username" class="input" v-model="username"
          @input="this.usernameError = ''"
          :class="{'input-error': (usernameError !== '')}"
        >
        <div class="card-form-error" id="username-error">{{usernameError}}</div>
      </div>
      <div class="card-form-group">
        <label for="password">Password</label>
        <input type="text" id="password" placeholder="password" class="input" v-model="password"
          @input="this.passwordError = ''"
          :class="{'input-error': (passwordError !== '')}"
        >
        <div class="card-form-error" id="password-error">{{passwordError}}</div>
      </div>
      <div class="card-form-group">
        <button @click.prevent="login()" type="submit" class="card-form-submit input">login</button>
        <div class="card-form-error">{{databaseError}}</div>
      </div>
    </form>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
import ValidationService from '../services/ValidationService';
import Api from '../services/Api'
export default {
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      databaseError: ''
    }
  },
  methods: {
    async login() {
      let errorCode = ValidationService.validateLogin({
        username: this.username,
        password: this.password
      });
      if (errorCode !== 1) {
        if (errorCode % 2 === 0) this.usernameError = 'Can\'t be empty';
        if (errorCode % 3 === 0) this.passwordError = 'Can\'t be empty';
        return;
      }
      AuthenticationService.login({
          username: this.username,
          password: this.password
        }).then(res => {
          if (res.data.errorCode !== 1) {
            if (res.data.errorCode === 0) {
              this.databaseError = 'Something went wrong';
              return;
            }
            if (res.data.errorCode % 2 === 0) this.usernameError = 'Credentials don\'t match an account';
            return;
          }
          this.$router.push('/');
          Api().post('/login/isloggedin');
        });
    }
  }
}
</script>

<style scoped>
@import '../assets/styles/form.css';
</style>