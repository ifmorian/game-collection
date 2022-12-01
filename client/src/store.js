import { ref } from 'vue';

const userid = ref('');
const lobby = ref({
  name: 'Not connected',
  owner: '',
  players: []
});

export default { userid, lobby };