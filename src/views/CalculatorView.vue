<template>
  <div>
    <h1>Calculator</h1>
    <label for="number1">First number:</label>
    <input type="number" v-model.number="number1" id="number1" />

    <label for="number2">Second number:</label>
    <input type="number" v-model.number="number2" id="number2" />

    <label for="operation">Operation:</label>
    <select v-model="operation" id="operation">
      <option value="add">Plus</option>
      <option value="subtract">Minus</option>
      <option value="multiply">Multiplication</option>
      <option value="divide">Division</option>
    </select>

    <button @click="calculate">Calculate</button>
    <div class="result" v-if="result !== null">Result: {{ result }}</div>
    <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number1: 0,
      number2: 0,
      operation: 'add',
      result: null,
      errorMessage: null,
    };
  },
  methods: {
    async calculate() {
      try {
        const response = await fetch("http://localhost:8080/calculator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number1: this.number1,
            number2: this.number2,
            operation: this.operation,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          // If backend returns an error response
          this.errorMessage = data.error || "An error occurred.";
          this.result = null;
          return;
        }

        // On success, display the result
        this.result = data.result;
        this.errorMessage = null;
      } catch (error) {
        console.error("Error:", error);
        this.result = null;
        this.errorMessage = "Error connecting to the server.";
      }
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
input,
select,
button {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.result {
  color: green;
  margin-top: 20px;
  font-weight: bold;
}
.error {
  color: red;
  margin-top: 20px;
  font-weight: bold;
}
</style>
