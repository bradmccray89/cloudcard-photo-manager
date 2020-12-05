import Vue from 'vue'
import VueRouter from 'vue-router'
import Api from '../components/Api.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/api',
    name: 'Api',
    component: Api
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login')
  },
  {
    path: '/repeat',
    name: 'Repeat',
    component: () => import('../components/Repeat')
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import('../components/Status')
  },
  {
    path: '/storage',
    name: 'Storage',
    component: () => import('../components/Storage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
