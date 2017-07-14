<template>
<!-- template for the modal component -->
    <v-dialog v-model="dialog" persistent width="550px">
        <v-toolbar class="indigo" dark>
            <v-btn dark icon @click.native="$emit('close')"><v-icon>arrow_back</v-icon></v-btn>
            <v-toolbar-title>Nova {{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-card-text>
                <v-text-field label="Nome" v-model="nome" required></v-text-field>
                <small>*campos obrigatório</small>
            </v-card-text>
        </v-card>
        <p>{{$data}}</p>
        <v-toolbar class="indigo" dark><v-spacer></v-spacer>
            <v-toolbar-title>
                <v-btn flat dark v-if="formValido()" @click.native="$emit('atualizar'); saveItem()">
                    <span>Salva</span><v-icon dark>save</v-icon>
                </v-btn>
            </v-toolbar-title>
        </v-toolbar>
    </v-dialog>
<!-- app -->
</template>

<script>
export default {
    //name: 'clientes',
    data () {
        return {
            errors: [],
            title: 'ordem',
            dialog: true,
            nome: ''
        }
    },
    mounted: function(){
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
                'nome': this.nome
            }
            this.$store.state.create(data)
            this.nome = ''
            this.ativo = 'true'
        },
        ehVazia () {
            if(this.nome.length == 0){
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