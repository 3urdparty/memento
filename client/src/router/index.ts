import { useAuth } from '@/composables/auth';
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
    name: 'Login',
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

const { isAuthenticated } = useAuth();


router.beforeEach((to, from, next) => {
  console.log(!isAuthenticated.value && to.name !== 'Login')
  if (
    // make sure the user is authenticated
    !isAuthenticated.value &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return next({ name: 'Login' });
  } else
    return next();
})
export default router
