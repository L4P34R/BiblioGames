<template>
  <div class="offer-card">
    <h3>{{ this.gamename }}</h3>
    <p>{{ this.username }}</p>
    <p>{{ offer.Price }} €</p>
    <p>{{ offer.About }}</p>
    <p> {{ offer.Date }}</p>
    <button @click="$emit('add-to-cart', this.offer)">Ajouter au panier</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GameOffer',
  props: {
    offer: Object,
  },
  data() {
    return {
      username: '',
      gamename: '',
    };
  },
  methods: {
    async getUsername() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/Username/${this.offer.UserID}`);
      } catch (e) {
        console.error('Erreur getUsername', e);
      }
    },
    async getGamename() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/gamename/${this.offer.GameID}`);
        this.gamename = response.data.Name || '';
      } catch (e) {
        console.error('Erreur getGamename', e);
      }
    }
  },
  mounted() {
    this.getGamename();
    this.getUsername();
  }
};
</script>

<style scoped>

</style>