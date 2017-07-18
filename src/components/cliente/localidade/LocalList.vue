<template>
    <div>
        <main>
            <v-container fluid>
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-card>
                            <v-card-title class="white--text blue" dark>{{ title }}<v-spacer></v-spacer>
                            <v-text-field append-icon="search" label="Search" single-line hide-details v-model.key="filterKey"></v-text-field>
                            </v-card-title>
                            <v-list two-line>
                            <v-list-tile avatar ripple v-for="(item, index) in itemsFiltros" v-bind:key="item.title" :href="'#/'+item.type+'/' + item._id">
                                <v-list-tile-content>
                                <v-list-tile-title>{{ item.nome }}</v-list-tile-title>
                                <v-list-tile-sub-title class="grey--text text--darken-4">{{ item.municipio }}/ {{ item.uf }}</v-list-tile-sub-title>
                                <v-list-tile-sub-title>{{ item.seguimento }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                <v-list-tile-action-text>{{ item.tipo }}</v-list-tile-action-text>
                                <a v-if=" 1 < item.lat.length" :href="'https://maps.google.com/maps?q='+ item.lat + '%2C' + item.long" target="_blank"><v-icon class="blue--text text--lighten-1">near_me</v-icon></a>
                                <v-icon class="grey--text text--lighten-1" v-if=" 1 > item.lat.length" >location_off</v-icon>
                                </v-list-tile-action>
                                <v-divider v-if="index + 1 < items.length"></v-divider>
                            </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-flex>
                </v-layout>


                    <v-card-title>{{ title }}<v-spacer></v-spacer>
                        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
                        <v-btn floating small class="indigo" @click.native="showModalAdd = true"><v-icon light>add</v-icon></v-btn>
                    </v-card-title>
                    <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search">
                        <template slot="items" scope="props">
                            <td>{{ props.item.tipo }}</td>
                            <td>{{ props.item.nome }}</td>
                            <td>{{ props.item.municipio }}</td>
                            <td>{{ props.item.uf }}</td>
                            <td>
                                <router-link :to="'/'+ props.item.type +'/' + props.item._id"><v-btn floating small class="green"><v-icon light>visibility</v-icon></v-btn></router-link>
                                <v-btn floating small class="blue" @click.native="showModalEdt = true; selecItem(props.item)"><v-icon light>edit</v-icon></v-btn>
                                <v-btn floating small class="red" @click.native="showModalDel = true; selecItem(props.item)"><v-icon light>delete</v-icon></v-btn>
                            </td>
                        </template>
                        <template slot="pageText" scope="{ pageStart, pageStop }">
                            From {{ pageStart }} to {{ pageStop }}
                        </template>
                    </v-data-table>
                    <pre>{{ $data }}</pre>
                    <div id="app">
                        <!-- use the modal component, pass in the prop -->
                        <modal-add @close="showModalAdd = false" @atualizar="itemModal" v-if="showModalAdd" :data="cliente"></modal-add>
                        <modal-edt @close="showModalEdt = false" @atualizar="itemModal" v-if="showModalEdt" :data="modalItem"></modal-edt>
                        <modal-del @close="showModalDel = false" @atualizar="itemModal" v-if="showModalDel" :data="modalItem"> </modal-del>
                    </div>
                </v-card>

            </v-container>
        </main>
    </div>
</template>


<script>
import ModalAdd from './_add'
import ModalEdt from './_edt'
import ModalDel from './_del'
export default {
    //nome: '#user',
    components: { ModalAdd, ModalEdt, ModalDel },
    data () {
        return {
            title: 'Localidades',
            showModalAdd: false, showModalEdt: false, showModalDel: false,
            filterKey: '',
            modalItem: {},
            cliente: '',
            items: [],
            search: '',
            pagination: {},
            headers: [
                { text: 'Tipo', left: true, value: 'tipo' },
                { text: 'Nome', value: 'nome'},
                { text: 'municipio', value: 'municipio' },
                { text: 'UF', value: 'uf' },
                { text: 'Ação', value: 'acao' }
            ]
        }
    },
    watch: {
        // sempre que a pergunta mudar, essa função será executada
    },
    beforeCreate: function() {
	    this.$store.state.findClienteById(this.$route.params.id).then(cliente => {
                this.$store.state.findLocalidadesByClienteId(this.$route.params.id).then(localidades => {
                    this.cliente = cliente
                    this.items = localidades
                })
        })

    },
    mounted: function(){
        console.log("bonina");
    },    
    methods: {
        getAllUsers: function(){
            this.$store.state.findClienteById(this.$route.params.id).then(cliente => {
                this.$store.state.findLocalidadesByClienteId(this.$route.params.id).then(localidades => {
                    this.cliente = cliente
                    this.items = localidades
                })
            })
        },
        itemModal: function(){
            this.$store.state.findLocalidadesByClienteId(this.$route.params.id).then(localidades => {
                this.items = localidades
            }),
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