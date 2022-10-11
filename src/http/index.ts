import axios from 'axios';
import { AUTH_TOKEN, SERVER_API_URL } from '../constants/api';

const $authHost = axios.create({
  baseURL: SERVER_API_URL,
  headers: {'X-Auth-Token': AUTH_TOKEN},
});

export {$authHost};
