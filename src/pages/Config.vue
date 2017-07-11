<template>
    <div>
    <sidebar></sidebar>
    <main>
        <v-container fluid>
            <v-tabs dark :scrollable="false">
                <v-tabs-bar slot="activators" class="cyan">
                    <v-tabs-slider class="yellow"></v-tabs-slider>
                    <v-tabs-item v-for="i in items" :key="i" :href="'#tab-' + i.item">
                        {{ i.title }}
                    </v-tabs-item>
                </v-tabs-bar>
                <v-tabs-content :key="1" :id="'tab-' + 1">
                    <v-card flat>
                        <v-card-text>
                            <router-view></router-view>
                        </v-card-text>
                    </v-card>
                </v-tabs-content>
                <v-tabs-content :id="'tab-' + 2">
                    <v-card flat>
                        <v-card-text>
                            <router-view name="grupo"></router-view>
                        </v-card-text>
                    </v-card>
                </v-tabs-content>
                <v-tabs-content :id="'tab-' + 3">
                    <v-card flat>
                        <v-card-text>
                            <router-view name="fab"></router-view>
                        </v-card-text>
                    </v-card>
                </v-tabs-content>
            </v-tabs>
        </v-container>
    </main>
    </div>
</template>
<script>
    import Sidebar from '../components/principal/Sidebar'

export default {
    //nome: '#user',
    components: { Sidebar },
    data () {
      return {
        text: 'Lorem ipsum dolor sit amet, consequat.',
        items: [
              { item: '1', title: 'Categoria', router: 'categoria' },
              { item: '2', title: 'Grupo', router: 'grupo' },
              { item: '3', title: 'Fabricante', router: 'fabricante' }
        ]
      }
    }
  }
</script>
