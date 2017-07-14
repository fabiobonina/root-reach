<template>
<!-- template for the modal component -->
    <v-dialog v-model="dialog" persistent width="550px">
        <v-toolbar class="red" dark>
            <v-btn dark icon @click.native="$emit('close')"><v-icon>arrow_back</v-icon></v-btn>
            <v-toolbar-title>você tem certeza?</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-card-text>
                <h6>Você vai apagar:</h6>
                <h5>{{ modalItem.nome }}</h5>
            </v-card-text>
        </v-card>
        <v-toolbar class="red" dark><v-spacer></v-spacer>
            <v-toolbar-title>
                <v-btn flat dark @click.native="$emit('atualizar'); deleteItem()">
                    <span>Delete</span><v-icon dark>delete</v-icon>
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
            modalItem: this.data,
            dialog: true,
        }
    },
    computed: {
        hasErrors () {
            return this.errors.length > 0
        }
    },
    methods: {
        deleteItem: function(){
            const data = {
                '_id': this.modalItem._id,
                '_rev': this.modalItem._rev,
            }
            this.$store.state.delete(data)
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