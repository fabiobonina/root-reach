<template>

<!-- template for the modal component -->

  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
        <md-toolbar>
                        <div class="md-toolbar-container">
                            <h3 class="md-title">Novo {{ title }}</h3>
                        </div>
                    </md-toolbar>
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
                    </div>
                    <div>
                        <md-bottom-bar md-theme="teal">
                            <md-bottom-bar-item md-icon="cancel" @click.native="$emit('close')">Cancelar</md-bottom-bar-item>
                            <md-bottom-bar-item md-icon="save" @click.native="$emit('atualizar'); saveItem()">Salva</md-bottom-bar-item>
                        </md-bottom-bar>
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