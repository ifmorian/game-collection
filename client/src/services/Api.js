import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    timeout: 1000
  });
}