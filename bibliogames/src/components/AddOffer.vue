<template>
  <form class="offer-form" @submit.prevent="submitOffer">
    <input v-model="offer.Name" type="text" placeholder="Game Name" required />
    <input v-model="offer.Price" type="number" placeholder="Price (€)" required />
    <select v-model="offer.Damage" required>
      <option disabled value="">Condition</option>
      <option>New</option>
      <option>Good</option>
      <option>Used</option>
      <option>Damaged</option>
    </select>
    <textarea v-model="offer.About" placeholder="About this offer..." required></textarea>
    <button type="submit">Add Offer</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      offer: {
        Name: '',
        Price: '',
        Damage: '',
        About: ''
      }
    };
  },
  methods: {
    async submitOffer() {
      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/offers`, this.offer);
        this.$emit('offer-added');
        this.offer = {
          Name: '',
          Price: '',
          Damage: '',
          About: ''
        };
      } catch (err) {
        console.error('Erreur lors de l’ajout de l’offre :', err);
      }
    }
  }
}
</script>

<style scoped>
.offer-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}
.offer-form input,
.offer-form select,
.offer-form textarea {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #999;
  background-color: #2e2e2e;
  color: white;
  width: 300px;
}
.offer-form textarea {
  resize: vertical;
  min-height: 80px;
}
.offer-form button {
  padding: 0.5rem 1rem;
  background-color: #4f4f4f;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
.offer-form button:hover {
  background-color: #6d6d6d;
}
</style>