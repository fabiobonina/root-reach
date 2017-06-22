<template>
    <div>
        <div>
            <sidebar></sidebar>
        </div>
        <div>
            
            <md-toolbar class="md-dense md-teal">
                <h2 class="md-title" style="flex: 1">Users</h2>
                <md-button class="md-icon-button md-accent" @click.native="showingAddModal = true">
                    <md-icon>add</md-icon>
                </md-button>
            </md-toolbar>
            <div>
                <p class="successMessage" v-if="successMessage">{{successMessage}}</p>
                <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
                
                <md-table>
                    <md-table-header>
                    <md-table-row>
                        <md-table-head>Nome</md-table-head>
                        <md-table-head>Usuario</md-table-head>
                        <md-table-head>Email</md-table-head>
                        <md-table-head>&nbsp;</md-table-head>
                    </md-table-row>
                    </md-table-header>
                    <md-table-body>
                    <md-table-row v-for="user in users">
                        <md-table-cell>{{user.nome}}</md-table-cell>
                        <md-table-cell>{{user.user}}</md-table-cell>
                        <md-table-cell>{{user.email}}</md-table-cell>
                        <md-button class="md-icon-button md-raised md-primary" @click.native="showingEditModal = true; selecUser(user)"><md-icon>edit</md-icon></md-button>
                        <md-button class="md-icon-button md-raised md-accent" @click.native="showingDeletModal = true; selecUser(user)"><md-icon>delete</md-icon></md-button>
                    </md-table-row>
                    </md-table-body>
                </md-table>
            </div>

            <pre>{{ $data }}</pre>

            <div class="modal" id="addModal" v-if="showingAddModal">
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
                            <md-bottom-bar-item md-icon="cancel" @click.native="showingAddModal = false">Cancelar</md-bottom-bar-item>
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
        </div>
    </div>
</template>

<script>

import Sidebar from '../components/principal/Sidebar'

export default {
    //name: '#user',
    components: { Sidebar },
    data () {
        return {
        showingAddModal: false,
        showingEditModal: false,
        showingDeletModal: false,
        errorMessage: '',
        successMessage: '',
        nome: '', email: '', user: '', dataCad: '', type: '',
        modalUser: {},
        users: []
        }
    },
    mounted: function(){
        console.log("bonina");
        this.getAllUsers();
    },
    methods: {
        getAllUsers: function(){
            this.$store.state.recaregarUsers(this, 'users')
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
                this.$store.state.recaregarUsers(this, 'users')
            })
            this.nome = ''
            this.email = ''
            this.user = ''
        },
        updateUser: function(){
            this.$store.state.update(this.modalUser).then(results => {
                this.$store.state.recaregarUsers(this, 'users')
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