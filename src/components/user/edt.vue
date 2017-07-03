<template>
<!-- template for the modal component -->
    <transition name="modal">
        <div class="modal">
            <div class="modalContainer">
                <v-toolbar class="blue" light>
                    <v-btn light icon @click.native="$emit('close')">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-toolbar-title>Editar {{ title }}</v-toolbar-title>
                </v-toolbar>
                <template>
                    <v-flex xs12 md16 offset-md1>
                        <v-card>
                        <v-card-text>
                            <v-text-field class="mt-5" required
                            label="Nome"
                            v-model="modalItem.nome"
                            hint="Nome completo"
                            ></v-text-field>
                            <v-text-field required
                            label="Usuario"
                            v-model="modalItem.user"
                            ></v-text-field>
                            <v-text-field required
                            label="Email"
                            v-model="modalItem.email"
                            hint="email@exemplo.com"
                            ></v-text-field>
                            <small>*campos obrigatório</small>
                            <p>{{$data}}</p>
                        </v-card-text>
                        </v-card>
                    </v-flex>
                </template>
                <v-toolbar class="blue" light>
                    <v-toolbar-title>
                        <v-btn flat light v-if="formValido()" @click.native="$emit('atualizar'); updateItem()">
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
    props: {
        data: {}
    },
    data () {
        return {
            errors: [],
            title: 'Usuario',
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
            if(this.modalItem.user.length == 0 || this.modalItem.nome.length == 0 || this.modalItem.email.length == 0 ){
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