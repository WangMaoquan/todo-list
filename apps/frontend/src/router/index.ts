import type { App } from 'vue';
import type { RouteRecordRaw, Router } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteNames } from './const';
import Task from '@/components/Task/index.vue';
import Login from '@/components/Login/index.vue';
import { SettingsRoute } from './settings';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/task',
    name: RouteNames.HOME,
  },
  {
    path: '/task',
    component: Task,
    name: RouteNames.TASK,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: Login,
    name: RouteNames.LOGIN,
    meta: {
      layout: false,
    },
  },
  SettingsRoute,
];

export function setupRouterGuard(router: Router) {
  router.beforeEach(() => {
    // todo start loading
  });
  router.afterEach(() => {
    // todo end loading
  });

  router.beforeEach((to, from, next) => {
    // todo check user
    next();
  });
}

let router: Router;
export const setupRouter = async (app: App) => {
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  app.use(router);
  setupRouterGuard(router);
  await router.isReady();
};

export function setRouterInstance(routerInstance: Router) {
  router = routerInstance;
}

export function getRouterInstance() {
  return router;
}
