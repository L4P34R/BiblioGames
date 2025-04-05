<template>
  <div class="catalog">
    <section class="catalog-header text">
      <h1>Catalog</h1>
      <p>Explore our collection of games</p>
    </section>

    <section class="game-list">
        <gamecard v-for="game in games"
        :key="game.id"
        :game="game"
        @add-to-cart="addToCart"
        />
    </section>
    <div class = NavButons>
        <button @click="Page--" :disabled="Page <= 1">Previous</button>
        <button @click="Page++" :disabled="games.length < numberOfGames">Next</button>
    </div>
  </div>
</template>

<script>
import Gamecard from '../components/Gamecard.vue';
import axios from 'axios';

export default {
  name: 'Catalog',
    components: {
        Gamecard,
    },
  data() {
    return {
        games: [],
        numberOfGames: 20,
        Page: 1,
        sort: 'average',
        order: 'DESC',
    };
  },
    methods: {
    async getXGames() {
            try{
                const response =await axios.get('http://localhost:5001/gamesLimited', {
                params: {
                    x: this.numberOfGames, // Nombre de jeux par page
                    page: this.Page, // Numéro de la page
                    sort: this.sort, // Colonne de tri
                    order: this.order, // Ordre de tri
                },
            });
                this.games = response.data;
            }
            catch (error) {
                console.error('Error fetching games:', error);
            }
        },
    addToCart(game) {
            this.$emit('add-to-cart', game);
        },
    },
    created() {
        this.getXGames();
    },
};
</script>

<style scoped>
.catalog {
  padding: 2rem;
  background-color: #1e1e1e;
  color: white;
}

.catalog-header {
  text-align: center;
  margin-bottom: 2rem;
}

.catalog-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.catalog-header p {
  font-size: 1.2rem;
  opacity: 0.7;
}

.game-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 1.5rem;
}

</style>