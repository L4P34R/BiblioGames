<template>
  <div class="game-card">
        <div class = "game-image-container">
            <img :src="game.ImageUrl" :alt="game.Name" class="game-image" />
        </div>
        <div class="game-info">
          <h3>{{ game.Name }}</h3>
          <p>{{ game.Price }} €</p>
          <p v-if="game.Average">{{ game.Average }} / 10</p>
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
  background-color: #303030;
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
  width: 50%;
  aspect-ratio: 100 / 145; /* Maintient le ratio 100:145 */
  border-radius: 5px;
  margin: 0 auto 1rem auto;
  overflow: hidden; /* Cache les parties débordantes */
}

.game-image {
    width: 100%;
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
</style>