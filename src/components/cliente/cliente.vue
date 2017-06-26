<template>
    <div>
        <div>
            <sidebar></sidebar>
        </div>
        <div id="app"class="phone-viewport">
            <md-toolbar class="md-dense" md-theme="green">
                <h3>{{ title }} > </h3>
                <h3 class="md-title"> {{ cliente.fantasia }} | {{ cliente.nome }}</h3>
            </md-toolbar>
        </div>
        <div>
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
                        <md-list v-for="item in localidades">
                            <md-list-item>
                            <md-icon class="md-primary">location_on</md-icon>

                            <div class="md-list-text-container">
                                <span>{{ item.nome }}</span>
                                <p>{{ item.tipo }}</p>
                                <p>{{ item.municipio }}/{{ item.uf }}</p>
                            </div>
                            <router-link :to="'/cliente/' + item._id"><md-button md-theme="brown" class="md-icon-button md-raised"><md-icon>visibility</md-icon></md-button></router-link>
                        <md-button class="md-icon-button md-raised md-primary" @click.native="showEditModal = true; selecItem(item)"><md-icon>edit</md-icon></md-button>
                        <md-button class="md-icon-button md-raised md-accent" @click.native="showDeletModal = true; selecItem(item)"><md-icon>delete</md-icon></md-button>
                            <md-button class="md-icon-button md-list-action">

                            </md-button>
                            </md-list-item>
                            <md-divider class="md-inset"></md-divider>
                            </md-list-item>
                        </md-list>
                    </div>
                </md-layout>
                <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
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
                                        <label>Nome</label>
                                        <md-input type="text" v-model="nome"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Tipo</label>
                                        <md-select v-model="tipo">
                                            <md-option value="CAPITAÇÃO">CAPITAÇÃO</md-option>
                                            <md-option value="ELEVATORIA">ELEVATORIA</md-option>
                                            <md-option value="ETA">ETA</md-option>
                                            <md-option value="ETE">ETE</md-option>
                                            <md-option value="INDUSTRIA">INDUSTRIA</md-option>
                                            <md-option value="POÇO">POÇO</md-option>
                                            <md-option value="OUTRO">OUTRO</md-option>
                                        </md-select>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Regional</label>
                                        <md-input type="text" v-model="regional"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Municipio</label>
                                        <md-input type="text" v-model="municipio"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>UF</label>
                                        <md-input type="text" v-model="uf"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Ativo</label>
                                        <md-input type="text" v-model="ativo"></md-input>
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
                                        <label>Nome</label>
                                        <md-input type="text" v-model="modalItem.nome"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Tipo</label>
                                        <md-select v-model="modalItem.tipo">
                                            <md-option value="CAPITAÇÃO">CAPITAÇÃO</md-option>
                                            <md-option value="ELEVATORIA">ELEVATORIA</md-option>
                                            <md-option value="ETA">ETA</md-option>
                                            <md-option value="ETE">ETE</md-option>
                                            <md-option value="INDUSTRIA">INDUSTRIA</md-option>
                                            <md-option value="POÇO">POÇO</md-option>
                                            <md-option value="OUTRO">OUTRO</md-option>
                                        </md-select>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Regional</label>
                                        <md-input type="text" v-model="modalItem.regional"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Municipio</label>
                                        <md-input type="text" v-model="modalItem.municipio"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>UF</label>
                                        <md-input type="text" v-model="modalItem.uf"></md-input>
                                    </md-input-container>
                                    <md-input-container>
                                        <label>Ativo</label>
                                        <md-input type="text" v-model="modalItem.ativo"></md-input>
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
                </md-layout>
                <md-layout>
                    md-flex-medium="33"
                </md-layout>
            </md-layout>

            <pre>{{ $data }}</pre>
            <pre>{{ $route.params.id }}</pre>
        </div>
    </div>
</template>

<script>
import Sidebar from '../principal/Sidebar'
import Localidades from './localidade/Localidades'

export default {
    //name: 'clientes',
    components: { Sidebar, Localidades },
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
                //this.$store.state.findLocalidadesByClienteId(cliente._id).then(localidades => {
                    this.cliente = cliente,
                  //  this.localidades = localidades
                //}),
            )
            this.$store.state.recaregarLocalidades(this, 'localidades')
            //this.$store.state.findLocalidadesByClienteId(cliente._id).then(comments =>{
            //this.comments = comments
            //})
        },
        saveItem: function(){
            const data = {
                'type': 'localidade',
                'clienteId': this.cliente._id,
                'clienteNome': this.cliente.fantasia,
                'nome': this.nome,
                'tipo': this.tipo,
                'municipio': this.municipio,
                'uf': this.uf,
                'ativo': this.ativo,
                'cadastro': new Date().toJSON()
            }
            this.$store.state.create(data).then(results => {
                //this.$store.state.findLocalidadesByClienteId(cliente._id).then(localidades => {
                //    this.localidades = localidades
                //})
                 this.$store.state.recaregarlocalidades(this, 'localidades')
            })
            this.tipo = ''
            this.nome = ''
            this.regional = ''
            this.municipio = ''
            this.uf = ''
            this.ativo = ''

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