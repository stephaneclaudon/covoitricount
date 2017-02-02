import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import people from './modules/people'
import paths from './modules/paths'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    app,
    people,
    paths
  }
})
