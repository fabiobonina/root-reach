<template>
<!-- template for the modal component -->
    <transition name="modal">
        <div class="modal">
            <div class="modalContainer">
                <v-toolbar class="blue" dark>
                    <v-btn dark icon @click.native="$emit('atualizar')">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edtar {{ title }}</v-toolbar-title>
                </v-toolbar>
                <template>
                    <v-flex xs12 md16 offset-md1>
                        <v-card>
                        <v-card-text>
                            <v-flex xs6>
                                <v-select
                                v-bind:items="states"
                                v-model="modalItem.tipo"
                                label="Tipo"
                                single-line
                                bottom
                                required
                                ></v-select>
                            </v-flex>
                            <v-text-field required
                            label="Nome"
                            v-model="modalItem.nome"
                            ></v-text-field>
                            <v-text-field
                            label="Regional"
                            v-model="modalItem.regional"
                            ></v-text-field>
                            <v-text-field required
                            label="municipio"
                            v-model="modalItem.municipio"
                            ></v-text-field>
                            <v-text-field required hint="Exemplo: PE"
                            label="UF"
                            v-model="modalItem.uf"
                            ></v-text-field>
                            <small>*campos obrigatório</small>
                        </v-card-text>
                        </v-card>
                    </v-flex>
                </template>
                <v-toolbar class="blue" dark><v-spacer></v-spacer>
                    <v-toolbar-title>
                        <v-btn flat dark v-if="formValido()" @click.native="$emit('atualizar'); updateItem()">
                            <span>Salva</span>
                            <v-icon dark>save</v-icon>
                        </v-btn>
                    </v-toolbar-title>
                </v-toolbar>
            </div>
        </div>
    </transition>
<!-- app -->
</template>

<script>
export default {
    //name: 'clientes',
    props: {
        data: {}
    },
    data () {
        return {
            errors: [],
            title: 'Usuario',
            states: ['Capitação','Elevatoria','ETA','ETE','Industria','Poço','Outro'],
            modalItem: this.data
        }
    },
    mounted: function(){
        console.log("bonina");
    },
    computed: {
        hasErrors () {
            return this.errors.length > 0
        }
    },
    watch: {
        // sempre que a pergunta mudar, essa função será executada
        modalItem: function (data) {
            this.formValido();
        }
    },
    methods: {
        updateItem: function(){
            this.$store.state.update(this.modalItem)
        },
        ehVazia () {
            if(this.modalItem.tipo.length == 0 || this.modalItem.nome.length == 0 || this.modalItem.municipio.length == 0 || this.modalItem.uf.length == 0 ){
                return true
            }
            return false
        },
        formValido(){
            if(this.ehVazia()){
                return false
            }
            return true
        }
    },
}
</script>

<style>
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
    margin-top: 50px;
}
</style>