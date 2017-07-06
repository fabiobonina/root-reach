<template>
    <div>
        <div>
            <sidebar></sidebar>
        </div>
        <main>
            <v-container fluid>
                
                <div class="title">Click on sidebar to re-open.</div><br/>
                <v-card>
                    <v-card-title>
                        <h6>{{ title }}: {{ cliente.fantasia }} | {{ cliente.nome }}</h6>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <div>
                        <router-view></router-view>
                        <md-layout md-gutter>
                            <md-layout md-flex-xsmall="150" md-flex-small="75" md-flex-medium="50">
                            </md-layout>
                            <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">                    
                            </md-layout>
                            <md-layout>
                                md-flex-medium="33"
                            </md-layout>
                        </md-layout>
                    </div>
                    <pre>{{ $data }}</pre>
                </v-card>
            </v-container>
        </main>
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
            errorMessage: '', successMessage: '',
            cliente: ''
        }
    },
    mounted: function(){
        console.log("bonina");
        //console.log(this.$route.params.id);
        //this.id = this.$route.params.id;
        this.getAllItems();
    },
    beforeCreate: function() {
         
    },
    methods: {
        getAllItems: function(){
            //console.log(this.$route.params.id);
            this.$store.state.findClienteById(this.$route.params.id).then(cliente => {
                    this.cliente = cliente
            })
        },
        updateItem: function(){
            this.$store.state.update(this.modalItem).then(results => {
                this.$store.state.findLocalidadesByClienteId(cliente._id).then(localidades => {
                    this.localidades = localidades
                })
            })
        },
        deleteItem: function(){
            const data = {
                '_id': this.modalItem._id,
                '_rev': this.modalItem._rev,
            }
            this.$store.state.delete(data).then(results => {
                this.$store.state.findLocalidadesByClienteId(cliente._id).then(localidades => {
                    this.localidades = localidades
                })
            })
        },
        selecItem: function(item){
            this.modalItem = item;
        },
        clearMassege: function(){
            this.errorMessage = '';
            this.successMessage = '';
        }
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
    width: 500px;
    background: #FFFFFF;
    margin: auto;
    margin-top: 0px;
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