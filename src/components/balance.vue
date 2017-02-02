<template>
  <div>
    <h1>Balance</h1>
    <!--
    <div class="row header">
      <div class="col-xs-3">
        Nom
      </div>
      <div class="col-xs-3">
        A payé
      </div>
      <div class="col-xs-3">
        Part
      </div>
      <div class="col-xs-3">
        Balance
      </div>
    </div>
    <div class="row" v-for="people in balances">
      <div class="col-xs-3">
        {{ people.name }}
      </div>
      <div class="col-xs-3">
        {{ people.credit | roundAmount }}
      </div>
      <div class="col-xs-3">
        {{ -people.originalDebit | roundAmount }}
      </div>
      <div class="col-xs-3">
        {{ people.originalBalance | roundAmount }}
      </div>
    </div>
    -->

    <div v-for="people in balances" v-if="people.owes.length > 0">
      <div class="row" v-for="owe in people.owes" v-if="owe.peopleId !== people['.key']">
        <div class="col-xs-4">
          {{ people.name }}
        </div>
        <div class="col-xs-4">
          paie à {{ owe.peopleName }}
        </div>
        <div class="col-xs-4">
          {{ owe.amount | roundAmount }} €
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'
import { mapGetters } from 'vuex'
import { round as roundAmount } from '../utils/filters.js'
import _ from 'lodash'

export default {
  filters: {
    roundAmount
  },
  data () {
    return {
      balances: []
    }
  },
  computed: {
    ...mapGetters([
      'config'
    ])
  },
  methods: {
    calculate: function () {
      if (this.pathList.length > 0 && this.peopleList.length > 0) {
        let pathCost = _.toNumber(this.config.pathCost)
        this.balances = _.clone(this.peopleList)

        // initialise attributes
        _.forEach(this.balances, people => {
          people.credit = 0.0
          people.debit = 0.0
          people.owes = []
        })

        // loop through paths to calculate expenses
        _.forEach(this.pathList, path => {
          let driver = _.find(this.balances, {'.key': path.driver})
          let pathValue = (path.outward && path.return) ? pathCost * 2 : pathCost
          driver.credit += pathValue

          // loop through passenger to calculate ownings
          let passengerCount = path.passengers.length + 1
          _.forEach(path.passengers, passengerId => {
            let passenger = _.find(this.balances, {'.key': passengerId})
            passenger.debit += _.toNumber((pathValue / passengerCount))
          })
          driver.debit += _.toNumber((pathValue / passengerCount))
        })

        _.forEach(this.balances, people => {
          people.originalDebit = people.debit
          people.balance = people.credit - people.debit
          people.originalBalance = people.balance
        })
        this.balances = _.reject(this.balances, people => { return people.credit === people.debit })

        // sort people by ownings
        let owers = _.clone(this.balances)
        owers = _.orderBy(owers, 'balance', 'asc')

        let payers = _.clone(this.balances)
        payers = _.orderBy(payers, 'balance', 'desc')
        _.forEach(owers, people => {
          let index = 100
          while (people.balance < 0 && index > 0) {
            let mostPayer = _.first(payers)
            let diff = ((mostPayer.balance + people.balance) < 0) ? mostPayer.balance : Math.abs(people.balance)
            people.balance += diff
            mostPayer.balance -= diff
            people.balance = (people.balance < -0.01) ? people.balance : 0
            people.owes.push({ 'peopleId': mostPayer['.key'], 'peopleName': mostPayer.name, 'amount': diff })
            payers = _.orderBy(payers, 'balance', 'desc')
            index = index - 1
          }
        })
      }
    }
  },
  watch: {
    pathList: function () {
      this.calculate()
    },
    peopleList: function () {
      this.calculate()
    }
  },
  firebase: {
    pathList: firebase.dbPathsRef.orderByChild('date'),
    peopleList: firebase.dbPeopleRef.orderByChild('name')
  }
}
</script>

<style lang="scss">
.header {
  font-weight: bold;
}
</style>
