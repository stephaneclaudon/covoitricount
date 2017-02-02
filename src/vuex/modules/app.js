import * as types from '../mutation-types'

// initial state
const state = {
  loaded: false,
  config: []
}

// mutations
const mutations = {
  [types.LOADING] (state) {
    state.loaded = false
  },
  [types.LOADED] (state) {
    state.loaded = true
  },
  [types.LOAD_CONFIG] (state, { config }) {
    state.config = config
  }
}

export default {
  state,
  mutations
}
