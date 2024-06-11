import { createRouter, createWebHistory } from 'vue-router'


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
    component: () => import('@/views/decks/Show.vue'),
    meta: { title: 'Drawers' },
    props: true
  },
  {
    path: '/review',
    component: () => import('@/views/review/Index.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      hideLayout: true,
    },
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
