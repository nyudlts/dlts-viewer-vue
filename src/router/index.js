import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "viewer" */ '../views/Home.vue')
  },
  {
    path: '/:resource/:identifier/:sequence',
    name: 'viewer',
    component: () => import(/* webpackChunkName: "viewer" */ '../views/Viewer.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
