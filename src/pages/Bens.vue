<template>
    <v-app standalone>
        <sidebar></sidebar>
        <main>
            <v-container fluid>
                <v-card>
                    <v-card-title>{{ title }}<v-spacer></v-spacer>
                        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
                        <v-btn icon dark class="indigo" @click.native="showModalAdd = true"><v-icon dark>add</v-icon></v-btn>
                    </v-card-title>
                    <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search">
                        <template slot="items" scope="props">
                            <td>{{ props.item.fantasia }}</td>
                            <td>{{ props.item.nome }}</td>
                            <td>{{ props.item.seguimento }}</td>
                            <td>
                                <router-link :to="'/'+ props.item.type +'/' + props.item._id"><v-btn icon dark class="green"><v-icon light>visibility</v-icon></v-btn></router-link>
                                <v-btn icon dark class="blue" @click.native="showModalEdt = true; selecItem(props.item)"><v-icon light>edit</v-icon></v-btn>
                                <v-btn icon dark class="red" @click.native="showModalDel = true; selecItem(props.item)"><v-icon light>delete</v-icon></v-btn>
                            </td>
                        </template>
                        <template slot="pageText" scope="{ pageStart, pageStop }">
                            From {{ pageStart }} to {{ pageStop }}
                        </template>
                    </v-data-table>
                    <pre>{{ $data }}</pre>
                    <div id="app">
                        <!-- use the modal component, pass in the prop -->
                        <modal-add @close="showModalAdd = false" @atualizar="itemModal" v-if="showModalAdd"  ></modal-add>
                        <modal-edt @close="showModalEdt = false" @atualizar="itemModal" v-if="showModalEdt" :data="modalItem"></modal-edt>
                        <modal-del @close="showModalDel = false" @atualizar="itemModal" v-if="showModalDel"  :data="modalItem"></modal-del>
                    </div>
                </v-card>
            </v-container>
        </main>
    </v-app>
</template>

<script>

import Sidebar from '../components/principal/Sidebar'
import ModalAdd from '../components/bem/_add'
import ModalEdt from '../components/bem/_edt'
import ModalDel from '../components/bem/_del'
export default {
    //nome: '#user',
    components: { Sidebar, ModalAdd, ModalEdt, ModalDel },
    data () {
        return {
        title: 'Bens',
        showModalAdd: false, showModalEdt: false, showModalDel: false,
        errorMessage: '', successMessage: '',
        modalItem: {},
        search: '',
        pagination: {},
        headers: [
            { text: 'Nome Fantasia', left: true, value: 'fantasia' },
            { text: 'Nome', value: 'nome'},
            { text: 'Seguimento', value: 'seguimento' },
            { text: 'Ação', value: 'acao' }
        ],
        items: []
        }
    },
    mounted: function(){
        console.log("bonina");
        this.getAllUsers();
    },
    methods: {
        getAllUsers: function(){
            this.$store.state.recaregarBens(this, 'items')
        },
        itemModal: function(){
            this.$store.state.recaregarBens(this, 'items'),
            this.showModalAdd = false,
            this.showModalEdt = false,
            this.showModalDel = false,
            console.log('teste')
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
    },
}

</script>

<style scoped>
p.successMessage{
    background: #D8EFC2;
    color: #097133;
    border-left: 5px solid #097133;
    padding: 9px;
    margin: 22px 0;
}
p.errorMessage{
    background: #EFCBC2;
    color: #D71517;
    border-left: 5px solid #DA1527;
    padding: 9px;
    margin: 22px 0;
}
</style>