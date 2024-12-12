<template>
  <div class="dictionary-container">
    <h1 class="title">Từ Điển</h1>
    <div class="search-container">
      <input type="text" v-model="searchTerm" placeholder="hello" class="search-input">
      <button @click="search" class="search-button">Tìm kiếm</button>
    </div>
    <p v-if="translation" class="translation">{{ translation }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      translation: '',
    };
  },
  methods: {
    search() {
      const url = `http://localhost:8080/api/dictionary?word=${this.searchTerm}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('helo' + data)
          this.translation = data;
        })
        .catch(error => {
          console.error(error);
          this.translation = 'Error translating text';
        });
    },
  },
};
</script>

<style scoped>
.dictionary-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  width: 70%;
  height: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.search-button {
  width: 30%;
  height: 42px;
  padding: 10px;
  font-size: 16px;
  background-color: #1b7ff1;
  color: #fff;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #1b7ff1;
}

.translation {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #666;
}
</style>
