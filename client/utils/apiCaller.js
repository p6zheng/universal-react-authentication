import axios from 'axios';
import config from '../../server/config';
const API_URL = `http://${config.server.host}:${config.server.port}/`;

export default function callApi(endpoint, method = 'get', data) {
  return axios({
    method,
    url: API_URL + endpoint,
    data
  });
}
