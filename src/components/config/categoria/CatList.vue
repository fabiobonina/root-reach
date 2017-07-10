<template>
    <div>
        <main>
            <v-container fluid>
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-card>
                            <v-card-title>
                                {{ title }}
                                <v-spacer></v-spacer>
                                <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchQuery"></v-text-field>
                                <v-btn icon class="indigo" @click.native="showModalAdd = true"><v-icon light>add</v-icon></v-btn>
                            </v-card-title>
                            <modal-list :data="items" :filter-key="searchQuery">
                            </modal-list>
                        </v-card>
                    </v-flex>
                </v-layout>

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
import ModalList from './_list'
export default {
    //nome: '#user',
    components: { ModalAdd, ModalEdt, ModalDel, ModalList },
    data () {
        return {
            title: 'Categorias',
            showModalAdd: false, showModalEdt: false, showModalDel: false,
            modalItem: {},
            items: [],
            searchQuery: '',
        }
    },
    watch: {
        // sempre que a pergunta mudar, essa função será executada
    },
    beforeCreate: function() {
	    this.$store.state.recaregarCategorias(this, 'items')
    },
    mounted: function(){
        console.log("bonina");
    },    
    methods: {
        getAllUsers: function(){
            this.$store.state.recaregarCategorias(this, 'items')
        },
        itemModal: function(){
            this.$store.state.recaregarCategorias(this, 'items'),
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
.modal{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
}
.modalContainer{
    width: 555px;
    background: #FFFFFF;
    margin: auto;
    margin-top: 44px;
}
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