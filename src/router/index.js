import Vue from 'vue'
import VueRouter from 'vue-router'
import KgLogin from '../pages/kgLogin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'kglogin',
    component: KgLogin
  },
  {
    path:'/paper',
    name:'paper',
    component:()=>import('../pages/paper.vue')
  },
  {
    path:'/grade',
    name:'grade',
    component:()=>import('../pages/grade.vue')
  },
  {
    path:'/createpaper',
    name:'createpaper',
    component:()=>import('../pages/createPaper.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
