<template>
  <div>
      <h1>This is home page</h1>
      <h2>Send us your name and address!!!</h2>
      <form action="#" method="post" @submit.prevent="submitForm">
          <div class="input">
              <label for="name">Your name:</label>
              <input type="text" id="name" v-model="name" onblur="trimInput(this)">
          </div>
          <div class="input">
              <label for="address">Your address:</label>
              <input type="text" id="address" v-model="address" onblur="trimInput(this)">
          </div>
          <input type="submit" value="Send Now">
      </form>
      <div v-if="greetingMessage">
          <h3>{{ greetingMessage }}</h3>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          name: '',
          address: '',
          greetingMessage: '',
      };
  },
  methods: {
      trimInput() {
          this.name = this.name.trim();
          this.address = this.address.trim();
      },
      async submitForm() {
          try {
              const response = await axios.post('http://localhost:8080/greeting', null, {
                  params: {
                      name: this.name,
                      address: this.address,
                  },
              });
              this.greetingMessage = response.data;
          } catch (error) {
              this.greetingMessage = 'Có lỗi xảy ra. Vui lòng thử lại.';
              console.error(error);
          }
      },
  },
};
</script>

css

Copier
<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 0;
}

div .input {
    display: flex;
    flex-direction: row;
    align-items: center;
}

label {
    margin-right: 10px;
    font-weight: bold;
}

input[type="text"] {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    flex: 1;
}

input[type="submit"] {
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

input[type="submit"]:hover {
    background-color: #45a049; 
}
h2{
  text-align: center;
}
</style>
