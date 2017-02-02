<template>
  <div id="people-page">

    <div class="row">
      <div class="col-xs-12">
        <h1>Personne</h1>
      </div>
      <div class="col-xs-12">
      <label class="label" for="name">Nom</label>
        <input type="text" id="name" name="name" v-model="people.name"/>
      </div>
      <div class="col-xs-12 col-sm-4">
        <button class="btn primary" type="button" name="button" @click="cancel()">Annuler</button>
      </div>
      <div class="col-xs-12 col-sm-4">
        <button class="btn secondary" type="button" name="button" @click="remove()">Supprimer</button>
      </div>
      <div class="col-xs-12 col-sm-4">
        <button class="btn primary" type="button" name="button" @click="submit()">Enregistrer</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'
import _ from 'lodash'

export default {
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    submit () {
      if (this.validate()) {
        let clone = _.clone(this.people)
        delete clone['.key']
        if (this.people['.key']) {
          firebase.dbPeopleRef.child(this.people['.key']).update(clone).then(result => this.$router.push({name: 'config'}))
        } else {
          firebase.dbPeopleRef.push(this.people).then(result => this.$router.push({name: 'config'}))
        }
      }
    },
    remove () {
      let confirmation = window.confirm('Fais pas le con Philippe ! t\'es sûr ?')
      if (confirmation) {
        firebase.dbPeopleRef.child(this.people['.key']).remove().then(result => this.$router.push({name: 'config'}))
      }
    },
    validate () {
      return this.people.name.length > 3
    }
  },
  beforeCreate () {
    if (this.$route.params.id !== 'new') {
      this.$bindAsObject('people', firebase.firebaseDB.ref('people/' + this.$route.params.id))
    } else {
      this.people = { name: '' }
    }
  }
}
</script>

<style lang="scss">
</style>
