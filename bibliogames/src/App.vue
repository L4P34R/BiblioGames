<template>
  <div>
    <Header
    :token="token"
    @open-cart = "toggleCart()"
    @openLogin = "toggleLognin()"
    @openRegister = "toggleRegister()"
    @logout = "logout()"
    />
    <div class="body">
      <router-view 
      @add-to-cart="addToCart"
      />
    </div>
    <LoginPage 
      v-if="loginPage" 
    @toRegister="toggleLognin(); toggleRegister();"
    @closeLogin="toggleLognin()"
    @user-connected="getConnectionInfo"
      />
    <Register
    v-if="registerPage"
    @toLogin="toggleLognin(); toggleRegister();"
    @closeRegister="toggleRegister()"
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
import LoginPage from '@/components/Login.vue';
import Register from '@/components/Register.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Cart,
    LoginPage,
    Register,
  },
  data() {
    return {
      CartOpen: false,
      token: null,
      cart: {
        cartItems: [],
        totalPrice: 0,
        coupon: '',
        couponApplied: false,
      },
      loginPage: false,
      registerPage: false,
    };
  },
  methods: {
    toggleCart() {
      this.CartOpen = !this.CartOpen;
    },
    toggleLognin() {
      this.loginPage = !this.loginPage;
    },
    toggleRegister() {
      this.registerPage = !this.registerPage;
    },
    toggleConnected() {
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
        (item) => item.id === game.id
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
    getConnectionInfo(token) {
      this.token = token;
      console.log('Token:', this.token);
    },
    logout() {
      localStorage.removeItem('token');
      this.token = null;
      this.cart.cartItems = [];
      this.cart.totalPrice = 0;
      this.cart.coupon = '';
      this.cart.couponApplied = false;
      this.storeCart();
      alert('Logged out successfully.');
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
    this.token = localStorage.getItem('token');
  },
  beforeDestroy() {
    this.storeCart();
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


  /*Styles for login and registernd register*/

  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }


  .auth-container {
    display: flex;
    width: 80%;
    height: 80%;
    background: #242424;
    overflow: hidden;
    color: white;
    font-family: sans-serif;
    position: relative;
    border-radius: 10px;
  }
  
  .auth-left {
    flex: 1;
    width: 50%;
    background-color: #303030;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  
  .auth-left img {
    min-width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .auth-left p {
    margin-top: 20px;
    font-size: 1.5em;
    text-align: center;
  }
  
  .auth-right {
    flex: 1;
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #242424;
    border-radius: 10px;
    overflow: scroll;
  }
  
  .auth-right h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  .auth-right a {
    color: #6d6d6d;
    text-decoration: none;
  }
  
  .name-fields {
    display: flex;
    gap: 10px;
    margin: 20px 0 10px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    background: #303030;
    border: none;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    color: white;
    width: 100%;
  }

  input:focus{
    background: #4f4f4f;
  }
  
  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9em;
    margin-bottom: 20px;
  }

  .alert{
    color : red;
    font-size: 0.9em;
    margin-bottom: 10px;
    text-align: center;
    opacity: 0.8;
  }
  
  .create-btn {
    background-color: #d1d1d1;
    color : #242424;
    border: none;
    padding: 12px;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    width: 100%;
  }

  .create-btn:hover {
    background-color: #b0b0b0;
  }
  
  .or-divider {
    text-align: center;
    margin: 20px 0 10px;
    font-size: 0.9em;
    color: #aaa;
  }
  
  .social-buttons {
    display: flex;
    gap: 10px;
  }
  
  .google-btn,
  .apple-btn {
    flex: 1;
    background: #303030;
    border: .5px solid #949494;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .apple-btn:hover, .google-btn:hover {
    background: #5d5d5d;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 30px;
    background: transparent;
    border: none;
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }

  .img{
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
  }
</style>

<style scoped>
  .body{
    margin-top: 75px;
  }
</style>