import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import firebase from './firebase'
import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)

new Vue({
  store,
  router,
  render: h => h(App),
  created: () => firebase.initializeAppFirebase() 
}).$mount('#app')
