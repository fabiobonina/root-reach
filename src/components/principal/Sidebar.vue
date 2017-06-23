<template>
    
    <div id="app"class="phone-viewport">
        <div>
            <md-toolbar class="md-dense" md-theme="green">
                <router-link to="/"><md-button><md-icon>home</md-icon></md-button></router-link>
                <router-link to="/clientes"><md-button>Clientes</md-button></router-link>
                <router-link to="/localidades"><md-button>Localidades</md-button></router-link>
                <router-link to="/usuarios"><md-button>Usuarios</md-button></router-link>
            </md-toolbar>
        </div>

  </div>

</template>

<script>

export default {
    name: 'app',
    components: {
    },
    computed: {
    },
    data () {
        return {
        }
    },
    methods: {
    }
}
</script>

<style scoped>

</style>