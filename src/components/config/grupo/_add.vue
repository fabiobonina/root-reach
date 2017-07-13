<template>
<!-- template for the modal component -->
    <transition name="modal">
        <div class="modal">
            <div class="modalContainer">
                <v-toolbar class="indigo" dark>
                    <v-btn dark icon @click.native="$emit('close')">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-toolbar-title>Novo {{ title }}</v-toolbar-title>
                </v-toolbar>
                <template>
                    <v-flex xs12 md16 offset-md1>
                        <v-card>
                        <v-card-text>
                            <v-text-field required
                            label="Nome"
                            v-model="nome"
                            ></v-text-field>
                            <v-checkbox v-bind:label="`Ativo: ${ativo.toString()}`" v-model="ativo" dark></v-checkbox>
                            <small>*campos obrigatório</small>
                        </v-card-text>
                        </v-card>
                    </v-flex>
                    
                </template>
                <v-toolbar class="indigo" dark><v-spacer></v-spacer>
                    <v-toolbar-title>
                        <v-btn flat dark v-if="formValido()" @click.native="$emit('atualizar'); saveItem()">
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
            title: 'grupo',
            nome: '',
            ativo: 'true',
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
        nome: function (data) {
            this.formValido();
        },
        ativo: function (data) {
            this.formValido();
        }
    },
    methods: {
        saveItem: function(){
            const data = {
                'type': this.title,
                'nome': this.nome,
                'ativo': this.ativo
            }
            this.$store.state.create(data)
            this.nome = ''
            this.ativo = 'true'
        },
        ehVazia () {
            if(this.nome.length == 0 || this.ativo == true){
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
    margin-top: 70px;
}
</style>