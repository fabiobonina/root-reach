<template>
<!-- template for the modal component -->
<v-layout row justify-center>
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card >
<<<<<<< HEAD
        <v-toolbar class="indigo" dark>
            <v-btn dark icon @click.native="$emit('close')">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Novo {{ title }}</v-toolbar-title>
        </v-toolbar>
        
        <v-card-title class="indigo dark--text darken-1--text " dark>Select Country</v-card-title>
        <v-divider></v-divider>
=======
        <v-card-title class="indigo" dark>
            <v-btn dark icon @click.native="$emit('close')">
                    <v-icon>arrow_back</v-icon>
            </v-btn>
          <span class="headline" dark>Novo {{ title }}</span>
        </v-card-title>
>>>>>>> origin/master
        <v-card-text>
            <v-text-field label="Nome" v-model="nome" required></v-text-field>
            <small>*campos obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
<<<<<<< HEAD
        <v-divider></v-divider>
        <v-card-actions class="indigo" dark>
        <v-spacer></v-spacer>
          <v-btn dark flat @click.native="dialog = false">Close</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
=======
>>>>>>> origin/master
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
                            <v-text-field label="Nome" v-model="nome" required></v-text-field>
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
                <p>{{$data}} </p>
      </v-card>
    </v-dialog>
  </v-layout>
                
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
            title: 'ordem',
            dialog: true,
            nome: '',
            teste:''
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