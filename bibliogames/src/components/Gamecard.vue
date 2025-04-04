<template>
  <div class="game-card">
        <img :src="game.URL" :alt="game.name" class="game-image" />
        <div class="game-info">
          <h3>{{ game.name }}</h3>
          <p>{{ game.price }}</p>
          <div class="buttons">
            <button class="btn">View Details</button>
            <button class="btn secondary">Add to Cart</button>
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
  padding: 1rem;
  width: 20rem;
  height: 15rem;
}

.game-image {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #444;
  margin-bottom: 1rem;
}

.game-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.game-info p {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 1rem;
}
.buttons {
  display: flex;
  justify-content: space-between;
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