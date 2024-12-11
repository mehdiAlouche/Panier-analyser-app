import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Analytics from '../views/Analytics.vue';
import Products from '../views/Products.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      component: Login,
      meta: { requiresAuth: false },
      name : 'login'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      name : 'dashboard'
    },
    {
      path: '/analytics',
      component: Analytics,
      meta: { requiresAuth: true },
      name : 'analytics'
    },
    {
      path: '/products',
      component: Products,
      meta: { requiresAuth: true },
      name : 'products'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;