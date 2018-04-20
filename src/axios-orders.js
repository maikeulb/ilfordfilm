import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ilford-61890.firebaseio.com/'
});

export default instance;
