import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)



const routes = [
  {path: '/', redirect: 'login'},
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
            meta: { title: '登录页面', keepAlive: false }
  }, 
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
