<template>
    <body id="demo">
        <sidebar></sidebar>
        <main>
            <v-container fluid>
                <div class="title">Click on sidebar to re-open.</div>
                    <!--v-router-->
                    <!-- component template -->
                    <!-- demo root element -->
                    <div>
                        <v-card>
                            <v-card-title>
                                Clientes
                                <v-spacer></v-spacer>
                                <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchQuery"></v-text-field>
                            </v-card-title>
                            <demogrid
                                :data="gridData"
                                :columns="gridColumns"
                                :filter-key="searchQuery">
                            </demogrid>
                        </v-card>
                    </div>

                    <div id="app">
                        <button id="show-modal" @click="showModalAdd = true">Show Modal</button>
                        <!-- use the modal component, pass in the prop -->
                        <modal v-if="showModalAdd" @atualizar="itemNovo" @close="showModalAdd = false">
                            <!--
                            you can use custom content here to overwrite
                            default content
                            -->
                            <h3 slot="header">custom header</h3>
                        </modal>
                    </div>
                    <pre>{{ $data }}</pre>
            </v-container>
        </main>


        </body>

</template>

<script>

import Sidebar from '../components/principal/Sidebar1'
import Demogrid from '../components/principal/Demogrid'
import Modal from '../components/cliente/add'

export default {
    // bootstrap the demo
    //name: '#demo',
    components: { Sidebar, Demogrid, Modal },
    data () {
        return {
            searchQuery: '',
            gridColumns: ['fantasia', 'nome', 'seguimento'],
            gridData: [],
            showModalAdd: false
        }
    },
    mounted: function(){
        console.log("bonina");
        this.getAllItems();
    },
    methods: {
        getAllItems: function(){
            this.$store.state.recaregarClientes(this, 'gridData')
        },

        itemNovo: function(){
            this.$store.state.recaregarClientes(this, 'gridData'),
            this.showModalAdd = false,
            console.log('teste')
        }
    }

}
</script>

<style scoped>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

</style>