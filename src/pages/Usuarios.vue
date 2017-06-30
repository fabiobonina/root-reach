<template>
    <div>
        <sidebar></sidebar>
        <main>
            <v-container fluid>
                <div class="title">Click on sidebar to re-open.</div>
                <v-card>
                    <v-card-title> Usuario <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
                        <v-btn floating small class="indigo" @click.native="showAddModal = true"><v-icon light>add</v-icon></v-btn>
                    </v-card-title>
                    <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search">
                    <template slot="items" scope="props">
                        <td class="text-xs-right">{{ props.item.nome }}</td>
                        <td class="text-xs-right">{{ props.item.user }}</td>
                        <td class="text-xs-right">{{ props.item.email }}</td>
                        <td class="text-xs-right">
                            <v-btn floating small class="cyan" @click.native="showEditModal = true; selecUser(user)"><v-icon light>edit</v-icon></v-btn>
                            <v-btn floating small class="deep-orange" @click.native="showDeletModal = true; selecUser(user)"><v-icon light>delete</v-icon></v-btn>
                        </td>
                    </template>
                    <template slot="pageText" scope="{ pageStart, pageStop }">
                        From {{ pageStart }} to {{ pageStop }}
                    </template>
                    </v-data-table>
                    <pre>{{ $data }}</pre>
                    <div class="modal" id="addModal" v-if="showAddModal">
                        <div class="modalContainer">
                            <md-toolbar>
                                <div class="md-toolbar-container">
                                    <h3 class="md-title">Novo Usuario</h3>
                                </div>
                            </md-toolbar>
                            <div class="modalContent">
                                <form novalidate @submit.stop.prevent="submit">
                                    <md-input-container>
                                        <label>Nome</label>
                                        <md-input type="text" v-model="nome"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Usuario</label>
                                        <md-input type="text" v-model="user"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Email</label>
                                        <md-input type="text" v-model="email"></md-input>
                                    </md-input-container>
                                </form>
                            </div>
                            <div>
                                <md-bottom-bar md-theme="teal">
                                    <md-bottom-bar-item md-icon="cancel" @click.native="showAddModal = false">Cancelar</md-bottom-bar-item>
                                    <md-bottom-bar-item md-icon="save" @click.native="showingAddModal = false; saveUser()">Salva</md-bottom-bar-item>
                                </md-bottom-bar>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="editModal" v-if="showingEditModal">
                        <div class="modalContainer">
                            <md-toolbar>
                                <div class="md-toolbar-container">
                                    <h3 class="md-title">Editar Usuario</h3>
                                </div>
                            </md-toolbar>
                            <div class="modalContent">
                                <form novalidate @submit.stop.prevent="submit">
                                    <md-input-container>
                                        <label>Nome</label>
                                        <md-input type="text" v-model="modalUser.nome"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Usuario</label>
                                        <md-input type="text" v-model="modalUser.user"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Email</label>
                                        <md-input type="text" v-model="modalUser.email"></md-input>
                                    </md-input-container>
                                </form>
                            </div>
                            <div>
                                <md-bottom-bar md-theme="teal">
                                    <md-bottom-bar-item md-icon="cancel" @click.native="showingEditModal = false">Cancelar</md-bottom-bar-item>
                                    <md-bottom-bar-item md-icon="save" @click.native="showingEditModal = false; updateUser()">Salva</md-bottom-bar-item>
                                </md-bottom-bar>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="deletModal" v-if="showingDeletModal">
                        <div class="modalContainer">
                            <md-toolbar>
                                <div class="md-toolbar-container">
                                    <h3 class="md-title">você tem certeza?</h3>
                                </div>
                            </md-toolbar>
                            <div class="modalContent">
                                <p>Você vai apagar '{{modalUser.nome}}'.</p>
                            </div>
                            <div>
                                <md-bottom-bar md-theme="teal">
                                    <md-bottom-bar-item md-icon="cancel" @click.native="showingDeletModal = false">Cancelar</md-bottom-bar-item>
                                    <md-bottom-bar-item md-icon="delete" @click.native="showingDeletModal = false; deleteUser()">Deletar</md-bottom-bar-item>
                                </md-bottom-bar>
                            </div>
                        </div>
                    </div>
  </v-card>
  </v-container>
        </main>
        </div>
</template>


<script>

import Sidebar from '../components/principal/Sidebar'

export default {
    //nome: '#user',
    components: { Sidebar },
    data () {
        return {
        showAddModal: false,
        showEditModal: false,
        showDeletModal: false,
        errorMessage: '',
        successMessage: '',
        nome: '', email: '', user: '', dataCad: '', type: '',
        modalUser: {},
        users: [],
        search: '',
        pagination: {},
        headers: [
          { text: 'Nome', left: true, value: 'nome'},
          { text: 'Usuario', value: 'user' },
          { text: 'E-amil', value: 'email' },
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
            this.$store.state.recaregarUsers(this, 'items')
        },
        saveUser: function(){
            const data = {
                'type': 'user',
                'nome': this.nome,
                'email': this.email,
                'user': this.user,
                'dataCad': new Date().toJSON()
            }
            this.$store.state.create(data).then(results => {
                this.$store.state.recaregarUsers(this, 'items')
            })
            this.nome = ''
            this.email = ''
            this.user = ''
        },
        updateUser: function(){
            this.$store.state.update(this.modalUser).then(results => {
                this.$store.state.recaregarUsers(this, 'items')
            })
        },
        deleteUser: function(){
            const data = {
                '_id': this.modalUser._id,
                '_rev': this.modalUser._rev,
            }
            this.$store.state.delete(data).then(results => {
                this.$store.state.recaregarUsers(this, 'users')
            })
        },
        selecUser: function(user){
            this.modalUser = user;
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