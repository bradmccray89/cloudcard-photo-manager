import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/Downloader',
    component: () => import('../components/Downloader'),
    children: [
      {
        path: '',
        redirect: 'API'
      },
      {
        path: 'API',
        name: 'Api',
        component: () => import('../components/Api')
      },
      {
        path: 'Login',
        name: 'Login',
        component: () => import('../components/Login')
      },
      {
        path: 'Repeat',
        name: 'Repeat',
        component: () => import('../components/Repeat')
      },
      {
        path: 'Status',
        name: 'Status',
        component: () => import('../components/Status')
      },
      {
        path: 'Storage',
        name: 'Storage',
        component: () => import('../components/Storage')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

export default router
