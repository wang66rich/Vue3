import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: "/testCounter",
    name: "TestCounter",
    component: () => import('../views/TestCounter.vue'),
  },
  {
    path: "/testAnync",
    name: "TestAnync",
    component: () => import('../views/TestAsync.vue'),
 },
  {
    path: "/testAnync1",
    name: "TestAnync1",
    component: () => import('../views/TestAsync1.vue'),
 },
  {
    path: "/testAnync2",
    name: "TestAnync2",
    component: () => import('../views/TestAsync2.vue'),
 },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/parent',
    name: 'parent',
    component: () => import('../views/Parent.vue'),
  },
  {
    path: '/tele',
    name: 'tele',
    component: () => import('../views/tele.vue'),
  },
  {
    path: '/transition',
    name: 'transition',
    component: () => import('../views/Transition.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/dynamicArguments',
    name: 'DynamicArguments',
    component: () => import ('../views/DynamicArguments.vue')
  },
  {
    path: '/globalApi',
    name: 'globalApi',
    component: () => import ('../views/GlobalApi.vue')
},
  {
    path: '/SlotName',
    name: 'SlotName',
    component: () => import('../views/SlotName.vue'),
  },
  {
    path: '/slotScopes',
    name: 'slotScopes',
    component: () => import('../views/SlotScopes.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
