<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title class="white--text blue" dark>{{ title }}<v-spacer></v-spacer>
          <v-text-field append-icon="search" label="Search" single-line hide-details v-model.key="filterKey"></v-text-field>
        </v-card-title>
        <v-list two-line>
          <v-list-tile avatar ripple v-for="(item, index) in items" v-bind:key="item.title">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.fantasia }}</v-list-tile-title>
              <v-list-tile-sub-title class="grey--text text--darken-4">{{ item.nome }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ item.seguimento }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
              <v-icon class="grey--text text--lighten-1">star_border</v-icon>
            </v-list-tile-action>
            <v-divider v-if="index + 1 < items.length"></v-divider>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  // register the grid component
  nome: 'grid-template',
  props: {
    data: Array,
    columns: Array
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      title: 'Cliente',
      filterKey: ''
    }
  },
  computed: {
    items: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>