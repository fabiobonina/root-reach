<template>
  <main>
    <v-container fluid>        
      <div>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-title>{{ title }}<v-spacer></v-spacer>
                  <v-text-field append-icon="search" label="Search" single-line hide-details v-model="filterKey"></v-text-field>
                  <v-btn icon class="indigo" @click.native="showModalAdd = true"><v-icon light>add</v-icon></v-btn>
              </v-card-title>
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
                          <v-btn icon dark class="blue" @click.native="showModalEdt = true; selecItem(item)">
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
            </v-card>
          </v-flex>
        </v-layout>
       
        <div id="app">
            <!-- use the modal component, pass in the prop -->
            <modal-add @close="showModalAdd = false" @atualizar="itemModal" v-if="showModalAdd" :data="cliente"></modal-add>
            <modal-edt @close="showModalEdt = false" @atualizar="itemModal" v-if="showModalEdt" :data="modalItem"></modal-edt>
            <modal-del @close="showModalDel = false" @atualizar="itemModal" v-if="showModalDel" :data="modalItem"></modal-del>
        </div>
      </div>
    </v-container>
  </main>
</template>

<script>
import ModalAdd from './_add'
import ModalEdt from './_edt'
import ModalDel from './_del'

export default {
  // register the grid component
  components: { ModalAdd, ModalEdt, ModalDel },
  nome: 'grid-template',
  props: {
  },
  data: function () {
    return {
      title: 'Grupos',
      showModalAdd: false, showModalEdt: false, showModalDel: false,
      modalItem: {},
      filterKey: '',
      data: [],
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
  beforeCreate: function() {
	    this.$store.state.recaregarGrupos(this, 'data')
  },
  methods: {
    getAllUsers: function(){
        this.$store.state.recaregarGrupos(this, 'data')
    },
    itemModal: function(){
        this.$store.state.recaregarGrupos(this, 'data'),
        this.showModalAdd = false,
        this.showModalEdt = false,
        this.showModalDel = false
    },
    selecItem: function(data){
        this.modalItem = data;
    },
    toFormData: function(obj){
        var form_data = new FormData();
            for ( var key in obj ){
                form_data.append(key, obj[key]);
            }
            return form_data;
    },
    clearMassege: function(){
        this.errorMessage = '';
        this.successMessage = '';
    }
  }
}
</script>

<style scoped>
</style>