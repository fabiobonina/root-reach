import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Cliente from '@/components/cliente/Cliente'
import LocalList from '@/components/cliente/localidade/LocalList'
import Usuarios from '@/pages/Usuarios'
import Clientes from '@/pages/Clientes'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/Usuarios', name: 'Usuarios', component: Usuarios },
    { path: '/hello', name: 'Hello', component: Hello },
    { path: '/clientes', name: 'Clientes', component: Clientes},
    { path: '/cliente/:id', name: 'Cliente', component: Cliente, children: [
        {path: '', components: {
            default: LocalList,
        }, name:'cliente'},
    ] },
  ]
})
