import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {path: '/', component: () => import('@/views/home.vue')}
  ]
});

export default router;