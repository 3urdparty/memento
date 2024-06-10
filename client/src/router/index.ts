import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Home.vue'
import DeckIndexView from '@/views/decks/Index.vue'
import DeckShowView from '@/views/decks/Show.vue'
import ReviewView from '@/views/review/Index.vue'
import Login from '@/views/auth/Login.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      title: 'Home Page',
    },
  },
  {
    path: '/decks',
    component: DeckIndexView,
    meta: {
      title: 'Decks',
    },
  },
  { path: '/decks/:id', component: DeckShowView, meta: { title: 'Drawers' } },
  {
    path: '/review',
    component: ReviewView,
    meta: {
      title: 'Review',
      hideLayout: true,
    },
  },
  {
    path: '/login',
    meta: {

      hideLayout: true,
    },
    component: Login
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
