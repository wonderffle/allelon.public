import { createRouter, createWebHistory } from 'vue-router'
import SignUpViewVue from '../views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signup',
      component: SignUpViewVue
    },
  ]
})

export default router
