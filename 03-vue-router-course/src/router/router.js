import { createRouter, createWebHashHistory } from 'vue-router';
import isAuthenticatedGuard from './auth-guard';

const routes = [
  { path: '/', redirect: '/pokemon' },

  // Pokemon routes
  {
    path: '/pokemon',
    name: 'pokemon-layout',
    component: () =>
      import(
        /* webpackChunkName: "PokemonLayout" */ '@/modules/pokemon/layouts/PokemonLayout.vue'
      ),
    children: [
      {
        path: 'home',
        name: 'pokemon-home',
        component: () =>
          import(
            /* webpackChunkName: "ListPage" */ '@/modules/pokemon/pages/ListPage'
          ),
      },
      {
        path: 'about',
        name: 'pokemon-about',
        component: () =>
          import(
            /* webpackChunkName: "AboutPage" */ '@/modules/pokemon/pages/AboutPage'
          ),
      },
      {
        path: 'pokemonid/:id',
        name: 'pokemon-id',
        component: () =>
          import(
            /* webpackChunkName: "PokemonPage" */ '@/modules/pokemon/pages/PokemonPage'
          ),
        props: (route) => {
          const id = Number(route.params.id);
          return isNaN(id) ? { id: 1 } : { id };
        },
      },
      {
        path: '',
        redirect: { name: 'pokemon-home' },
      },
    ],
  },

  // DBZ routes
  {
    path: '/dbz',
    beforeEnter: [isAuthenticatedGuard],
    name: 'dbz-layout',
    component: () =>
      import(
        /* webpackChunkName: "DragonBallLayout" */ '@/modules/dbz/layouts/DragonBallLayout.vue'
      ),
    children: [
      {
        path: 'characters',
        name: 'dbz-characters',
        component: () =>
          import(
            /* webpackChunkName: "DbzCharacters" */ '@/modules/dbz/pages/Characters.vue'
          ),
      },
      {
        path: 'about',
        name: 'dbz-about',
        component: () =>
          import(
            /* webpackChunkName: "DbzAbout" */ '@/modules/dbz/pages/About.vue'
          ),
      },
      {
        path: '',
        redirect: { name: 'dbz-characters' },
      },
    ],
  },

  // Not found route
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () =>
      import(
        /* webpackChunkName: "NoPageFound" */ '@/modules/shared/pages/NoPageFound'
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const canAccess = () => {
  return new Promise((resolve) => {
    const random = Math.floor(Math.random() * 100);
    if (random > 50) {
      console.log('authenticated - canAccess');
      resolve(true);
    } else {
      console.log(random, 'not authenticated - canAccess');
      resolve(false);
    }
  });
};

// Guard global - Synchronous
// router.beforeEach((to, from, next) => {
//   const random = Math.floor(Math.random() * 100);
//   if (random > 50) {
//     console.log('authenticated');
//     next();
//   } else {
//     console.log(random, 'not authenticated');
//     next({ name: 'pokemon-home' });
//   }
// });

// Guard global - Asynchronous
// router.beforeEach(async (to, from, next) => {
//   const authorized = await canAccess();
//   authorized ? next() : next({ name: 'pokemon-home' });
// });

export default router;
