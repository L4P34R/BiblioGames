<template>
    <div class="manage-users">
        <h1>Manage Users</h1>
        <p>Here you can manage all users of the platform. You can update their information and permissions.</p>
        <div class="user-list">
            <div class="user" v-for="(user, index) in Users" :key="user.ID" :class="{ even: index % 2 === 0, odd: index % 2 !== 0 }">
                <ProfilePic :userData="user" class="pp" style="--circle-size: 48px"/>
                <div class="user-grid">
                    <div class="field"><span class="label">Username</span><input class="value" v-model="editedUsers[index].UserName" /></div>
                    <div class="field"><span class="label">Email</span><input class="value" v-model="editedUsers[index].email" /></div>
                    <div class="field"><span class="label">First Name</span><input class="value" v-model="editedUsers[index].FirstName" /></div>
                    <div class="field"><span class="label">Last Name</span><input class="value" v-model="editedUsers[index].LastName" /></div>
                    <div class="field"><span class="label">Birthdate</span><input class="value" type="text" v-model="editedUsers[index].Birthdate" /></div>
                    <div class="field"><span class="label">Color</span><input class="value" v-model="editedUsers[index].Color" /></div>
                    <div class="field"><span class="label">Account Created</span><input class="value" type="text" v-model="editedUsers[index].AccountCreationDate" /></div>
                    <div class="field"><span class="label">Admin</span><input class="value" v-model="editedUsers[index].Admin" :disabled="userData.Admin !== 2" /></div>
                    <button class="update-btn" @click="updateUser(index)">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProfilePic from './ProfilePic.vue';

export default {
    props: {
        userData: {
            type: Object,
            required: true,
        },
    },
    components: {
        ProfilePic,
    },
    data() {
        return {
            Users: [],
            editedUsers: [],
        };
    },
    methods: {
        async fetchUsers() {
            try{
                const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/users`, {
                    headers: {
                        authorization: localStorage.getItem('token'),
                    }
                });
                this.Users = response.data;
                this.editedUsers = JSON.parse(JSON.stringify(response.data));
            } catch (error) {
                console.error("Erreur axios updateEmail:", error);
                if (error.response && error.response.status === 401) {
                    window.alert("Session expirée");
                    localStorage.removeItem("token");
                    this.$router.push('/');
                }
                else console.error("Error fetching users:", error);
            }
        },
        async updateUser(index) {
            console.log("Utilisateur à mettre à jour :", this.editedUsers[index]);
          const user = this.editedUsers[index];
          try {
            const response = await axios.put(`${process.env.VUE_APP_BACKEND_URL}/user`, user, {
              headers: {
                authorization: localStorage.getItem('token'),
              },
            });
            console.log("Utilisateur mis à jour :", response.data);
            window.alert("Utilisateur mis à jour !");
          } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            if (error.response && error.response.status === 403) {
              window.alert("Vous n'avez pas les droits pour effectuer cette modification.");
              window.location.reload();
            } else if (error.response && error.response.status === 401) {
              window.alert("Session expirée");
              localStorage.removeItem("token");
              window.location.reload();
              this.$router.push('/');
            } else {
              window.alert("Erreur lors de la mise à jour.");
            }
          }
        }
    },
    mounted() {
        this.fetchUsers();
    }
}
</script>

<style scoped>
.manage-users {
    margin: 2rem 0;
}

h1{
    margin: 0rem 2rem;
}

.manage-users > p {
    color: #d1d1d1;
    margin: .5rem 4rem;
}

.pp {
  width: 48px;
  margin-right: 1rem;
  flex-shrink: 0;
}

.user-list {
  display: flex;
  flex-direction: column;
}

.user {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #6d6d6d;
  border-bottom: 1px solid #6d6d6d;
  overflow-x: auto;
}

.user.even {
  background-color: #3d3d3d;
}

.user.odd {
  background-color: #1e1e1e;
}

.user-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1.5rem;
  flex: 1;
}

.field {
  display: flex;
  flex-direction: column;
  min-width: 120px;
}

.label {
  font-size: 0.75rem;
  color: #d1d1d1;
}

.value {
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: transparent;
  border: none;
  padding: 0.25rem 0.5rem;
  min-width: 120px;
}

.value:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.update-btn {
  background-color: #6d6d6d;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  height: fit-content;
  align-self: center;
}

.update-btn:hover {
  background-color: #888888;
}
</style>