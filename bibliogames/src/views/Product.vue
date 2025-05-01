<template>
  <div class="product-page">
    <div class="product-content">
      <div class="product-image-container">
        <img :src="game.ImageUrl" alt="Game Image" class="product-image" />
      </div>
      <div class="product-info">
        <h1>{{ game.Name }}</h1>
        <p class="year">{{ game.Year_ }}</p>
        <p class="price">{{ game.Price }} €</p>
        <p v-if="game.Average" class="rating">{{ Math.round(game.Average / 2 * 100) / 100 }} / 5 ★</p>
      </div>
    </div>
    <div class="product-tabs">
      <button class="tab-button" @click="toggleDescription">
          Description
          <span :class="{ rotated: !showDescription }">⌃</span>
      </button>
      <button class="tab-button" @click="toggleInfos">
          Infos
          <span :class="{ rotated: !showInfos }">⌃</span>
      </button>
    </div>
    <div class="product-description" v-if="showDescription">
      <h2>Description</h2>
      <p id = "desc" v-html="cleanedDescription()"></p>
    </div>
    <div class="product-infos" v-if="showInfos">
      <div class="info-row" v-for="(value, key, index) in infos" :key="key" :class="{ alt: index % 2 === 1 }">
        <div class="info-key">
          <strong>{{ key }}</strong>
        </div>
        : <span>{{ value }}</span>
      </div>
    </div>
    <div class="reviews-section">
      <div class="reviews-header">
        <h2>Reviews</h2>
        <button v-if="this.token" class="post-review-button" @click="toggleReviewForm()">
          <span v-if="!form">+</span><span v-if="form">-</span> Post Review
        </button>
      </div>
      <div v-if="form" class="review-form">
        <AddReview :gameID="id" @review-posted="toggleReviewForm()" />
      </div>
      <div class="review-separator"></div>
      <span v-if="reviews.length > 0"><ReviewProduct v-for="review in reviews" :key="review.ID" :review="review"/></span>
    </div>
  </div>
</template>
  
  <script>
import axios from 'axios';
import ReviewProduct from '../components/ReviewProduct.vue';
import AddReview from '../components/AddReview.vue';

  export default {
    components: {
      ReviewProduct,
      AddReview,
    },
    data() {
      return {
        id: 0,
        game: {},
        showDescription: false,
        showInfos: false,
        categories: [],
        families: [],
        implementations: [],
        expansions: [],
        designers: [],
        artists: [],
        mechanics: [],
        publishers: [],
        reviews: [],
        token: localStorage.getItem('token'),
        form: false,
      };
    },
    computed: {
      infos() {
        return {
          "Release Year": this.game.Year_ ?? '~',
          "Minimum Number of Players": this.game.MinPlayer ?? '~',
          "Maximum Number of Players": this.game.MaxPlayer ?? '~',
          "Average Game Duration (minutes)": this.game.PlayTime ?? '~',
          "Shortest Game Duration (minutes)": this.game.MinplayTime ?? '~',
          "Longest Game Duration (minutes)": this.game.MaxPlayTime ?? '~',
          "Minimum Recommended Age": this.game.MinAge ?? '~',
          "Number of People Trading it": this.game.Trading ?? '~',
          "Number of People Wishing to Own": this.game.Wishing ?? '~',
          "Average User Rating (out of 5)": this.game.Average != null ? ( Math.round(this.game.Average / 2 * 100) / 100 ) : '~',
          "Total Number of Ratings": this.game.NbRates ?? '~',
          "Categories": this.categories.length > 0 ? this.categories.map(category => category.Name).join(', ') : '~',
          "Families": this.families.length > 0 ? this.families.map(family => family.Name).join(', ') : '~',
          "Implementations": this.implementations.length > 0 ? this.implementations.map(implementation => implementation.Name).join(', ') : '~',
          "Expansions": this.expansions.length > 0 ? this.expansions.map(expansion => expansion.Name).join(', ') : '~',
          "Designers": this.designers.length > 0 ? this.designers.map(designer => designer.Name).join(', ') : '~',
          "Artists": this.artists.length > 0 ? this.artists.map(artist => artist.Name).join(', ') : '~',
          "Mechanics": this.mechanics.length > 0 ? this.mechanics.map(mechanic => mechanic.Name).join(', ') : '~',
          "Publishers": this.publishers.length > 0 ? this.publishers.map(publisher => publisher.Name).join(', ') : '~',
        };
      }
    },
    methods: {
      toggleDescription() {
        this.showDescription = !this.showDescription;
      },
      toggleInfos() {
        this.showInfos = !this.showInfos;
      },
      cleanedDescription() {
        if (!this.game.Description) return '';
        return this.game.Description.replace(/&#10;/g, '<br>');
      },
      toggleReviewForm() {
        this.form = !this.form;
      },
    },
    mounted() {
        this.id = this.$route.params.id;
        console.log('ID récupéré dans l’URL:', this.id);
        window.addEventListener("scroll", this.handleScroll);
        this.game = axios.get(`${process.env.VUE_APP_BACKEND_URL}/games/${this.id}`)
          .then(response => {
            this.game = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération du jeu:", error);
          });
        this.categories = axios.get(`${process.env.VUE_APP_BACKEND_URL}/games/${this.id}/categories`)
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des catégories:", error);
          });
        this.families = axios.get(`${process.env.VUE_APP_BACKEND_URL}/games/${this.id}/families`)
          .then(response => {
            this.families = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des familles:", error);
          });
        this.implementations = axios.get(`${process.env.VUE_APP_BACKEND_URL}/games/${this.id}/implementations`)
          .then(response => {
            this.implementations = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des implémentations:", error);
          });
        this.expansions = axios.get(`${process.env.VUE_APP_BACKEND_URL}/${this.id}/expansions`)  
          .then(response => {
            this.expansions = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des extensions:", error);
          });
        this.designers = axios.get(`${process.env.VUE_APP_BACKEND_URL}/games/${this.id}/designers`)
          .then(response => {
            this.designers = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des designers:", error);
          });
        this.artists = axios.get(`${process.env.VUE_APP_BACKEND_URL}/games/${this.id}/artists`)
          .then(response => {
            this.artists = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des artistes:", error);
          });
        this.mechanics = axios.get(`${process.env.VUE_APP_BACKEND_URL}/games/${this.id}/mechanics`)  
          .then(response => {
            this.mechanics = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des mécaniques:", error);
          });
        this.publishers = axios.get(`${process.env.VUE_APP_BACKEND_URL}/games/${this.id}/publishers`)
          .then(response => {
            this.publishers = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des éditeurs:", error);
          });
        this.review= axios.get(`${process.env.VUE_APP_BACKEND_URL}/reviews/${this.id}?limit=10&offset=0`)
          .then(response => {
            this.reviews = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des critiques:", error);
          });
    },
  };
  </script>
  
