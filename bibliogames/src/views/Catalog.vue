<template>
  <div class="catalog">
    <section class="catalog-header text">
      <h1>Catalog</h1>
      <p>Explore our collection of games</p>
    </section>

    <section class="game-list">
        <gamecard 
            v-for="game in games.find(g => g.Page === Page)?.data" 
            :key="game.id" 
            :game="game" 
            @add-to-cart="addToCart" 
        />
    </section>
    <div class = NavButons>
        <button @click="prevPage()" :disabled="Page <= 1">Previous</button>
        <button @click="nextPage()" :disabled="games*numberOfGames < totalGames">Next</button>
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
        totalGames: 0,
        sort: 'average',
        order: 'ASC',
        maxPage: 1,
    };
  },
    methods: {
    async getXGames() {
            if (!this.games.find(g => g.Page === this.Page)){
                try{
                    const response = await axios.get('http://localhost:5001/gamesLimited', {
                    params: {
                        x: this.numberOfGames, // Nombre de jeux par page
                        page: this.Page, // Numéro de la page
                        sort: this.sort, // Colonne de tri
                        order: this.order, // Ordre de tri
                    },
                });
                const fetchedGames = {
                    Page: this.Page,
                    data: response.data,
                }
                    this.games.push(fetchedGames);
                    console.log(`page ${this.Page} fetched successefully.`)
                    this.storeGames();
                }
                catch (error) {
                    console.error(`Error fetching page ${this.Page}:`, error);
                }
            }
            else{
                console.log(`page ${this.Page} already fetched.`)
            }
        },
    async getNbGames() {
        try {
            const response = await axios.get('http://localhost:5001/gamesCount');
            this.totalGames = parseInt(response.data, 10); // Utilisation correcte de parseInt avec la base 10
            this.maxPage = Math.ceil(this.totalGames / this.numberOfGames); // Calcul du nombre total de pages
            console.log(`Total games: ${this.totalGames}, Max pages: ${this.maxPage}`);
        } catch (error) {
            console.error('Error fetching total number of games:', error);
        }
    },
    async storeGames(){
        localStorage.setItem('games', JSON.stringify(this.games));
        console.log('Games stored in localStorage:', this.games);
    },
    nextPage(){
        this.Page++;
        this.getXGames();
    },
    prevPage(){
        this.Page--;
        this.getXGames();
    },
    addToCart(game) {
            this.$emit('add-to-cart', game);
        },
    },
    created() {
        this.getNbGames();
        this.games = JSON.parse(localStorage.getItem('games')) || [];
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