<template>
  <div>
    <h1>Game Offers</h1>
    <button @click="addFormVisible = !addFormVisible">Add Offer</button>
    <AddOffer v-if="addFormVisible" class="offer-form"/>
    <ul>
      <GameOffer
        v-for="offer in this.offers[this.page - 1]?.data || []"
        :offer="offer"
        :key="offer.id"
        @add-to-cart="addToCart"
      />
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import GameOffer from '@/components/GameOffer.vue';
import AddOffer from '@/components/AddOffer.vue';

export default {
  components: {
    GameOffer,
    AddOffer,
  },
  data() {
    return {
      offers:[],
      limit: 5,
      page: 1,
      totalPages: 0,
      addFormVisible: false,
    };
  },
  methods: {
    async fetchOffers() {
      if (!this.offers[this.page - 1]) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/offersLimited?limit=${this.limit}&offset=${(this.page - 1) * this.limit}`);
          const fetchedOffers = {
              Page: this.page,
              data: response.data
          };
          this.offers.push(fetchedOffers);
          this.storeOffer();
        } catch (error) {
          console.error('Error fetching offers:', error);
        }
      }
    },
    async getNBOffers() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/offersLimited?limit=${this.limit}&page=${this.page}`);
        this.totalPages = Math.ceil(response.data.total / this.limit);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    },
    async storeOffer() {
      localStorage.setItem('offers', JSON.stringify(this.offers));
    },
    nextpage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.fetchOffers();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchOffers();
      }
    },
    addToCart(game) {
            this.$emit('add-to-cart', game);
        },
    goToSpecificPage() {
        if (this.isValidPage(this.goToPage)) {
            this.Page = this.goToPage;
            this.getXGames();
        }
    },
    isValidPage(page) {
        return page >= 1 && page <= this.maxPage;
    },
  },
  mounted() {
    this.getNBOffers();
    this.fetchOffers();
  },
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