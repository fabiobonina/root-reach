<template>
<!-- template for the modal component -->
    <v-dialog v-model="dialog" persistent width="550px">
        <v-toolbar class="blue" dark>
            <v-btn dark icon @click.native="$emit('atualizar')">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Editar {{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-card-text>
                <v-text-field required label="Nome" v-model="modalItem.nome"></v-text-field>
                <v-select label="Select" v-bind:items="states" v-bind:itens="modalItem.segmentos" v-model="modalItem.segmentos" item-text="name" item-value="name" multiple chips max-height="auto" autocomplete>
                    <template slot="itens" scope="props">
                        <v-chip  close @input="props.parent.selectItem(props.item)" @click.native.stop class="chip--select-multi" :key="props.item">
                        <v-avatar></v-avatar>
                        {{ props.item.nome }}
                        </v-chip>
                    </template>
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
                <v-checkbox v-bind:label="`Ativo: ${modalItem.ativo.toString()}`" v-model="modalItem.ativo" dark></v-checkbox>
                <small>*campos obrigatório</small>
                <p>{{$data}}</p>
            </v-card-text>
            
        </v-card>
        <v-toolbar class="blue" dark><v-spacer></v-spacer>
            <v-toolbar-title>
                <v-btn flat dark v-if="formValido()" @click.native="$emit('atualizar'); updateItem()">
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
        data: {},
        dados: {}
    },
    data () {
        return {
            errors: [],
            title: 'grupo',
            modalItem: this.data,
            states: this.dados,
            dialog: true,
            segmentos: []
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
            if( this.modalItem.nome.length == 0){
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