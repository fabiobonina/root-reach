<template>
    <div>
        <div>
            <sidebar></sidebar>
        </div>
        <main>
            <v-container fluid>
                <v-card>
                    <v-card-title>
                        <h6>{{ cliente.fantasia }} > {{ localidade.tipo }} - {{ localidade.nome }}</h6>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <div>
                        <router-view></router-view>
                    </div>
                    <pre>{{ $data }}</pre>
                </v-card>
            </v-container>
        </main>
    </div>
</template>

<script>
import Sidebar from '../../principal/Sidebar'


export default {
    //name: 'localidades',
    components: { Sidebar },
    data () {
        return {
            title: 'Localidade',
            errorMessage: '', successMessage: '',
            localidade: '',
            cliente: '',
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
            this.$store.state.findLocalidadeById(this.$route.params.id).then(localidade => {
                    this.localidade = localidade
                    this.getCliente()
            })
        },
        getCliente: function(){
            //console.log(this.$route.params.id);
            this.$store.state.findClienteById(this.localidade.clienteId).then(cliente => {
                    this.cliente = cliente
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