import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UseInstruction from '../views/UseInstruction.vue'
import zero from '../views/0zero.vue'
import first from '../views/1first.vue'
import second from '../views/2second.vue'
import third from '../views/3third.vue'
// import third from '../views/third.vue'
// import forth from '../views/forth.vue'
// import nav from '../views/nav.vue'
import result from '../views/2second.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/zero' },
    { path: '/HomePage', component: HomePage , name:"HomePage" },
    { path: '/UseInstruction', component: UseInstruction, name:"UseInstruction" },
    { path: '/zero', component: zero , name:"zero" },
    { path: '/first', component: first, name:"first"},
    { path: '/result', component: result, name:"result"},
    { path: '/second', component: second, name:"second"},
    { path: '/third', component: third, name:"third"},
    // {
    //   path: '/nav', component: nav,
    //   redirect: '/first',
    //   children: [
    //     {
    //       path: '/first', component: first,
    //     },
    //     {
    //       path: '/second', component: second,
    //     },
    //     {
    //       path: '/third', component: third,
    //     },
    //     {
    //       path: '/forth', component: forth,
    //     },
    //     {
    //       path: '/result', component: result,
    //     }
    //   ]
    // },
   
  ]
})


export default router
