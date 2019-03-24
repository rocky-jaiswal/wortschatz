import axios from 'axios';

import Config from '../config';

const AppAPI = {

  init() {
    return axios.create();
  },

  async loadInitialData() {
    return await AppAPI.init()
      .get(Config.env.baseURL + '/words');
  }

};

export default AppAPI;
