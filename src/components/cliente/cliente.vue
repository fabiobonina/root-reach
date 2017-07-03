<template>
    <div>
        <div>
            <sidebar></sidebar>
        </div>
        <main>
            <v-container fluid>
                
                <div class="title">Click on sidebar to re-open.</div>
                <v-card>
                    <v-card-title> <h6> {{ title }}: {{ cliente.fantasia }} | {{ cliente.nome }}</h6><v-spacer></v-spacer>
                        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
                        <v-btn floating small class="indigo" @click.native="showModalAdd = true"><v-icon light>add</v-icon></v-btn>
                    </v-card-title>
                    <div>
                        <local-list :cliente="cliente"></local-list>
                        <md-layout md-gutter>
                            <md-layout md-flex-xsmall="150" md-flex-small="75" md-flex-medium="50">
                                <div class="phone-viewport">
                                    <md-toolbar class="md-dense">
                                        <md-icon class="md-primary">location_city</md-icon>
                                        <h2 class="md-title" style="flex: 1">{{ title2 }}s</h2>
                                        <md-button class="md-icon-button md-accent" @click.native="showAddModal = true">
                                            <md-icon>add</md-icon>
                                        </md-button>
                                    </md-toolbar>
                                    <md-list class="custom-list md-triple-line" v-for="item in localidades">
                                        <md-list-item>
                                        <md-icon class="md-primary">location_on</md-icon>
                                        <div class="md-list-text-container">
                                            <span>{{ item.nome }}</span>
                                            <p>{{ item.tipo }}</p>
                                            <p>{{ item.municipio }}/{{ item.uf }}</p>
                                        </div>
                                        <md-button md-theme="brown" class="md-icon-button md-raised md-dense"><router-link :to="'/cliente/' + item._id"><md-icon>visibility</md-icon></router-link></md-button>
                                        <md-menu md-size="4" md-direction="bottom left">
                                            <md-button class="md-icon-button" md-menu-trigger>
                                                <md-icon>more_vert</md-icon>
                                            </md-button>
                                            <md-menu-content>
                                                <md-menu-item @click.native="showEditModal = true; selecItem(item)">
                                                <span>Editar</span>
                                                <md-icon>edit</md-icon>
                                                </md-menu-item>
                                                <md-menu-item @click.native="showDeletModal = true; selecItem(item)">
                                                <span>Deletar</span>
                                                <md-icon>delete</md-icon>
                                                </md-menu-item>
                                            </md-menu-content>
                                        </md-menu>
                                        </md-list-item>
                                        <md-divider class="md-inset"></md-divider>
                                        </md-list-item>
                                    </md-list>
                                </div>
                            </md-layout>
                            <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">                    
                            </md-layout>
                            <md-layout>
                                md-flex-medium="33"
                            </md-layout>
                        </md-layout>
                    </div>
                </v-card>
            </v-container>
        </main>
    </div>
</template>

<script>
import Sidebar from '../principal/Sidebar'
import LocalList from './localidade/LocalList'

export default {
    //name: 'clientes',
    components: { Sidebar, LocalList },
    data () {
        return {
            title: 'Cliente', title2: 'Localidade',
            showAddModal: false, showEditModal: false, showDeletModal: false,
            errorMessage: '', successMessage: '',
            cliente: '',
            comments: [], content: '',
            type: '',
            createdAt: '',
            clienteId: '', clienteNome: '',nome: '', tipo: '', regional: '', municipio: '', uf: '', ativo: '', cadastro: '',
            modalItem: {},
            localidades: []
        }
    },
    mounted: function(){
        console.log("bonina");
        //console.log(this.$route.params.id);
        //this.id = this.$route.params.id;
        this.getAllItems();
    },
    methods: {
        getAllItems: function(){
            //console.log(this.$route.params.id);
            this.$store.state.findClienteById(this.$route.params.id).then(cliente =>
                this.$store.state.findLocalidadesByClienteId(cliente._id).then(localidades => {
                    this.cliente = cliente,
                    this.localidades = localidades
                }),
            )
            //this.$store.state.recaregarLocalidades(this, 'localidades')
            //this.$store.state.findLocalidadesByClienteId(cliente._id).then(comments =>{
            //this.comments = comments
            //})
        },
        updateItem: function(){
            this.$store.state.update(this.modalItem).then(results => {
                this.$store.state.findLocalidadesByClienteId(cliente._id).then(localidades => {
                    this.localidades = localidades
                })
            })
        },
        deleteItem: function(){
            const data = {
                '_id': this.modalItem._id,
                '_rev': this.modalItem._rev,
            }
            this.$store.state.delete(data).then(results => {
                this.$store.state.findLocalidadesByClienteId(cliente._id).then(localidades => {
                    this.localidades = localidades
                })
            })
        },
        selecItem: function(item){
            this.modalItem = item;
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
    width: 500px;
    background: #FFFFFF;
    margin: auto;
    margin-top: 0px;
}

.modalHeading{
    padding: 9px;
    background: #06307c;
    color: #FFFFFF;
}

.modalContent{
    min-height: 333px;
    padding: 44px;
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