<template>
    <div id="demo">
        <sidebar></sidebar>
        <!-- component template -->
        <!-- demo root element -->
        <div>
            <form id="search">
                Search <input name="query" v-model="searchQuery">
            </form>
            <demogrid
                :data="gridData"
                :columns="gridColumns"
                :filter-key="searchQuery">
            </demogrid>
        </div>

        <pre>{{ $data }}</pre>

        </div>

</template>

<script>

import Sidebar from '../components/principal/Sidebar'
import Demogrid from '../components/principal/Demogrid'

export default {
    // bootstrap the demo
    //name: '#demo',
    components: { Sidebar, Demogrid },
    data () {
        return {
            searchQuery: '',
            gridColumns: ['name', 'power'],
            gridData: [
                { name: 'Chuck Norris', power: Infinity },
                { name: 'Bruce Lee', power: 9000 },
                { name: 'Jackie Chan', power: 7000 },
                { name: 'Jet Li', power: 8000 }
            ]
        }
    },
    mounted: function(){
        console.log("bonina");

    },
    methods: {
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