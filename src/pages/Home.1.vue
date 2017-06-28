<template>
    <body id="demo">
        <sidebar></sidebar>
        <!-- component template -->
        <!-- demo root element -->
        <div>
        <v-card>
        <v-card-title>
        Nutrition
        <v-spacer></v-spacer>
        <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
        ></v-text-field>
        </v-card-title>
            <form novalidate @submit.stop.prevent="submit" id="search">
            <md-input-container>
                <label>Search</label>
                <md-textarea name="query" v-model="searchQuery"></md-textarea>
                <md-icon>search</md-icon>
            </md-input-container>
                Search <input name="query" v-model="searchQuery">
            </form>
            <demogrid
                :data="gridData"
                :columns="gridColumns"
                :filter-key="searchQuery">
            </demogrid>
        </v-card>
        </div>

        <pre>{{ $data }}</pre>

        </body>

</template>

<script>

import Sidebar from '../components/principal/Sidebar1'
import Demogrid from '../components/principal/Demogrid'

export default {
    // bootstrap the demo
    //name: '#demo',
    components: { Sidebar, Demogrid },
    data () {
        return {
            searchQuery: '',
            gridColumns: ['fantasia', 'nome', 'seguimento'],
            gridData: []
        }
    },
    mounted: function(){
        console.log("bonina");
        this.getAllItems();
    },
    methods: {
        getAllItems: function(){
            this.$store.state.recaregarClientes(this, 'gridData')
        },

    },
}
</script>

<style scoped>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}
</style>