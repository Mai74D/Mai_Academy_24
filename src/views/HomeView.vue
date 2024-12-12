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
              // Cập nhật greetingMessage với phản hồi từ API
              this.greetingMessage = response.data;
          } catch (error) {
              // Hiển thị thông báo lỗi nếu có
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
    flex-direction: column; /* Sắp xếp theo chiều dọc */
    gap: 15px; /* Khoảng cách giữa các phần tử */
    margin: 20px 0;
}

div .input {
    display: flex;
    flex-direction: row; /* Sắp xếp theo chiều ngang */
    align-items: center;
}

label {
    margin-right: 10px; /* Khoảng cách giữa label và input */
    font-weight: bold;
}

input[type="text"] {
    border: 1px solid #ccc; /* Đường viền */
    border-radius: 5px; /* Bo tròn góc */
    padding: 10px; /* Khoảng cách bên trong */
    flex: 1; /* Chiếm không gian còn lại */
}

input[type="submit"] {
    background-color: #4CAF50; /* Màu nền */
    color: white; /* Màu chữ */
    border: none; /* Không có đường viền */
    border-radius: 5px; /* Bo tròn góc */
    padding: 10px 20px; /* Khoảng cách bên trong */
    cursor: pointer; /* Con trỏ khi hover */
    font-size: 16px; /* Kích thước chữ */
    transition: background-color 0.3s; /* Hiệu ứng chuyển màu */
}

input[type="submit"]:hover {
    background-color: #45a049; /* Màu nền khi hover */
}
h2{
  text-align: center;
}
</style>
