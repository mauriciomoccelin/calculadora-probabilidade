import VueRouter from 'vue-router'
import Autenticacao from '@/components/Autenticacao'
import Estimativa from '@/components/Estimativa'
import Registro from '@/components/Registro'
import Evento from '@/components/Evento'
import * as firebase from 'firebase'

const router = new VueRouter({
  routes: [
    {
      path: '/estimativas',
      name: 'Estimativas',
      component: Estimativa,
      beforeEnter: (to, from, next) => {
        next(usuarioEstaLogado() ? true : '/')
      }
    },
    {
      path: '/eventos',
      name: 'Eventos',
      component: Evento,
      beforeEnter: (to, from, next) => {
        next(usuarioEstaLogado() ? true : '/')
      }
    },
    {
      path: '/registros',
      name: 'Registro',
      component: Registro
    },
    {
      path: '/',
      name: 'Autenticação',
      component: Autenticacao
    }
  ],
  mode: 'history'
})

function usuarioEstaLogado () {
  let  currentUser = firebase.auth().currentUser
  return !!currentUser
}

export default router