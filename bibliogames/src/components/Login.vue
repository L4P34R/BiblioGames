<template>
    <div class="modal-wrapper" @click.self="$emit('closeLogin')">
        <div class="auth-container">
            <button class="close-btn" @click="$emit('closeLogin')">×</button>
            <div class="auth-left">
                <img src="@/assets/LogImage.webp" alt="Auth image" />
            </div>
            <div class="auth-right">
                <h1>Log in to your account</h1>
                <p>You don't have an account? <a href="#" @click="toRegister()">Register</a></p>
        
                <input type="text" placeholder="Email or user name" v-model="this.username" />
                <input type="password" placeholder="Enter your password" v-model="this.password" />
                              
                <div v-if="alert" class="alert">{{ alert }}</div>

                <button class="create-btn" @click="handleLogin">Log in</button>
        
                <div class="or-divider">Or log in with</div>
        
                <div class="social-buttons">
                    <button class="google-btn">Google</button>
                    <button class="apple-btn">Apple</button>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    name: 'Login',
    data() {
        return {
          username: '',
          password: '',
          alert: '',
        }
    },
    methods: {
        toRegister() {
            this.$emit('toRegister');
        },
        toggleLogin() {
            this.loginPage = !this.loginPage;
        },
        handleLogin() {
            if (!this.username || !this.password) {
                this.alert = 'Please enter username and password.';
                return;
            }

            axios.post(`${process.env.VUE_APP_BACKEND_URL}/Login`, {
                username: this.username,
                password: this.password
            })
            .then(res => {
                window.alert('Login successful');
                const token = res.data;
                localStorage.setItem('token', token);
                this.$emit('user-connected', token);
                this.$emit('closeLogin');
                window.location.reload();
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.error) {
                    this.alert = err.response.data.error;
                } else {
                    console.error(err);
                    this.alert = 'Login failed.';
                }
            });
        },
    }
  }

  </script>
  
  <style scoped>
  </style>