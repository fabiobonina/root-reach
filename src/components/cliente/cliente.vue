<template>
    <div>
        <div>
            <sidebar></sidebar>
        </div>
        <div>
            <md-toolbar class="md-dense">
                <h2 class="md-title" style="flex: 1">{{ title }}s</h2>
                <md-button class="md-icon-button md-accent" @click.native="showAddModal = true">
                    <md-icon>add</md-icon>
                </md-button>
            </md-toolbar>

            <md-layout md-gutter>
                <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
                    <div class="phone-viewport">
                        <md-list class="custom-list md-triple-line">
                            <md-list-item>
                            <md-avatar>
                                <img src="https://placeimg.com/40/40/people/1" alt="People">
                            </md-avatar>

                            <div class="md-list-text-container">
                                <span>Ali Connors</span>
                                <span>Brunch this weekend?</span>
                                <p>I'll be in your neighborhood doing errands...</p>
                            </div>

                            <md-button class="md-icon-button md-list-action">
                                <md-icon class="md-primary">star</md-icon>
                            </md-button>

                            <md-divider class="md-inset"></md-divider>
                            </md-list-item>
                        </md-list>
                    </div>

                    <div class="phone-viewport">
                        <md-list class="md-double-line">
                            <md-list-item>
                            <md-icon class="md-primary">phone</md-icon>

                            <div class="md-list-text-container">
                                <span>{{ cliente.fantasia }}</span>
                                <span>Fantasia</span>
                            </div>

                            <md-button class="md-icon-button md-list-action">
                                <md-icon>sms</md-icon>
                            </md-button>
                            </md-list-item>

                            <md-list-item class="md-inset">
                            <div class="md-list-text-container">
                                <span>(650) 555-1234</span>
                                <span>Mobile</span>
                            </div>

                            <md-divider class="md-inset"></md-divider>
                            </md-list-item>

                            <md-list-item>
                            <md-icon class="md-primary">email</md-icon>

                            <div class="md-list-text-container">
                                <span>aliconnors@example.com</span>
                                <span>Personal</span>
                            </div>

                            <md-button class="md-icon-button md-list-action">
                                <md-icon>sms</md-icon>
                            </md-button>
                            </md-list-item>

                            <md-list-item class="md-inset">
                            <div class="md-list-text-container">
                                <span>ali_connors@example.com</span>
                                <span>Work</span>
                            </div>
                            </md-list-item>
                        </md-list>
                    </div>
                </md-layout>
                <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
                    md-flex-xsmall <br>
                    md-flex-small="50" <br>
                    md-flex-medium="33"
                </md-layout>
                <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
                    md-flex-xsmall <br>
                    md-flex-small="50" <br>
                    md-flex-medium="33"
                </md-layout>
                <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
                    md-flex-xsmall <br>
                    md-flex-small="50" <br>
                    md-flex-medium="33"
                </md-layout>
            </md-layout>
            <div>
            
            </div>

            <pre>{{ $data }}</pre>
            <h1>t{{ $route.params.id }}</h1>
        </div>
    </div>
</template>

<script>
import Sidebar from '../principal/Sidebar'

export default {
    //name: 'clientes',
    components: { Sidebar },
    data () {
        return {
            title: 'Cliente',
            showAddModal: false,
            showEditModal: false,
            showDeletModal: false,
            errorMessage: '',
            successMessage: '',
            modalItem: {},
            _id: '',
            cliente: '',
            localidades: [],
            content: '',
            type: '',
            createdAt: '',
            clienteId: ''
        }
    },
    mounted: function(){
        console.log("bonina");
        //this.getAllItems();
    },
    route: {
    data ({ to }) {
      return this.$store.state.findClienteById(to.params.id).then(cliente =>
            this.$store.state.findLocalidadesByClienteId(cliente._id).then(localidades => ({
            cliente: cliente,
            localidades: localidades
        }))
      )
    }
  },
    methods: {
    },
}


</script>

<style scoped>
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
p.successMessage{
    background: #D8EFC2;
    color: #097133;
    border-left: 5px solid #097133;
    padding: 9px;
    margin: 22px 0;
}
p.errorMessage{
    background: #EFCBC2;
    color: #D71517;
    border-left: 5px solid #DA1527;
    padding: 9px;
    margin: 22px 0;
}


</style>