<template>
    <section class="my-account">
        <div class="sidebar">
            <div class="sidebar-header">
                <button class="back-btn" @click="$router.go(-1)">
                    &lt;
                </button>
                <h2>My Account</h2>
            </div>
            <div class="sidebar-content">
                <ul>
                    <li @click="this.activetab = 'profile'"><span>My Profile</span></li>
                    <li @click="this.activetab = 'security'"><span>Security</span></li>
                    <li @click="this.activetab = 'orders'"><span>My Orders</span></li>
                    <li @click="this.activetab = 'wishlist'"><span>My Wishlist</span></li>
                    <li @click="this.activetab = 'offers'"><span>My Offers</span></li>
                    <li @click="this.activetab = 'reviews'"><span>My Reviews</span></li>
                </ul>
            </div>
            <div class="admin-section" v-if="this.userData.Admin > 0">
                <h2>Admin</h2>
                <ul>
                    <li @click="this.activetab = 'musers'"><span>Manage Users</span></li>
                    <li @click="this.activetab = 'mproducts'"><span>Manage Products</span></li>
                    <li @click="this.activetab = 'moffers'"><span>Manage Offers</span></li>
                    <li @click="this.activetab = 'mreviews'"><span>Manage Reviews</span></li>
                </ul>
            </div>
        </div>
        <div class="main-content">
            <MyProfile :token="this.token" :userData="this.userData" v-if="activetab == 'profile'" />
            <Security :token="this.token" :userData="this.userData" v-if="activetab == 'security'" />
            <MyOrders :token="this.token" :userData="this.userData" v-if="activetab == 'orders'" />
            <MyWishlist :token="this.token" :userData="this.userData" v-if="activetab == 'wishlist'" />
            <MyOffers :token="this.token" :userData="this.userData" v-if="activetab == 'offers'" />
            <MyReviews :token="this.token" :userData="this.userData" v-if="activetab == 'reviews'" />
            <ManageUsers :token="this.token" :userData="this.userData" v-if="activetab == 'musers'" />
            <ManageProducts :token="this.token" :userData="this.userData" v-if="activetab == 'mproducts'" />
            <ManageOffers :token="this.token" :userData="this.userData" v-if="activetab == 'moffers'" />
            <ManageReviews :token="this.token" :userData="this.userData" v-if="activetab == 'mreviews'" />
        </div>
    </section>
</template>

<script>
import axios from 'axios';

import MyProfile from '@/components/MyProfile.vue';
import Security from '@/components/Security.vue';
import MyOrders from '@/components/MyOrders.vue';
import MyWishlist from '@/components/MyWishlist.vue';
import MyOffers from '@/components/MyOffers.vue';
import MyReviews from '@/components/MyReviews.vue';
import ManageUsers from '@/components/ManageUsers.vue';
import ManageProducts from '@/components/ManageProducts.vue';
import ManageOffers from '@/components/ManageOffers.vue';
import ManageReviews from '@/components/ManageReviews.vue';

export default {
    components: {
        MyProfile,
        Security,
        MyOrders,
        MyWishlist,
        MyOffers,
        MyReviews,
        ManageUsers,
        ManageProducts,
        ManageOffers,
        ManageReviews
    },
    data() {
        return {
            activetab: 'profile',
            token: localStorage.getItem('token') || null,
            userData: {},
        }
    },
    methods: {
        async fetchUserData() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/UserInfo`, {
                    headers: {
                        authorization: this.token,
                    }
                });
                this.userData = response.data
            } catch (error) {
                if (error.response && error.response.status === 401) {
                window.alert("Session expirée");
                localStorage.removeItem("token");
                this.$router.push('/');
                window.location.reload();
                }
                else console.error('Error fetching user data:', error);
            }
        },
    },
    mounted() {
        this.fetchUserData();
    },
}
</script>

<style scoped>
.my-account {
    width: 100%;
    max-width: 100vw;
    margin: 0;
    padding: 0;
    display: flex;
    border-bottom: 1px solid #ccc;
}

.my-account {
    display: flex;
}

.sidebar {
    width: 250px;
    position: sticky;
    top: 75px;
    left: 0;
    border-right: 1px solid #ccc;
    padding: 2rem 0;
    background-color: #242424;
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 1rem;
}

h2{
    opacity: 0.6;
}

ul {
    max-width: 100%;
    padding: 0;
    margin: 0;
}

li {
    max-width: 100%;
    list-style: none;
    padding: 1rem 2rem;
    margin: .5rem 0;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
}

li:hover {
    background-color: #333;
    transition: all 0.2s ease;
}

li:hover span {
    transform: translateX(6px) scale(1.05);
    transition: all 0.2s ease;
}

ul:hover > li:not(:hover) {
    transform: scale(0.95);
    filter: brightness(0.8) blur(2px);
    transition: all 0.2s ease;
}

.admin-section h2 {
    display: flex;
    align-items: center;
    padding: 0 3rem;
}

.main-content {
    flex: 1;
    padding: 0;
    overflow-y: auto;
    max-width: 100%;
    box-sizing: border-box;
    min-width: 0;
}
</style>