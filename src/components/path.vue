<template>
  <div>
    <h1>Date</h1>
    <vue-date-picker class="vue-picker" :date="pathDate" :option="options"></vue-date-picker>

    <input type="checkbox" id="outward" name="outward" v-model="path.outward"/>
    <label class="checkbox-label" for="outward">Aller</label>
    <input type="checkbox" id="return" name="return" v-model="path.return"/>
    <label class="checkbox-label" for="return">Retour</label>

    <h1>Pilote</h1>
    <people-selector v-if="peopleList" :people-list="peopleList" selector-id="driverSelect" v-on:input="onDriverSelected(arguments[0])" :initialy-checked="path.driver"></people-selector>

    <h1>Passagers</h1>
    <people-selector v-if="peopleList" :people-list="passengersList" :multiple-select="true" selector-id="passengersSelect" v-on:input="path.passengers = arguments[0]" :initialy-checked="path.passengers"></people-selector>

    <button type="button" name="button" @click="cancel()">Annuler</button>
    <button type="button" name="button" @click="remove()">Supprimer</button>
    <button type="button" name="button" @click="submit()">Enregistrer</button>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'
import _ from 'lodash'
import moment from 'moment'
import vueDatePicker from 'vue-datepicker'
import peopleSelector from '../components/peopleSelector'

export default {
  props: [
    'path'
  ],
  components: {
    peopleSelector,
    vueDatePicker
  },
  data () {
    return {
      options: {
        type: 'day',
        week: moment.localeData()._weekdaysMin.slice(1).concat(moment.localeData()._weekdaysMin[0]),
        month: moment.localeData()._months,
        format: 'YYYY-MM-DD',
        placeholder: 'quand ?',
        color: {
          header: '#888',
          headerText: '#fff'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Annuler'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      }
    }
  },
  computed: {
    pathDate: function () {
      return {time: moment(this.path.date).format('YYYY-MM-DD')}
    },
    passengersList: function () {
      let passengers = _.clone(this.peopleList)
      let currentDriver = _.find(passengers, {'.key': this.path.driver})
      if (currentDriver) {
        currentDriver.disabled = true
      }
      // add passenger
      return passengers
    }
  },
  firebase: {
    peopleList: firebase.dbPeopleRef.orderByChild('name')
  },
  methods: {
    onDriverSelected (driver) {
      this.path.driver = driver
    },
    cancel () {
      this.$router.go(-1)
    },
    submit () {
      if (this.validate()) {
        this.path.date = moment(this.pathDate.time).valueOf()
        let clone = _.clone(this.path)
        delete clone['.key']
        if (this.path['.key']) {
          firebase.dbPathsRef.child(this.path['.key']).update(clone).then(result => this.$router.push({name: 'list'}))
        } else {
          firebase.dbPathsRef.push(this.path).then(result => this.$router.push({name: 'list'}))
        }
      }
    },
    remove () {
      let confirmation = window.confirm('Fais pas le con Philippe ! t\'es sûr ?')
      if (confirmation) {
        firebase.dbPathsRef.child(this.path['.key']).remove().then(result => this.$router.push({name: 'list'}))
      }
    },
    validate () {
      return (this.path.outward || this.path.return) &&
      this.path.driver &&
      this.path.passengers &&
      this.path.passengers.length > 0 &&
      this.path.date
    }
  }
}
</script>

<style lang="scss">
</style>
