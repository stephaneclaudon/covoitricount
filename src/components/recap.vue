<template>
  <div id="recap" class="wrapper">
    <h2>Recap</h2>
    <div class="">

    </div>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'
import moment from 'moment'
import _ from 'lodash'
import { date as dateFilter, peopleName as peopleNameFilter } from '../utils/filters.js'
import { mapGetters } from 'vuex'

export default {
  name: 'list',
  filters: {
  },
  data () {
    return {

    }
  },
  watch: {
    pathList: function (list) {
      console.log(list)
    }
  },
  computed: {
    ...mapGetters([
      'peopleList'
    ]),
    weekDays: function () {
      let days = moment.localeData()._weekdays.slice(1)
      days.pop()
      return days
    }
  },
  firebase: {
    pathList: firebase.dbPathsRef.orderByChild('date')
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
