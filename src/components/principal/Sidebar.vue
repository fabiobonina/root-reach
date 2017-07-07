<template>
  <div>
    <v-navigation-drawer permanent floating light>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="green" dark>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
  </div>
</template>


<script>

export default {
    components: {
    },
    computed: {
    },
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
          { title: 'Clientes',icon: 'dashboard', router: 'clientes' },
          { title: 'Localidades', icon: 'dashboard', router: 'localidades' },
          { title: 'Usuarios', icon: 'dashboard', router: 'usuarios' },
          { title: 'Bens', icon: 'dashboard', router: 'bens' }
        ],
        right: null,
      }
    },
    methods: {
    }
}

</script>

<style scoped>

</style>