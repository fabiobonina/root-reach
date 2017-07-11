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
                            <v-text-field class="mt-5" required
                            label="Fantasia"
                            v-model="fantasia"
                            ></v-text-field>
                            <v-text-field required
                            label="Nome"
                            hint="Nome completo"
                            v-model="nome"
                            ></v-text-field>
                            <v-flex xs6>
                                <v-select v-bind:items="states" required
                                v-model="seguimento"
                                label="Seguimento"
                                single-line
                                auto
                                ></v-select>
                            </v-flex>
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
    data () {
        return {
            errors: [],
            title: 'cliente',
            fantasia: '', nome: '', seguimento: '', cadastro: '',
            clientes: [],
            states: ['Bebida','Industria','Saneamento','Outro']
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
        fantasia: function (data) {
            this.formValido();
        },
        nome: function (data) {
            this.formValido();
        },
        seguimento: function (data) {
            this.formValido();
        }
    },
    methods: {
        saveItem: function(){
            this.errors = []
            if(this.formValido()){
                const data = {
                    'type': 'cliente',
                    'fantasia': this.fantasia,
                    'nome': this.nome,
                    'seguimento': this.seguimento,
                    'lat': '',
                    'long': '',
                    'cadastro': new Date().toJSON()
                }
                this.$store.state.create(data)
                this.fantasia = ''
                this.nome = ''
                this.seguimento = ''
            }
        },
        ehVazia () {
            if(this.fantasia.length == 0 || this.nome.length == 0 || this.seguimento.length == 0 ){
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
.modalHeading{
    padding: 9px;
    background: #06307c;
    color: #FFFFFF;
}
.modalContent{
    min-height: 333px;
    padding: 44px;
}

</style>