// src/routers/index.ts
import { useNProgress } from '@vueuse/integrations/useNProgress';
import { createRouter, createWebHistory } from 'vue-router';
import { ROUTER_WHITE_LIST } from '@/config';
import { initDynamicRouter } from '@/routers/modules/dynamicRouter';
import { errorRouter, layoutRouter, staticRouter } from '@/routers/modules/staticRouter';
import { useUserStore } from '@/stores';

const { start, done } = useNProgress(0, {
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [...layoutRouter, ...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

console.log('Registered routes:', router.getRoutes());

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  console.log('Navigating to:', to.path, 'Token:', userStore.token);
  start();
  document.title = (to.meta.title as string) || (import.meta.env.VITE_WEB_TITLE as string);

  // Allow whitelisted routes (e.g., /login, /403, /404)
  if (ROUTER_WHITE_LIST.includes(to.path)) {
    console.log('Route in whitelist:', to.path);
    return next();
  }

  // Redirect to login if no token
  if (!userStore.token) {
    console.log('No token, redirecting to /login');
    return next('/login');
  }

  // Load dynamic routes for authenticated users
  await initDynamicRouter();
  next();
});

router.onError((error) => {
  done();
  console.warn('Router error:', error.message);
});

router.afterEach(() => {
  done();
});

export default router;
