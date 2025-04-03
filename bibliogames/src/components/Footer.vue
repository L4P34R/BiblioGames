<template>
  <footer class="footer">
    <img class="logo" src="@/assets/BiblioGamesLogo.png" alt="Logo" />
    <div class="socials">
      <a href="#">✕</a>
      <a href="#">📷</a>
      <a href="#">▶️</a>
      <a href="#">💼</a>
    </div>
    <div class="footer-links">
      <div>
        <h4>Categories</h4>
        <ul>
          <li>Strategy Games</li>
          <li>Card Games</li>
          <li>Family Games</li>
          <li>Kids Games</li>
          <li>Expert Games</li>
          <li>Cooperative Games</li>
          <li>Solo Games</li>
        </ul>
      </div>
      <div>
        <h4>Discover</h4>
        <ul>
          <li>New Releases</li>
          <li>Promotions</li>
          <li>Best Sellers</li>
          <li>Reviews & Ratings</li>
          <li>Recommendations</li>
          <li>Used Games</li>
          <li>Eco-Friendly Games</li>
        </ul>
      </div>
      <div>
        <h4>Support</h4>
        <ul>
          <li>FAQ</li>
          <li>Contact Us</li>
          <li>Shipping & Returns</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Legal Notice</li>
          <li>Accessibility</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>
.footer {
  background-color: #1e1e1e;
  padding: 2rem;
  margin-top: 3rem;
  border-top: 1px solid #444;
}

.logo {
  width: 3rem;
  height: 3rem;
}

.socials {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

.footer-links h4 {
  margin-bottom: 0.5rem;
}

.footer-links ul {
  list-style: none;
  line-height: 1.6;
  color: #aaa;
}
</style>