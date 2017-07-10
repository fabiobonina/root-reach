import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Hello from '@/components/Hello'
import Bens from '@/pages/Bens'
import BemList from '@/components/bem/BemList'
import BemTab from '@/components/bem/BemTab'
import BemView from '@/components/bem/BemView'
import Clientes from '@/pages/Clientes'
import Cliente from '@/components/cliente/Cliente'
import Localidades from '@/pages/Localidades'
import LocalList from '@/components/cliente/localidade/LocalList'
import LocalTab from '@/components/cliente/localidade/LocalTab'
import LocalView from '@/components/cliente/localidade/LocalView'
import Usuarios from '@/pages/Usuarios'
import Config from '@/pages/Config'
import ProdList from '@/components/config/produto/ProdList'
import GrupEqList from '@/components/config/grupoEquip/GrupEqList'
import FabList from '@/components/config/fabricante/FabList'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/Usuarios', name: 'Usuarios', component: Usuarios },
    { path: '/hello', name: 'Hello', component: Hello },
    { path: '/clientes', component: Clientes},
    { path: '/cliente/:id', component: Cliente,
        children: [
            {path: '', components: { default: LocalTab, }, name:'Cliente'},
        ]
    },
    { path: '/localidades', component: Localidades, name:'Localidades'},
    { path: '/localidade/:id', component: LocalView,
        children: [
            {path: '', components: { default: BemList, }, name:'Localidade'},
        ]
    },
    { path: '/bens', component: Bens, name:'Bens'},
    { path: '/bem/:id', component: BemView, name:'Bem'},
    { path: '/config', component: Config,
        children: [
            {path: '', components: { 
                default: ProdList,
                fab: FabList,
                grupo: GrupEqList }, name:'Configuração'},
        ]
    },
  ]
})
