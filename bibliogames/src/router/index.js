import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import CatalogView from '@/views/Catalog.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Accueil',
    component: HomeView
  },

  {
    path: '/catalog',
    name: 'Catalog',
    component: CatalogView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
