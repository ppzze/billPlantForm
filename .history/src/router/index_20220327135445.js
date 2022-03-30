import Vue from 'vue'
import VueRouter from 'vue-router'
import Login  from '../views/login.vue'
import login from '../views/login2.vue'
import work from '../views/work.vue'
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
  },
  {
    path:'/work',
    component:work,
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
