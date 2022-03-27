import Vue from 'vue'
import VueRouter from 'vue-router'
import Login  from '../views/login.vue'
import login from '../views/login2.vue'
Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/login'},
  {
    path: '/login',
    name: 'login',
    component:Login,
    // component: () => import('../views/login'),
            // meta: { title: '登录页面', keepAlive: false }
  }, 
  {
    path:'/login2',
    component:login,
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
