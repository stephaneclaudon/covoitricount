import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire)

export const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyDIAki7QUwQi0mqbfFZ-Ee78rNaFepXl9o',
  authDomain: 'coivoitricount.firebaseapp.com',
  databaseURL: 'https://coivoitricount.firebaseio.com',
  storageBucket: 'coivoitricount.appspot.com',
  messagingSenderId: '349547454965'
})

export const firebaseDB = firebaseApp.database()

export const dbConfigRef = firebaseApp.database().ref('config')
export const dbPathsRef = firebaseApp.database().ref('paths')
export const dbPeopleRef = firebaseApp.database().ref('people')
