<template>
  <div class="review">
    <div class="review-header">
      <div class="review-author">{{ review.UserName }}</div>
      <div class="review-rating">
        <div class="stars">
          <span v-for="n in Math.floor(review.Note / 2)" :key="'full-' + n">
            <svg class="star filled" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24
                14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21z" />
            </svg>
          </span>
          <span v-if="review.Note % 2 == 1" key="half" class="half-star">
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
          <span v-for="n in 5 - Math.ceil(review.Note / 2)" :key="'empty-' + n">
            <svg class="star empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24
                14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="review-body">
      <p>{{ review.Review }}</p>
    </div>
    <div class="review-footer">
      <span class="review-date">{{ new Date(review.Date).toLocaleDateString() }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReviewProduct',
  props: {
    review: {
      type: Object,
      required: true
    }
  },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.review {
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 16px;
  color: #f6f6f6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 0.2px solid #e7e7e7;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.review-author {
  font-weight: bold;
  font-size: 1.1em;
  color: #f6f6f6;
}

.review-rating .star {
  font-size: 1.2em;
}

.review-body {
  margin-bottom: 8px;
  font-size: 1em;
}

.review-footer {
  text-align: right;
  font-size: 0.9em;
  accent-color: #b0b0b0;
}

.half-star {
  display: inline-block;
  vertical-align: middle;
  width: 1rem;
  height: 1rem;
  color: #ffc107;
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

.filled {
  color: #ffc107;
}

.empty {
  color: #ccc;
}
</style>