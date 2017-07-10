<template>
  <div>
    <v-list>
      <template v-for="(item, index) in items">
        <v-list-tile v-if="item.nome" v-bind:key="item">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
            <v-list-tile-action-text>{{ item.ativo }}</v-list-tile-action-text>
          </v-list-tile-content>
          <v-list-tile-action>              
          <v-menu bottom right>
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-btn icon dark class="blue" @click.native="$emit('edit'); selecItem(item)">
                  <v-icon light>edit</v-icon>
                </v-btn>
              </v-list-tile>
              <v-list-tile>
                <v-btn icon dark class="red" @click.native="showModalDel = true; selecItem(item)">
                  <v-icon light>delete</v-icon>
                </v-btn>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile-action>
        <v-divider v-if="index + 1 < items.length"></v-divider>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>

export default {
  // register the grid component
  nome: 'grid-template',
  props: {
    data: Array,
    filterKey: String
  },
  data: function () {
    return {
      title: 'Cliente'
    }
  },
  computed: {
    items: function () {
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
  methods: {
  }
}
</script>

<style scoped>
</style>