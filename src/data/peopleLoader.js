import people from './people.json'

module.exports = {
  loadPeopleData () {
    return new Promise((resolve, reject) => {
      resolve(people)
    })
  }
}
