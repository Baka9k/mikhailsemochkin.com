import Vue from 'vue'
import Router from 'vue-router'

import About from '@/components/About'
import Experience from '@/components/Experience'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Login from '@/components/Login'
import LoginError from '@/components/LoginError'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/experience',
      name: 'Experience',
      component: Experience
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/login-error',
      name: 'LoginError',
      component: LoginError
    },
    {
      path: '/',
      redirect: '/about'
    }
  ]
})
