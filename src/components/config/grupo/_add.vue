<template>
<!-- template for the modal component -->
    <v-dialog v-model="dialog" persistent width="550px">
        <v-toolbar class="indigo" dark>
            <v-btn dark icon @click.native="$emit('close')">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Novo {{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-card-text>
                <v-text-field label="Nome" v-model="nome" required ></v-text-field>               
                
                <v-select label="Select" v-bind:items="states" v-model="segmentos" item-text="name" item-value="nasme" multiple chips max-height="auto" autocomplete>
                    <template slot="selection" scope="data">
                        <v-chip  close @input="data.parent.selectItem(data.item)" @click.native.stop class="chip--select-multi" :key="data.item">
                        <v-avatar></v-avatar>
                        {{ data.item.nome }}
                        </v-chip>
                    </template>
                    <template slot="item" scope="data">
                        <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.nome"></v-list-tile-title>
                        <v-list-tile-sub-title></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </template>
                </v-select>
                <v-checkbox v-bind:label="`Ativo: ${ativo.toString()}`" v-model="ativo"></v-checkbox>
                <small>*campos obrigatório</small>
                <p>{{ $data }}</p>
            </v-card-text>
        </v-card>
        <v-toolbar class="indigo" dark><v-spacer></v-spacer>
            <v-toolbar-title>
                <v-btn flat dark v-if="formValido()" @click.native="$emit('atualizar'); saveItem()">
                    <span>Salva</span>
                    <v-icon dark>save</v-icon>
                </v-btn>
            </v-toolbar-title>
        </v-toolbar>
    </v-dialog>
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
            estrutura: [],
            states: this.data,
            ativo: 'true',
            dialog: true,
            segmentos: []
        }
    },
    beforeCreate: function(){
        
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
                'segmentos': this.segmentos,
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