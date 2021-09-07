import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/components/Home.vue';
import Dishes from '@/components/Dishes.vue';
import Drinks from '@/components/Drinks.vue';
import Order from '@/components/Order.vue';
import Receipt from '@/components/Receipt.vue';

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dishes',
    name: 'Dishes',
    component: Dishes
  },
  {
    path: '/drinks',
    name: 'Drinks',
    component: Drinks
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/receipt',
    name: 'Receipt',
    component: Receipt
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
