import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Home.vue'
import DeckIndexView from '@/views/decks/Index.vue'
import DeckShowView from '@/views/decks/Show.vue'
import { DecksService } from '@/services/DecksService'
import ReviewView from '@/views/review/Index.vue'
import Login from '@/views/auth/Login.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home Page',
    },
  },
  {
    path: '/decks',
    component: () => import('@/views/decks/Index.vue'),
    meta: {
      title: 'Decks',
    },
  },
  {
    path: '/decks/:slug',
    component: DeckShowView,
    meta: { title: 'Drawers' },
    props: true
  },
  {
    path: '/review',
    component: () => import('@/views/review/Index.vue'),
    meta: {
      title: 'Review',
      hideLayout: true,
    },
  },
  {
    path: '/login',
    components: () => import('@/views/auth/Login.vue'),
    meta: {
      hideLayout: true,
    },
    component: Login
  },

  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
