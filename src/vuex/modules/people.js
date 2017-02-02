import * as types from '../mutation-types'

// initial state
const state = {
  'list': []
}

// mutations
const mutations = {
  [types.LOAD_PEOPLE] (state, { list }) {
    state.list = list
  }
}

export default {
  state,
  mutations
}
