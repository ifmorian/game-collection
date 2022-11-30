import Api from './Api';

export default {
  register(credentials) {
    return Api().post('login/register', credentials);
  },
  login(credentials) {
    return Api().post('login/login', credentials);
  }
}