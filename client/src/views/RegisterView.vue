<template>
  <div class="card">
    <div class="card-group">
      <div class="card-title">Register</div>
      <div class="redirect" @click="this.$router.push('/login')">Login<span class="material-symbols-outlined redirect-arrow">arrow_right</span></div>
    </div>
    <div class="divider title-divider"></div>
    <form action="/login/register" method="post" class="card-form">
      <div class="card-form-group">
        <label for="username">Username</label>
        <input type="text" id="username" placeholder="username" class="input" v-model="username"
          @input="this.usernameError = ''"
          :class="{'input-error': (usernameError !== '')}"
        >
        <div class="card-form-error" id="username-error">{{usernameError}}</div>
      </div>
      <div class="card-form-group">
        <label for="email">E-Mail</label>
        <input type="text" id="email" placeholder="email" class="input" v-model="email"
          @input="this.emailError = ''"
          :class="{'input-error': (emailError !== '')}"
        >
        <div class="card-form-error" id="email-error">{{emailError}}</div>
      </div>
      <div class="card-form-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="password" class="input" v-model="password"
          @input="this.passwordError = ''"
          :class="{'input-error': (passwordError !== '')}"
        >
        <div class="card-form-error" id="password-error">{{passwordError}}</div>
      </div>
      <div class="card-form-group">
        <label for="repeatpassword">Repeat Password</label>
        <input type="password" id="repeatpassword" placeholder="repeat password" class="input" v-model="repeatPassword"
          @input="this.repeatPasswordError = ''"
          :class="{'input-error': (repeatPasswordError !== '')}"
        >
        <div class="card-form-error" id="repeatpassword-error">{{repeatPasswordError}}</div>
      </div>
      <div class="card-form-group">
        <button @click.prevent="register()" :class="{'card-form-submit-success': success}" ref="submit" type="submit" class="card-form-submit input">register</button>
        <div class="card-form-error">{{databaseError}}</div>
      </div>
    </form>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      repeatPasswordError: '',
      databaseError: '',
      success: false
    }
  },
  methods: {
    async register() {
      this.databaseError = '';
      this.$refs.submit.disabled = true;
      await AuthenticationService.register({
        username: this.username,
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      }).then(res => {
        let errorCode = res.data.errorCode;
        if (errorCode !== 1) {
          this.$refs.submit.disabled = false;
          if (res.data.errorCode === 0) {
            this.databaseError = 'Something went wrong';
            return;
          }
          if (errorCode % 2 === 0) this.usernameError = 'Can\'t be empty';
          if (errorCode % 11 === 0) this.emailError = 'Enter a valid email';
          if (errorCode % 3 === 0) this.emailError = 'Can\'t be empty';
          if (errorCode % 5 === 0) this.passwordError = 'Can\'t be empty';
          if (errorCode % 7 === 0) this.repeatPasswordError = 'Passwords don\'t match';
          if (errorCode % 13 === 0) this.usernameError = 'Username already exists';
          if (errorCode % 17 === 0) this.emailError = 'Email is already registered';
          return;
        }
        this.success = true;
        this.$router.push('/login');
      }).catch(err => {
        this.databaseError = 'Something went wrong';
        console.error(err);
      });
    }
  }
}
</script>

<style scoped>
  @import '../assets/styles/form.css';
  .card {
    margin-top: 8%;
  }
</style>