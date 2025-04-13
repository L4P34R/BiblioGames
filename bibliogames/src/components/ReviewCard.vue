<template>
  <div class="quote-card">
    <h3>Review Title</h3>
    <div class="author">
        <img src="https://via.placeholder.com/40" alt="user" />
        <div>
        <strong>Author</strong>
        <div class="stars">
          <span v-for="n in Math.floor(rating / 2)" :key="'full-' + n">
            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24
                14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21z" />
            </svg>
          </span>
          <span v-if="rating % 2 >= 1" key="half" class="half-star">
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
          <span v-for="n in 5 - Math.ceil(rating / 2)" :key="'empty-' + n">
            <svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24
                14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21z" />
            </svg>
          </span>
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