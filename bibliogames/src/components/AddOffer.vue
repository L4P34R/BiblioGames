<template>
  <form class="offer-form" @submit.prevent="submitOffer">
    <input v-model="Name" type="text" placeholder="Game Name" list="game-names" required />
    <datalist id="game-names">
      <option v-for="name in filteredNames" :key="name" :value="name" />
    </datalist>
    <input v-model="offer.Price" type="number" placeholder="Price (€)" required />
    <select v-model="offer.Damage" required>
      <option disabled value="">Condition</option>
      <option>New</option>
      <option>Good</option>
      <option>Used</option>
      <option>Damaged</option>
    </select>
    <textarea v-model="offer.About" placeholder="About this offer..." required></textarea>
    <button type="submit">Add Offer</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      Names: [],
      Damage: '',
      Name: '',
      offer: {
        UserID: null,
        GameID: null,
        Price: '',
        Damage: null,
        About: '',
        Date: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
    };
  },
  computed: {
    filteredNames() {
      const input = this.Name.toLowerCase();
      return this.Names
        .filter(name => typeof name === 'string')
        .filter(name => name.toLowerCase().includes(input));
    }
  },
  methods: {
    async submitOffer() {
      try {
        let damage = null;
        if (this.offer.Damage === 'New') {
          damage = 0;
        } else if (this.offer.Damage === 'Good') {
          damage = 1;
        } else if (this.offer.Damage === 'Used') {
          damage = 2;
        } else if (this.offer.Damage === 'Damaged') {
          damage = 3;
        }
        this.offer.Damage = damage;
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/gamesByName/${this.Name}`);
          this.offer.GameID = response.data.ID;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // Crée le jeu s'il n'existe pas
            const createResponse = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/games/${ this.Name }`);
            this.offer.GameID = createResponse.data.ID;
          } else {
            throw error;
          }
        }
        try {
          const userResponse = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/User`, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          });
          this.offer.UserID = userResponse.data.id;
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
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/offers`, this.offer);
        this.$emit('offer-added');
        this.offer = {
          UserID: null,
          GameID: null,
          Name: '',
          Price: '',
          Damage: null,
          About: '',
          Date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };
        window.location.reload();
      } catch (err) {
        console.error('Erreur lors de l’ajout de l’offre :', err);
      }
    }
  },
  async mounted() {
    try {
      const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/gameNames`);
      for (const game of response.data) {
        this.Names.push(game.Name);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des noms de jeux :', err);
    }
  }
}
</script>

<style scoped>
.offer-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}
.offer-form input,
.offer-form select,
.offer-form textarea {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #999;
  background-color: #2e2e2e;
  color: white;
  width: 300px;
}
.offer-form textarea {
  resize: vertical;
  min-height: 80px;
}
.offer-form button {
  padding: 0.5rem 1rem;
  background-color: #4f4f4f;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
.offer-form button:hover {
  background-color: #6d6d6d;
}
</style>