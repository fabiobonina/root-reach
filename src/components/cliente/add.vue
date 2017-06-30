<template>

<!-- template for the modal component -->

  <transition name="modal">
    <div class="modal">
        <div class="modalContainer">
            <v-toolbar class="cyan" light>
                <v-toolbar-title>Novo {{ title }}</v-toolbar-title>
                <v-btn light icon @click.native="$emit('close')">
                    <v-icon>clear</v-icon>
                </v-btn>
            </v-toolbar>
            <div class="modalContent">
                <form novalidate @submit.stop.prevent="submit">
                    <md-input-container>
                        <label>Fantasia</label>
                        <md-input type="text" v-model="fantasia"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>Nome</label>
                        <md-input type="text" v-model="nome"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>Seguimento</label>
                        <md-select v-model="seguimento">
                            <md-option value="bebida">Bebida</md-option>
                            <md-option value="industria">Industria</md-option>
                            <md-option value="saneamento">Saneamento</md-option>                                 
                            <md-option value="outro">Outro</md-option>
                        </md-select>
                    </md-input-container>
                </form>
                <template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md16 offset-md3>
        <v-card>
          <v-toolbar class="indigo" light>
            <v-toolbar-title>Novo {{ title }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <span class="title">Personal Info</span>
            <v-text-field
              label="Fantasia"
              class="mt-5"
              v-model="first"
              required
            ></v-text-field>
            <v-text-field
              label="Nome"
              hint="example of helper text only on focus"
              v-model="middle"
            ></v-text-field>
            <v-text-field
              label="Legal last name"
              hint="example of persistent helper text"
              persistent-hint
              v-model="last"
              required
            ></v-text-field>
            <small>*indicates required field</small>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
            </div>
            <div>
                <v-card>
                <v-bottom-nav absolute value="true" class="transparent">
                <v-btn flat dark @click.native="$emit('atualizar'); saveItem()">
                    <span>Salva</span>
                    <v-icon>save</v-icon>
                </v-btn>
                </v-bottom-nav>
                </v-card>
            </div>
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
            title: 'Cliente',
            fantasia: '', nome: '', seguimento: '', cadastro: '',
            clientes: []
        }
    },
    mounted: function(){
        console.log("bonina");
    },
    methods: {
        saveItem: function(){
            const data = {
                'type': 'cliente',
                'fantasia': this.fantasia,
                'nome': this.nome,
                'seguimento': this.seguimento,
                'cadastro': new Date().toJSON()
            }
            this.$store.state.create(data)
            this.fantasia = ''
            this.nome = ''
            this.seguimento = ''
        },
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
    margin-top: 44px;
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