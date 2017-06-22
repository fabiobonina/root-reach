<template>
    <div>
        <sidebar></sidebar>



            <pre>{{ $data }}</pre>

        </div>

</template>

<script>

import SideBar from '../components/principal/Sidebar'

export default {
    //name: '#user',
    components: { SideBar },
    data () {
        return {

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

</style>