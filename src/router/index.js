import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Usuarios from '@/pages/Usuarios'
import Localidades from '@/pages/Localidades'
import Clientes from '@/pages/Clientes'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Usuarios', component: Usuarios },
    { path: '/hello', name: 'Hello', component: Hello },
    { path: '/clientes', name: 'Clientes', component: Clientes },
    { path: '/localidades', name: 'Localidades', component: Localidades }
  ]
})
