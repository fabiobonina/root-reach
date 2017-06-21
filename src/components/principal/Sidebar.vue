<template>
    
    <div id="app"class="phone-viewport">
        <md-toolbar>
            <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
                <md-icon>menu</md-icon>
            </md-button>
            <h1 class="md-title" style="flex: 1">{{ title }}</h1>

            <md-button class="md-fab md-clean md-mini" @click.native="toggleRightSidenav">
                <md-avatar>
                    <img :src="currentUser.photoURL" alt="Avatar">
                </md-avatar>
            </md-button>
        </md-toolbar>
        <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
        <div>
            <md-toolbar class="md-dense">
            <div class="md-toolbar-container">
                <h3 class="md-title">Menu</h3>
            </div>
            </md-toolbar>
            <md-list>
            <md-list-item><router-link to="/clientes">Clientes</router-link></md-list-item>
            <md-list-item><router-link to="/localidades">Localidades</router-link></md-list-item>
            <md-list-item><router-link to="/usuarios">Usuarios</router-link></md-list-item>
            <md-list-item>Sair</md-list-item>
            </md-list>
        </div>
        </md-sidenav>

    <md-sidenav class="md-right" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
    <md-toolbar>
      <div class="md-toolbar-container">
        <h3 class="md-title"></h3>
        <md-avatar class="md-right">
        </md-avatar>
      </div>
      
    </md-toolbar>

    <md-button class="md-raised md-accent" @click.native="closeRightSidenav">Close</md-button>
  </md-sidenav>
  <md-layout md-gutter>
    <md-layout md-flex="33">
        
    </md-layout>
    <md-layout>
    
    </md-layout>
  </md-layout>
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
        title: 'Hello Vue!',
        }
    },
    methods: {
        toggleLeftSidenav () {
            this.$refs.leftSidenav.toggle()
        },
        toggleRightSidenav () {
            this.$refs.rightSidenav.toggle()
        },
        closeRightSidenav () {
            this.$refs.rightSidenav.close()
        },
        open (ref) {
            console.log('Opened: ' + ref)
        },
        close (ref) {
            console.log('Closed: ' + ref)
        }
    }
}
</script>

<style scoped>



</style>