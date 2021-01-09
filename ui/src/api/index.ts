import axios from 'axios'

import Config from '../config'

const AppAPI = {
  async loadInitialData() {
    return axios.get(`${Config.env.baseURL}/words.json`)
  },
}

export default AppAPI
