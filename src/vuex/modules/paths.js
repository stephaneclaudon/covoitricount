import * as types from '../mutation-types'

// initial state
const state = {
  'newPath': null,
  'currentPath': null,
  'list': []
}

// mutations
const mutations = {
  [types.LOAD_NEW_PATH] (state, { newPath }) {
    state.newPath = newPath
  },
  [types.SAVE_PATH] (state, { path }) {
    console.log('todo mutation save path..')
  },
  [types.LOAD_PATH_LIST] (state, { pathList }) {
    state.list = pathList
  },
  [types.LOAD_PATH] (state, { currentPath }) {
    state.currentPath = currentPath
  }
}

export default {
  state,
  mutations
}
