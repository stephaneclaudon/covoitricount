import moment from 'moment'
import _ from 'lodash'

export function date (val, format) {
  return val ? moment(val, format).format('ddd DD/MM/YY') : '-'
}

export function peopleName (driverId, peopleList) {
  let driver = _.find(peopleList, {'.key': driverId})
  return driver ? driver.name : ''
}

export function round (val) {
  let sign = (val < 0) ? -1 : 1
  val = Math.abs(val)
  val = Math.floor(val * 100)
  val = (val % 5 === 0) ? val : val - val % 5 + 5
  val = val * sign
  return (val * 0.01).toFixed(2)
}
