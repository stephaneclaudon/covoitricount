<template>
  <div id="add-page" class="add-page">
    <h2>Editer un trajet</h2>
    <path-comp :path="currentPath" v-if="currentPath"></path-comp>
  </div>
</template>

<script>
import * as firebase from '../db/firebase'
import pathComp from '../components/path'

export default {
  name: 'edit',
  components: {
    pathComp
  },
  beforeCreate () {
    this.$bindAsObject('currentPath', firebase.firebaseDB.ref('paths/' + this.$route.params.id))
  }
}
</script>
<style lang="scss">
</style>
