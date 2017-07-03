<template>
    <body id="demo">
        <sidebar></sidebar>
        <main>
            <v-container fluid>
                <div class="title">Click on sidebar to re-open.</div>
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
                        <modal-add v-if="showModalAdd" @atualizar="itemModal" @close="showModalAdd = false">
                            <!--
                            you can use custom content here to overwrite
                            default content
                            -->
                            <h3 slot="header">custom header</h3>
                        </modal-add>
                        <modal-edt v-if="showModalEdt" @atualizar="itemModal" @close="showModalEdt = false">
                            <h3 slot="header">custom header</h3>
                        </modal-edt>
                        <modal-del v-if="showModalDel" @atualizar="itemModal" @close="showModalDel = false">
                            <h3 slot="header">custom header</h3>
                        </modal-del>
                    </div>
                    <pre>{{ $data }}</pre>
            </v-container>
        </main>
    </body>

</template>

<script>

import Sidebar from '../components/principal/Sidebar'
import Demogrid from '../components/principal/Demogrid'
import ModalAdd from '../components/cliente/add'
import ModalEdt from '../components/cliente/edt'
import ModalDel from '../components/cliente/del'

export default {
    // bootstrap the demo
    //name: '#demo',
    components: { Sidebar, Demogrid, ModalAdd, ModalEdt, ModalDel },
    data () {
        return {
            searchQuery: '',
            gridColumns: ['fantasia', 'nome', 'seguimento'],
            gridData: [],
            showModalAdd: false,
            showModalEdt: false,
            showModalDel: false
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
        itemModal: function(){
            this.$store.state.recaregarClientes(this, 'gridData'),
            this.showModalAdd = false,
            this.showModalEdt = false,
            this.showModalDel = false,
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