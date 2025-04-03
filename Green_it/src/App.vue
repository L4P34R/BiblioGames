<template>
  <div>
    <Header @open-cart = "toggleCart"/>
    <router-view />
    <Cart v-if="CartOpen" @close-cart = "toggleCart"/>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Cart from '@/components/Cart.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Cart,
  },
  data() {
    return {
      CartOpen: false,
      connected: false,
    };
  },
  methods: {
    toggleCart() {
      this.CartOpen = !this.CartOpen;
    },
    toggleConnection() {
      this.connected = !this.connected;
    }
  },
  mounted() {
  }

}
</script>

<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #1e1e1e;
    color: white;
  }
</style>