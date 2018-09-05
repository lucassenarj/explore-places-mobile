import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://10.0.2.2:3333/',
  baseURL: 'https://explore-places-serve.herokuapp.com/',
});

export default api;