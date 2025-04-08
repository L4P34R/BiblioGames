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
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }


  .auth-container {
    display: flex;
    width: 80%;
    height: 80%;
    background: #242424;
    overflow: hidden;
    color: white;
    font-family: sans-serif;
    position: relative;
    border-radius: 10px;
  }
  
  .auth-left {
    flex: 1;
    background-color: #303030;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  
  .auth-left img {
    min-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  
  .auth-left p {
    margin-top: 20px;
    font-size: 1.5em;
    text-align: center;
  }
  
  .auth-right {
    flex: 1;
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #242424;
    border-radius: 10px;
  }
  
  .auth-right h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  .auth-right a {
    color: #6d6d6d;
    text-decoration: none;
  }
  
  .name-fields {
    display: flex;
    gap: 10px;
    margin: 20px 0 10px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    background: #303030;
    border: none;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    color: white;
    width: 100%;
  }
  
  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9em;
    margin-bottom: 20px;
  }
  
  .create-btn {
    background-color: #d1d1d1;
    color : #242424;
    border: none;
    padding: 12px;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    width: 100%;
  }

  .create-btn:hover {
    background-color: #b0b0b0;
  }
  
  .or-divider {
    text-align: center;
    margin: 20px 0 10px;
    font-size: 0.9em;
    color: #aaa;
  }
  
  .social-buttons {
    display: flex;
    gap: 10px;
  }
  
  .google-btn,
  .apple-btn {
    flex: 1;
    background: #303030;
    border: .5px solid #949494;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .apple-btn:hover, .google-btn:hover {
    background: #5d5d5d;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 30px;
    background: transparent;
    border: none;
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }

  .img{
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
  }
  </style>