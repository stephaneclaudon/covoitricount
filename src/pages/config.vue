<template>
  <div id="config-page" class="config-page container">
    <div class="row">
      <div class="col-xs-12">
        <h2>App :</h2>
      </div>
      <div class="col-xs-12">
        <label for="covoit-name">Nom du covoit : </label>
        <input type="text" name="covoit-name" value="" v-model="config.covoitName">
      </div>
      <div class="col-xs-12">
        <label for="path-cost">Coût du trajet : </label>
        <input type="text" name="path-cost" value="" v-model="config.pathCost">
      </div>
      <div class="col-xs-12">
        <button type="button" class="btn primary" name="button" @click="submit()">Enregistrer</button>
      </div>
    </div>


    <div class="row">
      <div class="col-xs-12">
        <h2>Personnes :</h2>
        <li class="" v-for="guy in peopleList" >
          <router-link :to="{name: 'people', params: { id: guy['.key'] }}"><span>{{ guy.name }}</span></router-link>
        </li>
      </div>
      <div class="col-xs-12">
        <router-link class="btn primary" :to="{name: 'people', params: { id: 'new' }}">Ajouter une personne</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
import * as firebase from '../db/firebase'

export default {
  name: 'config',
  data: function () {
    return {
      config: {
        pathCost: '',
        covoitName: ''
      }
    }
  },
  watch: {
    configList: function () {
      this.config = _.clone(this.configList)
      delete this.config['.key']
    }
  },
  firebase: {
    configList: {
      source: firebase.dbConfigRef,
      asObject: true
    },
    peopleList: firebase.dbPeopleRef.orderByChild('name')
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    submit () {
      firebase.dbConfigRef.update(this.config).then(result => {
        this.$store.dispatch('loadConfig')
        this.$router.push({name: 'home'})
      })
    }
  }
}
</script>

<style lang="scss">
</style>
