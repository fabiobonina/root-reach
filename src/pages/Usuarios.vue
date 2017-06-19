<template>
    <div>
    
            <md-toolbar class="md-medium">
                <md-button class="md-icon-button">
                    <md-icon>menu</md-icon>
                </md-button>
                <h2 class="md-title" style="flex: 1">Users</h2>
                <md-button class="md-icon-button" @click.native="showingAddModal = true">
                    <md-icon>add</md-icon>
                </md-button>
            </md-toolbar>
            <div>
                <p class="successMessage" v-if="successMessage">{{successMessage}}</p>
                <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
                
                <md-table>
                    <md-table-header>
                    <md-table-row>
                        <md-table-head>ID</md-table-head>
                        <md-table-head>Nome</md-table-head>
                        <md-table-head>Usuario</md-table-head>
                        <md-table-head>Email</md-table-head>
                        <md-table-head>&nbsp;</md-table-head>
                    </md-table-row>
                    </md-table-header>
                    <md-table-body>
                    <md-table-row v-for="user in users">
                        <md-table-cell>{{user.id}}</md-table-cell>
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
                                <md-input type="text" v-model="newUser.nome"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Usuario</label>
                                <md-input type="text" v-model="newUser.user"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Email</label>
                                <md-input type="text" v-model="newUser.email"></md-input>
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

</template>

<script>

    export default {
        name: 'clientes',
        data () {
            return {
            showingAddModal: false,
            showingEditModal: false,
            showingDeletModal: false,
            errorMessage: "",
            successMessage: "",
            newUser: { nome: "", email: "", user: "" },
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
                this.$http.get('http://localhost/codephp/skyhubnovo/api/apiphp.php?action=read')
                .then((response) => {
                    if(response.data.error){
                        this.errorMessage = response.data.message;
                    } else{
                        this.users = response.data.users;
                    }
                });
            },
            saveUser: function(){
                var formData = this.toFormData(this.newUser);
                axios.post("http://localhost/codephp/skyhubnovo/api/apiphp.php?action=create", formData)
                .then((response) => {
                    this.newUser = { nome: "", email: "", user: "" };
                    if(response.data.error){
                        this.errorMessage = response.data.message;
                    } else{
                        this.successMessage = response.data.message;
                        this.getAllUsers();
                    }
                });
            },
            updateUser: function(){
                var formData = this.toFormData(this.modalUser);
                axios.post("http://localhost/codephp/skyhubnovo/api/apiphp.php?action=update", formData)
                .then((response) => {
                    this.modalUser = {};
                    if(response.data.error){
                        this.errorMessage = response.data.message;
                    } else{
                        this.successMessage = response.data.message;
                        this.getAllUsers();
                    }
                });
            },
            deleteUser: function(){
                var formData = this.toFormData(this.modalUser);
                axios.post("http://localhost/codephp/skyhubnovo/api/apiphp.php?action=delete", formData)
                .then((response) => {
                    this.modalUser = {};
                    if(response.data.error){
                        this.errorMessage = response.data.message;
                    } else{
                        this.successMessage = response.data.message;
                        this.getAllUsers();
                    }
                });
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
                this.errorMessage = "";
                this.successMessage = "";
            }
        },
    }


</script>

<style scoped>


</style>