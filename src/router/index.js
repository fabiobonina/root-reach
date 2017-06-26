import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Cliente from '@/components/cliente/Cliente'
import Usuarios from '@/pages/Usuarios'
import Clientes from '@/pages/Clientes'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Usuarios', component: Usuarios },
    { path: '/hello', name: 'Hello', component: Hello },
    { path: '/clientes', name: 'Clientes', component: Clientes },
    { path: '/cliente/:id', name: 'Cliente', component: Cliente },
  ]
})
