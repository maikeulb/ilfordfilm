import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ilfordfilms.firebaseio.com/'
});

export default instance;
