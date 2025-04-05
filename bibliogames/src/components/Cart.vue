<template>
  <div class="cart-container">
    <h2>My Cart</h2>
    <div class="cart-items">
      <div class="cart-item" v-for="(item, index) in cartItems" :key="index">
        <img :src="item.image" alt="item image" class="item-image" />
        <div class="item-info">
          <p class="item-name">{{ item.name }}</p>
          <input 
            type="number" 
            v-model.number="item.quantity" 
            min="0" 
            @change="handleQuantityChange(item, index)" 
          />
          <p class="item-price">{{ (item.price * item.quantity).toFixed(2) }} €</p>
        </div>
        <button class="delete" @click="removeFromCart(index)">🗑</button>
      </div>
    </div>
    <div class="cart-footer">
      <div class="total">
        <span>Total</span>
        <span>{{ totalPrice.toFixed(2) }} €</span>
      </div>
      <div class="coupon">
        <input 
          type="text" 
          placeholder="Do you have a promo code?" 
          v-model="coupon" 
        />
        <button id="applyCoupon" @click="applyCoupon">Apply</button>
      </div>
      <div class="actions">
        <button @click="closeCart">Close</button>
        <button @click="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    cart: {
      type: Object,
      required: true,
      default: () => ({
        cartItems: [],
        totalPrice: 0,
        coupon: '',
      }),
    },
  },
  data() {
    return {
      coupon: '',
    };
  },
  computed: {
    cartItems() {
      return this.cart.cartItems;
    },
    totalPrice() {
      return this.cart.totalPrice;
    },
  },
  methods: {
    handleQuantityChange(item, index) {
      if (item.quantity === 0) {
        this.removeFromCart(index);
      } else {
        this.$emit('calculateTotal');
      }
    },
    removeFromCart(index) {
      this.$emit('remove-from-cart', index);
    },
    applyCoupon() {
      this.$emit('apply-coupon', this.coupon);
    },
    closeCart() {
      this.$emit('close-cart');
    },
    checkout() {
      this.$emit('checkout');
    },
  },
};
</script>

<style scoped>
.cart-container {
  position: fixed;
  top: 80px;
  right: 1rem;
  background: #242424;
  border-radius: 10px;
  width: 400px;
  height: 80vh;
  margin: auto;
  border: #444 1px solid;
}

h2 {
  padding: 20px;
}

.cart-items {
  overflow-y: auto;
  background: #1e1e1e;
  width: 100%;
  height: 55%;
}
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}
.item-info {
  flex-grow: 1;
}
.item-name {
  font-weight: bold;
}
.item-price {
  font-weight: bold;
}

.delete {
  margin-right: 20px;
  background: inherit;
  border: none;
}

.cart-footer {
  border-top: 1px solid #ccc;
  padding-top: 15px;
  padding: 20px;
}
.total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.coupon {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
}
#applyCoupon {
  margin-left: auto;
}
.actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.cart-footer button {
  background: #303030;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  border: 0.5px solid #949494;
  cursor: pointer;
  font-size: 1rem;
}

button {
  cursor: pointer;
}
</style>