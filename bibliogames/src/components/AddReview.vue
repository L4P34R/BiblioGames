<template>
  <div class="add-review">
    <h2>Post a Review</h2>
    <form @submit.prevent="submitReview">
      <div class="form-group">
        <label for="rating">Rating: {{ (rating / 2).toFixed(1) }} / 5</label>
        <input type="range" id="rating" v-model="rating" min="1" max="10" step="1" />
      </div>
      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea id="comment" v-model="comment" rows="4" placeholder="Share your thoughts..."></textarea>
      </div>
      <button type="submit" class="submit-button" @click="postReview()">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        gameID : {
            type: Number,
            required: true
        },
    },
  data() {
    return {
      rating: 1,
      comment: '',
    };
  },
  methods: {
    async postReview() {
      try {
        let reviewData = null;
        try {
          const userResponse = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/User`, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          });

          reviewData = {
            GameId: this.gameID,
            Note: this.rating,
            Content: this.comment,
            UserId: userResponse.data.id,
          };
        } catch (error) {
          const status = error.response?.status;
          const expired = error.response?.data?.expired;

          if ((status === 403) || (status === 401 && expired)) {
            alert('Votre session a expiré. Veuillez vous reconnecter.');
            localStorage.removeItem('token');
            window.location.reload();
            return;
          } else {
            throw error;
          }
        }

        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/Review`, { reviewData });
        alert('Thank you for your review!');
        window.location.reload();
      } catch (error) {
        console.error('Error posting review:', error);
      }
    }
},
  mounted() {
  }
};
</script>

<style scoped>
.add-review {
  background-color: #454545;
  padding: 2rem;
  border-radius: 8px;
  color: #f6f6f6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: .2px solid #e7e7e7;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
  font-size: 0.95rem;
  color: #f6f6f6;
}

input[type="range"] {
  width: 100%;
  accent-color: #b0b0b0;
}

textarea {
  width: 100%;
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #888888;
  background-color: #4f4f4f;
  color: #f6f6f6;
  resize: vertical;
  font-size: 0.95rem;
}

.submit-button {
    background-color: #303030;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    border: .5px solid #949494;
    cursor: pointer;
    font-size: 1rem;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #3d3d3d;
}
</style>