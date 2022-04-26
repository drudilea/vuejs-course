import axios from 'axios';

const journalApi = axios.create({
  baseURL: 'https://vue-demos-d49fd-default-rtdb.firebaseio.com/',
});

export default journalApi;
