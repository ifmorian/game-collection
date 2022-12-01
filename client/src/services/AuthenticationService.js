import Api from './Api';

export default {
  register(credentials) {
    return Api().post('login/register', credentials);
  },
  login(credentials) {
    return Api().post('login/login', credentials);
  },
  checkLogin() {
    return Api().post('login/isloggedin');
  },
  logout() {
    return Api().post('login/logout');
  },
  createLobby(credentials) {
    return Api().post('lobby/create', credentials)
  }
}