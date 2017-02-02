<template>
  <div class="people-selector">
    <ul>
      <li class="" v-for="guy in peopleList">
        <input v-if="multipleSelect" :disabled="guy['disabled']" type="checkbox" :value="guy['.key']" :id="getInputId(guy['.key'])" :name="getInputId(guy['.key'])" v-model="checkedPeople" v-on:change="onPeopleSelected" />
        <input v-else type="radio" :value="guy['.key']" :id="getInputId(guy['.key'])" :name="getInputId(guy['.key'])" v-model="checkedPeople" v-on:change="onPeopleSelected" />
        <label class="checkbox-label" :for="getInputId(guy['.key'])">{{ guy.name }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'people-selector',
  props: ['peopleList', 'multipleSelect', 'initialyChecked', 'selectorId'],
  data: function () {
    return { checkedPeople: this.initialyChecked }
  },
  watch: {
    initialyChecked: function () {
      this.checkedPeople = this.initialyChecked
    }
  },
  methods: {
    onPeopleSelected () {
      this.$emit('input', this.checkedPeople)
    },
    getInputId (guyId) {
      return this.selectorId + guyId
    }
  }
}
</script>

<style scoped>

</style>
