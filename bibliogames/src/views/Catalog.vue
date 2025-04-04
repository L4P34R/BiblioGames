<template>
  <div class="catalog">
    <section class="catalog-header text">
      <h1>Catalog</h1>
      <p>Explore our collection of games</p>
    </section>

    <section class="game-list">
        <gamecard v-for="game in games" :key="game.id" game="game"/>
    </section>
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
    };
  },
    methods: {
    async getAllGames() {
            try{
                const response = await axios.get('http://localhost:5000/games')
                this.games = response.data;
                console.log('Games fetched successfully:');
            }
            catch (error) {
                console.error('Error fetching games:', error);
            }
        },
    },
    created() {
        this.getAllGames();
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

</style>