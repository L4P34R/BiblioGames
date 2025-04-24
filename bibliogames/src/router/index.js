import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import CatalogView from '@/views/Catalog.vue'
import Product from '@/views/Product.vue'

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
  },

  {
    path:'/product/:id',
    component: Product
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
