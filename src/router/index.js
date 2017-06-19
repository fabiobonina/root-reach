import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Usuarios from '@/pages/Usuarios'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Usuarios', component: Usuarios },
    { path: '/hello', name: 'Hello', component: Hello }
  ]
})
