<template>
  <div id="app">
    <div class="header container">
      <div class="row flex-items-xs-middle">
        <div class="col-xs-8 offset-xs-2 title">
          <router-link to="/">
            <h1> {{ config.covoitName }}</h1>
          </router-link>
        </div>
        <div class="col-xs-2 settings">
          <router-link to="/config">
            <i class="fa fa-cog" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions([
      'loadConfig',
      'loadPeople'
    ])
  },
  computed: {
    ...mapGetters([
      'config'
    ])
  },
  beforeCreate () {
    this.$store.dispatch('loadConfig')
    this.$store.dispatch('loadPeople')
  }
}
</script>

<style lang="scss">
@import 'sass/main.scss';

#app {
  .title {
    text-transform: uppercase;
  }
  .settings {
    text-align: right;
    .fa {
      font-size: 2em;
      color: $grey;
    }
  }
}
</style>
