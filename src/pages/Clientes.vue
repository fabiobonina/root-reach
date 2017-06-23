<template>
    <div>
        <div>
            <sidebar></sidebar>
        </div>
        <div>
            <md-toolbar class="md-dense">
                <h2 class="md-title" style="flex: 1">{{ title }}s</h2>
                <md-button class="md-icon-button md-accent" @click.native="showAddModal = true">
                    <md-icon>add</md-icon>
                </md-button>
            </md-toolbar>
            <div>
                <p class="successMessage" v-if="successMessage">{{ successMessage }}</p>
                <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
                
                <md-table>
                    <md-table-header>
                    <md-table-row>
                        <md-table-head>Nome Fantasia</md-table-head>
                        <md-table-head>Nome</md-table-head>
                        <md-table-head>Seguimento</md-table-head>
                        <md-table-head>&nbsp;</md-table-head>
                    </md-table-row>
                    </md-table-header>
                    <md-table-body>
                    <md-table-row v-for="cliente in clientes">
                        <md-table-cell>{{ cliente.fantasia }}</md-table-cell>
                        <md-table-cell>{{ cliente.nome }}</md-table-cell>
                        <md-table-cell>{{ cliente.seguimento }}</md-table-cell>
                        <router-link :to="'/cliente/' + cliente._id"><md-button md-theme="brown" class="md-icon-button md-raised"><md-icon>visibility</md-icon></md-button></router-link>
                        <md-button class="md-icon-button md-raised md-primary" @click.native="showEditModal = true; selecItem(cliente)"><md-icon>edit</md-icon></md-button>
                        <md-button class="md-icon-button md-raised md-accent" @click.native="showDeletModal = true; selecItem(cliente)"><md-icon>delete</md-icon></md-button>
                    </md-table-row>
                    </md-table-body>
                </md-table>
            </div>

            <pre>{{ $data }}</pre>

            <div class="modal" id="addModal" v-if="showAddModal">
                <div class="modalContainer">
                    <md-toolbar>
                        <div class="md-toolbar-container">
                            <h3 class="md-title">Novo {{ title }}</h3>
                        </div>
                    </md-toolbar>
                    <div class="modalContent">
                        <form novalidate @submit.stop.prevent="submit">
                            <md-input-container>
                                <label>Fantasia</label>
                                <md-input type="text" v-model="fantasia"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Nome</label>
                                <md-input type="text" v-model="nome"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Seguimento</label>
                                <md-select v-model="seguimento">
                                    <md-option value="bebida">Bebida</md-option>
                                    <md-option value="industria">Industria</md-option>
                                    <md-option value="saneamento">Saneamento</md-option>                                 
                                    <md-option value="outro">Outro</md-option>
                                </md-select>
                            </md-input-container>
                        </form>
                    </div>
                    <div>
                        <md-bottom-bar md-theme="teal">
                            <md-bottom-bar-item md-icon="cancel" @click.native="showAddModal = false">Cancelar</md-bottom-bar-item>
                            <md-bottom-bar-item md-icon="save" @click.native="showAddModal = false; saveItem()">Salva</md-bottom-bar-item>
                        </md-bottom-bar>
                    </div>
                </div>
            </div>
            <div class="modal" id="editModal" v-if="showEditModal">
                <div class="modalContainer">
                    <md-toolbar>
                        <div class="md-toolbar-container">
                            <h3 class="md-title">Editar {{ title }}</h3>
                        </div>
                    </md-toolbar>
                    <div class="modalContent">
                        <form novalidate @submit.stop.prevent="submit">
                            <md-input-container>
                                <label>Nome Fantasia</label>
                                <md-input type="text" v-model="modalItem.fantasia"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Nome</label>
                                <md-input type="text" v-model="modalItem.nome"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Seguimento</label>
                                <md-input type="text" v-model="modalItem.seguimento"></md-input>
                            </md-input-container>
                        </form>
                    </div>
                    <div>
                        <md-bottom-bar md-theme="teal">
                            <md-bottom-bar-item md-icon="cancel" @click.native="showEditModal = false">Cancelar</md-bottom-bar-item>
                            <md-bottom-bar-item md-icon="save" @click.native="showEditModal = false; updateItem()">Salva</md-bottom-bar-item>
                        </md-bottom-bar>
                    </div>
                </div>
            </div>
            <div class="modal" id="deletModal" v-if="showDeletModal">
                <div class="modalContainer">
                    <md-toolbar>
                        <div class="md-toolbar-container">
                            <h3 class="md-title">você tem certeza?</h3>
                        </div>
                    </md-toolbar>
                    <div class="modalContent">
                        <p>Você vai apagar '{{modalItem.nome}}'.</p>
                    </div>
                    <div>
                        <md-bottom-bar md-theme="teal">
                            <md-bottom-bar-item md-icon="cancel" @click.native="showDeletModal = false">Cancelar</md-bottom-bar-item>
                            <md-bottom-bar-item md-icon="delete" @click.native="showDeletModal = false; deleteItem()">Deletar</md-bottom-bar-item>
                        </md-bottom-bar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Sidebar from '../components/principal/Sidebar'

export default {
    //name: 'clientes',
    components: { Sidebar },
    data () {
        return {
            title: 'Cliente',
            showAddModal: false,
            showEditModal: false,
            showDeletModal: false,
            errorMessage: '',
            successMessage: '',
            fantasia: '', nome: '', seguimento: '', cadastro: '',
            modalItem: {},
            clientes: []
        }
    },
    mounted: function(){
        console.log("bonina");
        this.getAllItems();
    },
    props: {
        cliente: Object
    },
    methods: {
        getAllItems: function(){
            this.$store.state.recaregarClientes(this, 'clientes')
        },
        saveItem: function(){
            const data = {
                'type': 'cliente',
                'fantasia': this.fantasia,
                'nome': this.nome,
                'seguimento': this.seguimento,
                'cadastro': new Date().toJSON()
            }
            this.$store.state.create(data).then(results => {
                this.$store.state.recaregarClientes(this, 'clientes')
            })
            this.fantasia = ''
            this.nome = ''
            this.seguimento = ''
        },
        updateItem: function(){
            this.$store.state.update(this.modalItem).then(results => {
                this.$store.state.recaregarClientes(this, 'clientes')
            })
        },
        deleteItem: function(){
            const data = {
                '_id': this.modalItem._id,
                '_rev': this.modalItem._rev,
            }
            this.$store.state.delete(data).then(results => {
                this.$store.state.recaregarClientes(this, 'clientes')
            })
        },
        selecItem: function(item){
            this.modalItem = item;
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