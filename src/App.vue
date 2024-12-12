<script>
export default {
  name: 'App',
}
</script>
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <img src="https://static.vecteezy.com/system/resources/previews/000/601/639/original/vector-digital-print-logo-design.jpg" alt="logo">
      </div>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/dictionary" class="nav-link">Dictionary</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/contact-us" class="nav-link">Contact Us</router-link>

      <div>
        <input type="text" class="search-input" placeholder="Images, #tags, @users oh my!" />

        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <div class="button-container">
        <button class="auth-button sign-in">Sign in</button>
        <button class="auth-button sign-up">Sign up</button>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style scoped>
.navbar {
  background-color: #1F509A; /* Dark background */
  padding: 10px 20px; /* Padding for the navbar */
}
.navbar .nav-link {
  text-decoration: none;
  color: white;
}
.navbar-container {
  display: flex;
  justify-content: space-between; /* Space between logo and buttons */
  align-items: center; /* Center vertically */
  max-width: 1200px; /* Max width for navbar */
  margin: 0 auto; /* Center horizontally */
  width: 100%; /* Full width */
}

.navbar-container .logo {
  width: 50px;
  height: 50px;/* Logo color */

}

.logo img{
  width: 100%;
  height: 100%;
  border-radius: 50px;
}
.search-input {
  flex: 1; /* Make input take available space */
  margin: 0 20px; /* Margin on sides */
  padding: 8px; /* Padding inside input */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  background-color: #2c2f33; /* Background for input */
  color: white; /* Input text color */
}

.search-input::placeholder {
  color: #b0b3b7; /* Placeholder text color */
}

.button-container {
  display: flex; /* Flex layout for buttons */
}

.new-post-button {
  background-color: #D4EBF8; /* New post button color */
  color: #0A3981; /* Text color */
  padding: 8px 16px; /* Padding inside button */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  margin-right: 10px; /* Space between buttons */
}

.auth-button {
  background-color: transparent; /* No background */
  color: White; /* Text color */
  padding: 8px 16px; /* Padding inside button */
  border: 2px solid transparent; /* Transparent border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  transition:
    background-color 0.3s,
    border-color 0.3s; /* Transition effects */
}

.auth-button:hover {
  border-color: #0A3981; /* Border color on hover */
}

.sign-in:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Background on hover */
}

.sign-up {
  background-color: #D4EBF8; /* Sign up button color */
  color: #0A3981; /* Text color */
}
</style>
