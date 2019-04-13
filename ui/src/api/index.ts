import axios from 'axios';

import Config from '../config';

const getAuthToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};

const AppAPI = {

  async authenticate() {
    return axios
      .post(Config.env.baseURL + '/auth');
  },

  async loadInitialData() {
    return axios
      .get(`${Config.env.baseURL}/words`, { headers: { Authorization: getAuthToken() } });
  }

};

export default AppAPI;
