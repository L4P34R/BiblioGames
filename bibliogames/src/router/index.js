import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import CatalogView from '@/views/Catalog.vue'
import Product from '@/views/Product.vue'
import GameOffers from '@/views/GameOffers.vue'
import MyAccount from '@/views/MyAccount.vue'

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
    path: '/usedGames',
    name: 'UsedGames',
    component: GameOffers
  },

  {
    path:'/product/:id',
    name: 'Product Info',
    component: Product
  },

  {
    path:'/myAccount',
    name: 'MyAccount',
    component: MyAccount
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
