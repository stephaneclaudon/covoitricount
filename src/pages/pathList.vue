<template>
  <div id="list-page" class="list-page wrapper">
    <h2>Liste des trajets</h2>
    <div class="container">
      <div v-for="path in daysArray" @click="editPath(path['.key'])" class="row path flex-items-xs-middle" :class="{'weekend': path.isWeekEnd, 'filled': path.driver}">
        <div class="col-xs-2 path_date">
          {{ path.date | dateFilter }}
        </div>
        <div class="col-xs-2 path_driver">
          {{ path.driver | peopleNameFilter(peopleList) }}
        </div>
        <div class="col-xs-6 path_passengers">
          <span v-if="path.passengers" v-for="passenger in path.passengers">
            {{ passenger | peopleNameFilter(peopleList) }},
          </span>
        </div>
        <div class="col-xs-2 path_directions">
          <span v-if="path.driver" class="outward fa fa-arrow-right" aria-hidden="true" :class="{'active': path.outward}"></span>
          <span v-if="path.driver" class="return fa fa-arrow-left" aria-hidden="true" :class="{'active': path.return}"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'
import moment from 'moment'
import _ from 'lodash'
import { date as dateFilter, peopleName as peopleNameFilter } from '../utils/filters.js'

export default {
  name: 'list',
  filters: {
    dateFilter,
    peopleNameFilter
  },
  data () {
    return {
      displayedPaths: 0,
      firstPathDate: null,
      lastPathDate: null,
      daysArray: []
    }
  },
  watch: {
    pathList: function (list) {
      this.firstPathDate = _.first(list).date
      this.lastPathDate = _.last(list).date
      let currentIndex = 0
      let currentDate = moment(this.firstPathDate)
      while (currentDate <= this.lastPathDate) {
        if (_.nth(list, currentIndex).date === currentDate.valueOf()) {
          this.daysArray.push(_.nth(list, currentIndex))
          currentIndex = currentIndex + 1
        } else {
          this.daysArray.push({date: currentDate.valueOf(), isWeekEnd: (currentDate.day() % 6 === 0)})
        }
        currentDate = currentDate.add(1, 'days')
      }
    }
  },
  computed: {
    weekDays: function () {
      let days = moment.localeData()._weekdays.slice(1)
      days.pop()
      return days
    }
  },
  firebase: {
    pathList: firebase.dbPathsRef.orderByChild('date'),
    peopleList: firebase.dbPeopleRef.orderByChild('name')
  },
  methods: {
    editPath: function (pathId) {
      this.$router.push({name: 'edit', params: { id: pathId }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../sass/vars";

.path {
  height: 60px;
  background: #DDDDDD;
  border-bottom: solid 1px #888;
  &.weekend {
    background: #B4B4B4;
  }
  &.filled {
    background: #76B55F;
    color: $white;
  }
  &_date {
    text-align: left;
  }
  &_driver {

  }
}
</style>