<style scoped>
.product-page {
  align-items: center;
  justify-content: center;
  padding: 5vh 10vw;
  background-color: #1e1e1e;
  min-height: 100vh;
  color: white;
}

.product-info h1,
.product-info p {
  margin: 0;
}

.product-content {
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 1400px;
  border-bottom: 1px solid #444;
  padding-bottom: 0;
}

.product-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: stretch; /* <-- Correction ici */
  border-right: 1px solid #444;
  height: 100%;
  padding: 20px;
}

.product-image {
  width: 90%;
  border-radius: 10px;
  object-fit: cover;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  gap: 0px; 
  color: #e7e7e7;
  padding-left: 3vw; 
}

.product-info h1 {
  font-size: 3rem;
  font-weight: bold;
}

.product-info .year,
.product-info .price,
.product-info .rating {
  font-size: 1.5rem;
  opacity: 0.8;
}

.product-tabs {
  display: flex;
  width: 100%;
  margin-top: 0; /* Pas d'espace inutile */
}

.tab-button {
  flex: 1;
  background-color: transparent;
  color: #6d6d6d;
  font-size: 1.2rem;
  padding: 1rem;
  border: none;
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: 0.3s ease, color 0.3s ease;
}

.tab-button:hover {
  background-color: #c0c0c0;
  opacity: .2;
}

.tab-button span {
  display: inline-block;
  transition: transform 0.3s ease;
}

.tab-button span.rotated {
  transform: rotate(180deg);
}

.product-description #desc{
  opacity: .6;
}

.product-description h1{
  opacity: .8;
}

.product-infos {
  width: 100%;
  background-color: #1e1e1e;
  color: white;
  margin-top: 2rem;
  overflow: hidden;
  font-size: 1.1rem;
}

.info-row {
  display: flex;
  align-items: center;
  padding: .5rem 1rem;
  background-color: #2a2a2a;
}

.info-row.alt {
  background-color: #1e1e1e;
}

.info-row strong {
  color: white;
  min-width: 150px;
}

.info-row span {
  color: #cccccc;
  margin-left: 10px;
}

.info-row {
  display: flex;
  align-items: center;
  padding: .5rem 1rem;
  background-color: #2a2a2a;
}

.info-row.alt {
  background-color: #1e1e1e;
}

.info-key {
  color: white;
  font-weight: bold;
  min-width: 30%; /* largeur fixe */
  text-align: left;
}

.info-value {
  color: #cccccc;
  margin-left: 0.5rem;
}

.reviews-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #444;
}

.reviews-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-review-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: white;
  border: 1px solid #444;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.post-review-button span {
  font-size: 1.5rem;
  line-height: 1;
}

.post-review-button:hover {
  background-color: white;
  color: #1e1e1e;
  border-color: #444;
  opacity: 0.7;
}

.review-form {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.review-separator {
  border-top: 1px solid #444;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>