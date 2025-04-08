<template>
    <div class="modal-wrapper" @click.self="$emit('closeLogin')">
        <div class="auth-container">
            <button class="close-btn" @click="$emit('closeLogin')">×</button>
            <div class="auth-left">
                <img src="@/assets/LogImage.png" alt="Auth image" />
            </div>
            <div class="auth-right">
                <h1>Log in to your account</h1>
                <p>You don't have an account? <a href="#" @click="toRegister()">Register</a></p>
        
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Enter your password" />
        
                <button class="create-btn">Log in</button>
        
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
  export default {
    name: 'Register',
    methods: {
        toRegister() {
            this.$emit('toRegister');
        },
        toggleRegister() {
            this.registerPage = !this.registerPage;
        },
  }
}
  </script>
  
  <style scoped>
  </style>