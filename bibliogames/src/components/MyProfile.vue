<template>
  <div class="modal">
    <h2>My Profile</h2>
    <form class="form-group">
        <div
            @click="triggerColorPicker"
            @mouseover="hovered = true"
            @mouseleave="hovered = false"
            class="color-circle"
            :style="{ backgroundColor: userData.Color }"
        >
            <span class="initials">{{ hovered ? '✏️' : initials }}</span>
        </div>
        <input type="color" ref="colorInput" v-model="userData.Color" style="display: none;" />

        <div class="names">
            <div class="First-name">
                <label>Prénom:</label>
                <input type="text" v-model="this.userData.FirstName" />
            </div>

            <div class="Last-name">
                <label>Nom:</label>
                <input type="text" v-model="this.userData.LastName" />
            </div>
        </div>
        <div class="username">
            <label>Username</label>
            <input type = "text" v-model="this.userData.UserName" />
        </div>
        <div class="birthdate">
            <label>Your Birthdate :</label>
            <input type="date" v-model="this.userData.Birthdate" />
        </div>

        <div v-if="alert" class="alert">{{ alert }}</div>

        <button type="button" @click="updateUserData()">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        token: {
            type: String,
            required: true,
        },
        userData:{
            type: Object,
            required: true,
        }
    },
    data() {
        return {
          hovered: false,
          alert: '',
        };
    },
    computed: {
      initials() {
        const first = this.userData.FirstName?.[0] || '';
        const last = this.userData.LastName?.[0] || '';
        return (first + last).toUpperCase();
      }
    },
    methods: {
        async updateUserData() {
          try {
            const response = await axios.put(
              `${process.env.VUE_APP_BACKEND_URL}/updateProfile`,
              this.userData,
              {
                headers: {
                  Authorization: this.token
                }
              }
            );
          } catch (e) {
            if (e.response && e.response.status === 401) {
              window.alert("Session expirée");
              localStorage.removeItem("token");
              this.$router.push('/');
            } else if (e.response && e.response.status === 400 && e.response.data?.error) {
              this.alert = e.response.data.error;
            } else {
              console.error("Erreur lors de la mise à jour du profil :", e);
            }
          }
        },
        triggerColorPicker() {
          this.$refs.colorInput.click();
        }
    },
}
</script>

<style scoped>
.modal {
    max-width: 100%;
    box-sizing: border-box;
}

form{
    width: 100%;
}

h2{
    color: white;
    margin: 1rem 3rem;
}

.color-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin: 1rem;
    transition: filter 0.3s ease;
}
.color-circle:hover {
  filter: brightness(0.6);
}
.initials {
  color: white;
  pointer-events: none;
  font-size: 30px;
  letter-spacing: 1px;
  font-family: serif;
  filter: saturate(0%) brightness(150%);
  opacity: 0.4;
}

.names {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 1rem 0;
  margin: 0 1rem;
  width: 90%;
  justify-content: space-evenly;
  justify-self: center;
  border-bottom: 1px solid #444;
  box-sizing: border-box;
}
.names > div {
    flex: 1;
    padding: 0 1rem;
}

.names > div > input {
    border-radius: 10px;
    background-color: transparent;
}

.names > div > label {
    margin: 0 .5rem;
}

.username{
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1rem 0;
    width: 50%;
}

.username > input {
    margin: 0 1rem;
    border-radius: 10px;
    background-color: transparent;
    width: 50%;
}

.username> label {
    margin: 0 1.5rem;
}

.birthdate {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1rem 0;
    width: 50%;
}

.birthdate > input {
    color: white;
    margin: 0 1rem;
    padding: .5rem;
    border-radius: 10px;
    background-color: #303030;
    width: 100%;
    box-sizing: border-box;
}

input {
    border: 1px solid #888;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
    transition: box-shadow 0.3s ease;
}

input:focus {
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
    outline: none;
}

.birthdate > label {
    margin: 0 1.5rem;
}

form {
  width: 100%;
}

button {
    background-color: #262626;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    border: .5px solid #949494;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    margin: 1rem;
}

button:hover {
  background-color: #3d3d3d;
}
</style>