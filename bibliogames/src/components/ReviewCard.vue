<template>
  <div class="quote-card">
    <h3>Review Title</h3>
    <div class="author">
        <img src="https://via.placeholder.com/40" alt="user" />
        <div>
        <strong>Author</strong>
        <div class="stars">
          <span v-for="n in parseInt(rating/2)" :key="n">★</span><span v-for="n in parseInt(5-erating/2)" :key="n">☆</span>
        </div>
        <p class="avis">This is a review.</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            rating: 3,
        }
    },
}
</script>

<style scoped>
.quote-card {
border: .7px solid #444;
border-radius: 10px;
padding: 1rem;
}

h3 {
    margin-left: 2rem;
}

.quote-card h2 {
font-size: 1.2rem;
margin-bottom: 0.5rem;
}

.author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author img {
width: 40px;
height: 40px;
border-radius: 50%;
margin-right: 10px;
}

.avis {
    opacity: .7;
    font-size: .8rem;
}
</style>