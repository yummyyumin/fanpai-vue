import Vue from 'vue'
import Vuex from 'vuex'

import act from './modules/actInfo'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    act
  }

})