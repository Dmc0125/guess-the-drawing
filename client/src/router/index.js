import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import Game from '@/views/Game.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (from.path === '/game') {
        sessionStorage.clear();
      }

      next();
    },
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
    beforeEnter: (to, from, next) => {
      const name = sessionStorage.getItem('name');

      if (name) {
        next();
      } else {
        next({
          path: '/',
          query: { redirect: to.fullPath },
        });
      }
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
