<template>
  <div class="dictionary-container">
    <h1 class="title">Dictionary</h1>
    <div class="search-container">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Enter the word you are looking for..."
        class="search-input"
      />
      <button @click="search" class="search-button">Search</button>
    </div>
    <p v-if="translation" class="translation">{{ translation }}</p>
    <p v-else-if="searchTerm && !translation" class="no-translation">
      The word does not exist in the dictionary!!
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchTerm: '',
      translation: '',
    };
  },
  methods: {
    async search() {
      const url = `http://localhost:8080/dictionary?word=`;
      try {
        const response = await axios.get(url + this.searchTerm);
        this.translation = response.data.translation || null;
      } catch {
        this.translation = null;
      }
    },
  },
};
</script>

<style scoped>
.dictionary-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background: linear-gradient(to bottom right, #ffffff, #f0f0f0);
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
  color: #2c3e50;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 70%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #1b7ff1;
}

.search-button {
  width: 30%;
  padding: 12px 15px;
  font-size: 16px;
  font-weight: 600;
  background-color: #1b7ff1;
  color: #fff;
  border: none;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #135ebf;
}

.translation {
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #27ae60;
  animation: fadeIn 0.5s ease-in-out;
}

.no-translation {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
