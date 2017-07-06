<template>
    <div>
        <sidebar></sidebar>
        <main>
            <v-container fluid>
                <div class="title">Click on sidebar to re-open.</div>
                    <div>
                        <v-card>
                            <v-card-title>
                                {{ title }}
                                <v-spacer></v-spacer>
                                <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchQuery"></v-text-field>
                                <v-btn floating small class="indigo" @click.native="showModalAdd = true"><v-icon light>add</v-icon></v-btn>
                            </v-card-title>
                            <demogrid :data="gridData">
                            </demogrid>
                        </v-card>
                    </div>

                    <div>
                        <!-- use the modal component, pass in the prop -->
                        <modal-add v-if="showModalAdd" @atualizar="itemModal" @close="showModalAdd = false"></modal-add>
                        <modal-edt v-if="showModalEdt" @atualizar="itemModal" @close="showModalEdt = false"></modal-edt>
                        <modal-del v-if="showModalDel" @atualizar="itemModal" @close="showModalDel = false"></modal-del>
                    </div>
                    <pre>{{ $data }}</pre>
            </v-container>
        </main>
    </div>

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
            title: 'Clientes',
            searchQuery: '',
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

<style>
</style>