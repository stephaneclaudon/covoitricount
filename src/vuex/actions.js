// app
import * as types from './mutation-types'
import * as db from '../db/firebase'
import moment from 'moment'
import _ from 'lodash'

import peopleLoader from '../data/peopleLoader'

// ------------------------------------------------------------------------------------
// loadConfig
// load config object
// ------------------------------------------------------------------------------------
export const loadConfig = ({commit, state}) => {
  commit(types.LOADING, 'loadConfig')
  db.dbConfigRef.once('value', function (xsnapshot) {
    let config = xsnapshot.val()
    commit(types.LOAD_CONFIG, { config })
  })
}

// ------------------------------------------------------------------------------------
// loadPeople
// loads the list of people
// ------------------------------------------------------------------------------------
export const loadPeople = ({commit, state}) => {
  if (!state.people.list || state.people.list.length === 0) {
    commit(types.LOADING, 'people')
    peopleLoader.loadPeopleData()
      .then((data) => {
        let list = data
        commit(types.LOAD_PEOPLE, { list })
      })
      .catch((error) => {
        commit(types.LOAD_PEOPLE_ERROR, { error })
      })
  }
}

// ------------------------------------------------------------------------------------
// loadNewPath
// creates a new empty path object
// ------------------------------------------------------------------------------------
export const loadNewPath = ({commit, state}) => {
  commit(types.LOADING, 'newPath')
  let newPath = {}
  newPath.date = moment().format('YYYY-MM-DD')
  newPath.driver = null
  newPath.passengers = []
  newPath.outward = false
  newPath.return = false
  commit(types.LOAD_NEW_PATH, { newPath })
}

// ------------------------------------------------------------------------------------
// savePath
// saves path to database
// ------------------------------------------------------------------------------------
export const savePath = ({commit, state}, path) => {
  commit(types.LOADING, 'savePath')
  db.dbPathsRef.push(path)
  commit(types.SAVE_PATH, { path })
}

// ------------------------------------------------------------------------------------
// loadPathList
// load all paths
// ------------------------------------------------------------------------------------
export const loadPathList = ({commit, state}) => {
  commit(types.LOADING, 'loadPathList')
  db.dbPathsRef.once('value', function (xsnapshot) {
    let pathList = xsnapshot.val()
    _.forEach(pathList, (path, key) => {
      let driver = _.find(state.people.list, {id: path.driver})
      path.driverName = driver.name
      path.id = key
    })
    commit(types.LOAD_PATH_LIST, { pathList })
  })
}
