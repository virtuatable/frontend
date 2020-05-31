import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import campaigns from './nested/campaigns.js'
import redirect_if_authenticated from '@/lib/hooks/redirect_if_authenticated.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: redirect_if_authenticated
  },
  {
    path: '/signup',
    name: 'Register',
    component: Register,
    beforeEnter: redirect_if_authenticated
  },
  ...campaigns
]

const router = new VueRouter({
  routes
})

export default router
