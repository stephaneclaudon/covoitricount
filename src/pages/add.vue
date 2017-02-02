<template>
  <div id="add-page" class="add-page">
    <h2>Nouveau trajet</h2>
    <path-comp :path="newPath"></path-comp>
  </div>
</template>

<script>
import pathComp from '../components/path'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'add',
  components: {
    pathComp
  },
  methods: {
    ...mapActions([
      'loadNewPath'
    ])
  },
  computed: {
    ...mapGetters([
      'newPath'
    ])
  },
  beforeCreate () {
    this.$store.dispatch('loadNewPath')
  }
}
</script>

<style lang="scss">
</style>
