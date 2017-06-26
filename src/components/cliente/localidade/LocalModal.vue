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
                
                <localtab
                v-for="item in localidades"
                :item="item">
                </localtab>
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
        </div>
    </div>
</template>

<script>

import Localtab from './LocalTab'

export default {
    //name: 'localidades',
    components: { Localtab },
    data () {
        return {
            title: 'Localidade',
            showAddModal: false,
            showEditModal: false,
            showDeletModal: false,
            errorMessage: '',
            successMessage: '',
            clienteId: '', nome: '', tipo: '', regional: '', municipio: '', uf: '', ativo: '', cadastro: '',
            modalItem: {},
            localidades: []
        }
    },
    mounted: function(){
        console.log("bonina");
        this.getAllItems();
    },
    props: {
        localidade: Object
    },
    methods: {
        getAllItems: function(){
            this.$store.state.recaregarLocalidades(this, 'localidades')
        },
        saveItem: function(){
            const data = {
                'type': 'localidade',
                'clienteId': this.clienteId,
                'nome': this.nome,
                'tipo': this.tipo,
                'municipio': this.municipio,
                'uf': this.uf,
                'ativo': this.ativo,
                'cadastro': new Date().toJSON()
            },
            this.$store.state.create(data).then(results => {
                this.$store.state.recaregarlocalidades(this, 'localidades')
            })
            this.fantasia = ''
            this.nome = ''
            this.seguimento = ''
        },
        updateItem: function(){
            this.$store.state.update(this.modalItem).then(results => {
                this.$store.state.recaregarlocalidades(this, 'localidades')
            })
        },
        deleteItem: function(){
            const data = {
                '_id': this.modalItem._id,
                '_rev': this.modalItem._rev,
            }
            this.$store.state.delete(data).then(results => {
                this.$store.state.recaregarlocalidades(this, 'localidades')
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