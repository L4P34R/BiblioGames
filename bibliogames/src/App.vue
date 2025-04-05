<template>
  <div>
    <Header @open-cart = "toggleCart"/>
    <router-view 
    @add-to-cart="addToCart"
    />
    <Cart 
      v-if="CartOpen" 
      :cart="cart" 
      @close-cart="toggleCart" 
      @calculateTotal="calculateTotal" 
      @remove-from-cart="removeFromCart" 
      @apply-coupon="applyCoupon" 
      @checkout="checkout" 
    />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Cart from '@/components/Cart.vue';

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
      cart: {
        cartItems: [],
        totalPrice: 0,
        coupon: '',
        couponApplied: false,
      },
    };
  },
  methods: {
    toggleCart() {
      this.CartOpen = !this.CartOpen;
    },
    toggleConnection() {
      this.connected = !this.connected;
    },
    storeCart() {
      const cart = {
        cartItems: this.cart.cartItems,
        totalPrice: this.cart.totalPrice,
        coupon: this.cart.coupon,
      };

      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Cart stored in localStorage:', cart);
    },
    addToCart(game) {
      const existingItem = this.cart.cartItems.find(
        (item) => item.id === game.ID
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.cartItems.push({
          id: game.ID,
          name: game.Name,
          image: game.ImageUrl,
          price: game.Price,
          quantity: 1,
        });
      }
      this.calculateTotal();
      this.storeCart();
    },
    calculateTotal() {
      this.cart.totalPrice = this.cart.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart(index) {
      const itemName = this.cart.cartItems[index].name;
      const confirmDelete = window.confirm(
        `Are you sure you want to remove "${itemName}" from the cart?`
      );
      if (confirmDelete) {
        this.cart.cartItems.splice(index, 1);
        this.calculateTotal();
        this.storeCart();
        alert(`"${itemName}" has been removed from the cart.`);
        return true;
      }
      return false;
    },
    handleQuantityChange(item, index) {
      if (item.quantity === 0) {
        const wasRemoved = this.removeFromCart(index);
        if (!wasRemoved) {
          item.quantity = 1;
        }
      } else {
        this.calculateTotal();
        this.storeCart();
      }
    },
    applyCoupon() {
      if (this.cart.coupon === 'DISCOUNT10' && !this.cart.couponApplied) {
        this.cart.totalPrice *= 0.9;
        this.cart.couponApplied = true;
        alert('Coupon applied successfully! 10% discount added.');
        this.storeCart();
      } else if (this.cart.couponApplied) {
        alert('Coupon has already been applied.');
      } else {
        alert('Invalid coupon code.');
      }
    },
    checkout() {
      alert('Proceeding to checkout...');
    },
  },
  mounted() {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart && storedCart.cartItems) {
      this.cart.cartItems = storedCart.cartItems;
      this.cart.totalPrice = storedCart.totalPrice || 0;
      this.cart.coupon = storedCart.coupon || '';
    }
    this.calculateTotal();
  },
};
</script>

<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #1e1e1e;
    color: white;
  }
</style>