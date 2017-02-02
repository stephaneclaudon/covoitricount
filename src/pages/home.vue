<template>
  <div id="home-page" class="home-page container">
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <router-link class="btn primary" to="/add">Nouveau trajet</router-link>
      </div>
      <div class="col-xs-12 col-sm-6">
        <router-link class="btn primary" to="/list">Liste</router-link>
      </div>
      <div class="col-xs-12">
        <balance></balance>
      </div>
    </div>
  </div>
</template>

<script>
import PeopleSelector from '../components/peopleSelector'
import Balance from '../components/balance'

export default {
  name: 'add',
  components: {
    PeopleSelector,
    Balance
  },
  computed: {
  },
  mounted: function () {
    this.$nextTick(function () {
    })
  }
}
</script>

<style lang="scss">
</style>
