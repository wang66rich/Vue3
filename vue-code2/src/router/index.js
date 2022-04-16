import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/testCounter",
    name: "TestCounter",
    component: () => import('../views/TestCounter.vue'),
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
    path: '/dynamicArguments',
    name: 'DynamicArguments',
    component: () => import ('../views/DynamicArguments.vue')
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
