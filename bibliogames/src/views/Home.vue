<template>
  <div class="home">
    <section class="hero text">
      <h1>BiblioGames</h1>
      <p>Games everywhere, for everyone</p>
      <div class="filters">
        <button class="btn">New Games</button>
        <button class="btn secondary">Used Games</button>
      </div>
    </section>
    <div class="hero-img">
      <img loading="lazy" src="@/assets/HomeImage.webp" alt="Home Image" />
    </div>

    <section class="reviews text">
      <h2>Reviews</h2>
      <p>Some reviews from previous buyers</p>
      <div class="quotes">
        <review-card v-for="review in reviews"
        :key="review.id"
        :review="review" />
      </div>
    </section>
  </div>
</template>

<script>
import ReviewCard from '@/components/ReviewCard.vue'
import axios from 'axios';

export default {
    name: 'Home',
    components: {
        ReviewCard,
    },
    data() {
        return {
            reviews: [],
        }
    },
    methods:{
        getReviews(){
          axios.get(`${process.env.VUE_APP_BACKEND_URL}/latestReviews`, {
            params: {
              limit: 10
            }
          })
          .then(res => {
            this.reviews = res.data;
          })
        }
    },
    mounted(){
      this.getReviews();
    }
}
</script>

<style scoped>
    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    }

    body {
    font-family: 'Arial', sans-serif;
    background-color: #1e1e1e;
    color: white;
    }

    h1, h2, h3{
        color: white;
    }

    .home {
    padding: 0;
    background-color: #1e1e1e;
    color : white;
    }

    .text {
        margin: 0 2rem;
    }

    .hero {
    text-align: center;
    padding: 4rem 0;
    }

    .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    }

    .hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: white;
    opacity: .7;
    }

    .filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    }

    .btn {
    background-color: #303030;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    border: .5px solid #949494;
    cursor: pointer;
    font-size: 1rem;
    }

    .btn.secondary {
    background-color: white;
    color: black;
    }

    .btn:hover {
        opacity: .8;
    }
    .btn.secondary:hover {
        opacity: .8;
    }

  .hero-img {
    position: relative;
    width: 100%;
    height: 30vw;
    overflow: hidden;
    background-color: #e5e5e5;
  }

  .hero-img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .reviews {
    padding: 2rem 0;
  }

  .reviews h2 {
    font-size: 1.8rem;
  }

  .reviews p {
    color: #ccc;
    margin-bottom: 1.5rem;
  }

    .quotes {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    }
</style>