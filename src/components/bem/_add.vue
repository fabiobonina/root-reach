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
                            <v-flex xs6>
                                <v-select v-bind:items="states" required single-line auto
                                v-model="tipo"
                                label="Tipo"
                                ></v-select>
                            </v-flex>
                            <v-text-field required
                            label="Nome"
                            v-model="nome"
                            ></v-text-field>
                            <v-text-field
                            label="Regional"
                            v-model="regional"
                            ></v-text-field>
                            <v-text-field required
                            label="municipio"
                            v-model="municipio"
                            ></v-text-field>
                            <v-text-field required hint="Exemplo: PE"
                            label="UF"
                            v-model="uf"
                            ></v-text-field>
                            <v-text-field
                            label="Ativo"
                            v-model="ativo"
                            ></v-text-field>
                            <small>*campos obrigatório</small>
                        </v-card-text>
                        </v-card>
                    </v-flex>
                    
                </template>
                <v-toolbar class="indigo" dark>
                    <v-toolbar-title>
                        <v-btn flat dark v-if="formValido()" @click.native="$emit('atualizar'); saveItem()">
                            <span>Salva</span>
                            <v-icon dark>save</v-icon>
                        </v-btn>
                    </v-toolbar-title>
                </v-toolbar>
                <pre>{{ $data }}</pre>
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
            title: 'localidade',
            cliente: this.data,
            nome: '', tipo: '', regional: '', municipio: '', uf: '', ativo: '', cadastro: '',
            states: ['Capitação','Elevatoria','ETA','ETE','Industria','Poço','Outro']
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
        tipo: function (data) {
            this.formValido();
        },
        nome: function (data) {
            this.formValido();
        },
        municipio: function (data) {
            this.formValido();
        },
        uf: function (data) {
            this.formValido();
        }
    },
    methods: {
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
                this.$store.state.findLocalidadesByClienteId(cliente._id).then(localidades => {
                    this.localidades = localidades
                })
                 //this.$store.state.recaregarlocalidades(this, 'localidades')
            })
            this.tipo = ''
            this.nome = ''
            this.regional = ''
            this.municipio = ''
            this.uf = ''
            this.ativo = ''

        },
        ehVazia () {
            if(this.tipo.length == 0 || this.nome.length == 0 || this.municipio.length == 0 || this.uf.length == 0){
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