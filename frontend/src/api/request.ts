import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  headers: { Accept: '*/*' },
});

export default request;
