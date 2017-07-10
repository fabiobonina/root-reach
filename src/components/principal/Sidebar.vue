<template>
  <div>
    <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" light>
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon dark @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list>
          <v-list-item>
            <router-link to="/">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>home</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </router-link>
          </v-list-item>
          <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
            <v-list-tile slot="item">
              <v-list-tile-action>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-item v-for="subItem in item.items" v-bind:key="subItem.title">
              <router-link :to="'/'+ subItem.router">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>{{ subItem.action }}</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </router-link>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-flex>
    </v-navigation-drawer>
    <v-toolbar class="green" dark>
    <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :href="'#/clientes'">Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
      <v-btn flat>Link Three</v-btn>
    </v-toolbar-items>
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
          { action: 'build',
            title: 'OS',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'code',
            title: 'Configuração',
            active: true,
            items: [
              { title: 'Clientes', router: 'clientes' },
              { title: 'Localidades', router: 'localidades' },
              { title: 'Usuarios', router: 'usuarios' },
              { title: 'Bens', router: 'bens' },
              { title: 'Configuração', router: 'config' }
            ]
          }],
        mini: false,
        right: null
      }
    },
    methods: {
    }
}

</script>

<style scoped>

</style>