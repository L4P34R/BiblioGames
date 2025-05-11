<template>
    <div class="security">
        <div class="header">
            <ProfilePic :userData="{ FirstName: userData.FirstName, LastName: userData.LastName, Color: userData.Color }" style="--circle-size: 64px; width: 64px;" />
            <span class="names"> {{ this.userData.LastName.toUpperCase() }} {{ this.userData.FirstName }}</span>
        </div>
        <form>
            <div class="email">
                <label>Email</label>
                <input type="email" v-model="this.email">
                <button type="button" :disabled="!validEmail()" @click="updateEmail">Update</button>
            </div>

            <div class="sparator"></div>
            <div class="password">
                <label>New Password</label>
                <div class="password-input">
                    <input :type="showPwd1 ? 'text' : 'password'" v-model="pwd1">
                    <span class="toggle-visibility" @click="showPwd1 = !showPwd1">{{ showPwd1 ? '🙉' : '🙈' }}</span>
                </div>

                <label>Confirm Password</label>
                <div class="password-input">
                    <input :type="showPwd2 ? 'text' : 'password'" v-model="pwd2">
                    <span class="toggle-visibility" @click="showPwd2 = !showPwd2">{{ showPwd2 ? '🙉' : '🙈' }}</span>
                </div>

                <button type="button" :disabled="pwd1 === '' || pwd2 === ''" @click="updatePassword">Update</button>
            </div>
        </form>
    </div>
  
</template>

<script>
import ProfilePic from './ProfilePic.vue';
import axios from 'axios';

export default {
    props: {
        userData: {
            type: Object,
            required: true
        }
    },
    components: {
        ProfilePic,
    },
    data() {
        return {
            email: this.userData.email,
            pwd1:'',
            pwd2:'',
            showPwd1: false,
            showPwd2: false,
        }
    },
    methods:{
        validEmail() {
            if (this.email == this.userData.email) {
                return false
            } else if (this.email.includes('@') && this.email.includes('.')) {
                const atIndex = this.email.indexOf('@');
                const dotIndex = this.email.lastIndexOf('.');
                if (atIndex === -1 || dotIndex === -1 || dotIndex < atIndex) {
                    return false
                }
                return true
            } else return false;
        },

        updateEmail() {
            console.log("Email:", this.email);
            axios.put(`${process.env.VUE_APP_BACKEND_URL}/updateEmail`, 
                { newEmail: this.email },
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            )
            .then(response => {
                alert("Email mis à jour !");
                this.userData.email = this.email;
            })
            .catch(error => {
                console.error("Erreur axios updateEmail:", error);
                if (error.response && error.response.status === 401) {
                    window.alert("Session expirée");
                    localStorage.removeItem("token");
                    this.$router.push('/');
                }
                else if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    alert("Erreur réseau.");
                }
            });
        },

        updatePassword() {
            if (this.pwd1 !== this.pwd2) {
                alert("Les mots de passe ne correspondent pas.");
                return;
            }

            axios.put(`${process.env.VUE_APP_BACKEND_URL}/updatePassword`,
                { newPassword: this.pwd1 },
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            )
            .then(response => {
                alert("Mot de passe mis à jour !");
                this.pwd1 = '';
                this.pwd2 = '';
            })
            .catch(error => {
                console.error("Erreur axios updatePassword:", error);
                if (error.response && error.response.status === 401) {
                    window.alert("Session expirée");
                    localStorage.removeItem("token");
                    this.$router.push('/');
                }
                else if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    alert("Erreur réseau.");
                }
            });
        }
    }
}
</script>

<style scoped>
.security {
    max-width: 100%;
    box-sizing: border-box;
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem 3rem;
    box-sizing: border-box;
}

.email, .password {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

.email > input,

.password-input input {
    align-items: center;
    border-radius: 10px;
    background-color: transparent;
    border: 1px solid #888;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
    transition: box-shadow 0.3s ease;
    padding: 0.6rem;
    color: white;
    background-color: #303030;
    width: 50%;
    box-sizing: border-box;
    margin-bottom: 0;
}

input:focus {
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
    outline: none;
}

.email > label,
.password > label {
    margin-left: 0.5rem;
    color: white;
}

.password-input {
    display: flex;
    align-items: center;
    gap: 8px;
}

.toggle-visibility {
    cursor: pointer;
    font-size: 1.2rem;
    user-select: none;
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
    transition: all 0.3s ease;
    width: fit-content;
}

button:hover {
    background-color: #3d3d3d;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #444;
    border-color: #666;
}

.header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 3rem;
}

.names {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}
.sparator {
    width: 100%;
    height: 1px;
    background-color: #888;
    margin: 1rem 0;
}
</style>