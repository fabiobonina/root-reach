<template>
<!-- template for the modal component -->
    <transition name="modal">
        <div class="modal">
            <div class="modalContainer">
                <v-toolbar class="indigo" light>
                    <v-btn light icon @click.native="$emit('close')">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-toolbar-title>Novo {{ title }}</v-toolbar-title>
                </v-toolbar>
                <template>
                    <v-flex xs12 md16 offset-md1>
                        <v-card>
                        <v-card-text>
                            <v-text-field class="mt-5" required
                            label="Nome"
                            v-model="nome"
                            hint="Nome completo"
                            ></v-text-field>
                            <v-text-field required
                            label="Usuario"
                            v-model="user"
                            ></v-text-field>
                            <v-text-field required
                            label="Email"
                            v-model="email"
                            hint="email@exemplo.com"
                            ></v-text-field>
                            <small>*campos obrigatório</small>
                        </v-card-text>
                        </v-card>
                    </v-flex>
                </template>
                <v-toolbar class="indigo" light>
                    <v-toolbar-title>
                        <v-btn flat light v-if="formValido()" @click.native="$emit('atualizar'); saveItem()">
                            <span>Salva</span>
                            <v-icon light>save</v-icon>
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
            title: 'Usuario',
            nome: '', email: '', user: '',
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
        user: function (data) {
            this.formValido();
        },
        nome: function (data) {
            this.formValido();
        },
        email: function (data) {
            this.formValido();
        }
    },
    methods: {
        saveItem: function(){
            this.errors = []
            if(this.formValido()){
                const data = {
                    'type': 'user',
                    'user': this.user,
                    'nome': this.nome,
                    'email': this.email,
                    'dataCad': new Date().toJSON()
                }
                this.$store.state.create(data)
                this.nome = ''
                this.email = ''
                this.user = ''
            }
        },
        ehVazia () {
            if(this.user.length == 0 || this.nome.length == 0 || this.email.length == 0 ){
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