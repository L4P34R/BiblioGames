<template>
  <div class="game-card">
        <div class = "game-image-container">
            <img loading="lazy" :src="game.ImageUrl" :alt="game.Name" class="game-image" />
        </div>
        <div class="game-info">
          <h3>{{ game.Name }}</h3>
          <p>{{ game.Price }} €</p>
          <div v-if = "game.Average">
            <span v-for="n in Math.floor(Math.round(game.Average / 2 * 100) / 100)" :key="'full-' + n">
              <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24
                  14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21z" />
              </svg>
            </span>
            <span v-if="Math.round(game.Average * 100) / 100 % 2 >= 1" key="half" class="half-star">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="halfGradient">
                    <stop offset="50%" stop-color="currentColor" />
                    <stop offset="50%" stop-color="transparent" />
                  </linearGradient>
                </defs>
                <path fill="url(#halfGradient)" d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21z" />
                <path fill="none" stroke="currentColor" stroke-width="1" d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21z" />
              </svg>
            </span>
            <span v-else-if="Math.floor(Math.round(game.Average / 2 * 100) / 100) != 5">
              <svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24
                  14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21z" />
              </svg>
            </span>
            <span v-for="n in 5 - Math.ceil(game.Average / 2)" :key="'empty-' + n">
              <svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24
                  14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21z" />
              </svg>
            </span>
            <p v-if="game.Average">{{ Math.round(game.Average / 2 * 100) / 100 }} / 5</p>
          </div>
          <div class="buttons">
            <button class="btn">View Details</button>
            <button @click="addToCart()" class="btn secondary">Add to Cart</button>
          </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'GameCard',
    props: {
        game: {
        type: Object,
        required: true,
        },
    },
    data() {
        return {
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.game);
        },
    },

}
</script>

<style scoped>

.game-card {
  background-color: #242424;
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: .5rem;
  width: 20rem;
  display: flex; /* Active Flexbox */
  flex-direction: column; /* Aligne les éléments verticalement */
}

.game-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem; /* Maintient le ratio 100:145 */
  border-radius: 5px;
  margin: 0 auto 1rem auto;
  overflow: hidden; /* Cache les parties débordantes */
}

.game-image {
    height: 100%;
    width: auto;
  object-fit: contain;
}

.game-info {
  margin-top: 1rem; /* Ajoute un espace entre l'image et les infos */
  border-top: 1px solid #444;
  flex-grow: 1; /* Permet à cette section de prendre tout l'espace disponible */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.game-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.1rem;
  display: block;
}

.game-info p {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 0.2rem;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
}

.btn {
  background-color: #303030;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  border: 0.5px solid #949494;
  cursor: pointer;
  font-size: 1rem;
}

.btn.secondary {
    background-color: white;
    color: black;
    }

button:hover {
  opacity: 0.8;
}


.half-star {
  display: inline-block;
  vertical-align: middle;
  width: 1rem;
  height: 1rem;
}
.half-star svg {
  width: 100%;
  height: 100%;
}

.star {
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
}
</style>