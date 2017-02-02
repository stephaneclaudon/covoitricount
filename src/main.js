// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import moment from 'moment'
import 'moment/locale/fr'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store.js'
import App from './App.vue'
import Home from './pages/home.vue'
import Config from './pages/config.vue'
import Add from './pages/add.vue'
import Edit from './pages/edit.vue'
import People from './pages/people.vue'
import List from './pages/pathList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/config',
    name: 'config',
    component: Config
  },
  {
    path: '/add',
    name: 'add',
    component: Add
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit
  },
  {
    path: '/people/:id',
    name: 'people',
    component: People
  },
  {
    path: '/list',
    name: 'list',
    component: List
  }
]
/* eslint-disable no-new */
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
}).$mount('#app')

moment.locale('fr')
