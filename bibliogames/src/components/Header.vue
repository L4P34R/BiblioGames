<template>
  <header>
    <img load="'lazy'" src="../assets/BiblioGamesLogo.png" alt="Logo" />
    <div class="header-right">
        <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Catalog</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#" @click="openCart">Cart</a></li>
        </ul>
        </nav>
        <ul id="profilinterface">
        <li v-if="!this.connected" id = "connexion"><a href="#">Login</a></li>
        <li v-if="!this.connected" id = "inscription"><a href="#">Sign Up</a></li>
        <li v-if="this.connected" id = "moncompte"><a href="#">My Account</a></li>
        <li v-if="this.connected" id = "deconnexion"><a href="#">Logout</a></li>
        </ul>
    </div>
  </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
    },
    methods: {
        toggleConnection() {
        this.connected = !this.connected;
        },
        openCart() {
            this.$emit('open-cart');
        }
    }

}
</script>

<style>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #242424;
    margin: 0;
    color: white;
    width: 100vw;
    border-bottom: 1px solid #444;
}

.header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 30px;
}

header img {
    height: 75px;
    margin-left: 1rem;
}

nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
}


nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 10px 15px;
    border-radius: 5px;
    width: 100%;
}

nav ul li a:hover {
    background-color: #333;
}

.header-right > ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 10px;
    margin-right: 3vw ;
}

.header-right > ul li a {
    text-decoration: none;
    padding: 8px 15px;
    border-radius: 5px;
    font-size: 16px;
}

#connexion a {
    border: 1px solid white;
    color: white;
    background: transparent;
}

#inscription a {
    background-color: white;
    color: black;
}

#profilinterface li:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
}
</style>