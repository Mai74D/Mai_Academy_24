<template>
  <div>
    <h1>List of Employees</h1>
    <button class="btn btn-success" @click="openAddModal">+ Add new</button>
    <table class="employee-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Date of birth</th>
          <th>Gender</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.dob }}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ formatCurrency(employee.salary) }}</td>
          <td>
            <button class="btn btn-primary" @click="openUpdateModal(employee, index)">
              <i class="fas fa-edit"></i> Update
            </button>
            <button class="btn btn-danger" @click="deleteEmployee(employee.id)">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
            <button class="btn btn-info" @click="viewDetails(employee.id)">
              <i class="fas fa-info-circle"></i> Detail
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add New Employee Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h2>Add New Employee</h2>
        <form @submit.prevent="addNewEmployee">
          <label>Name:</label>
          <input v-model="newEmployee.name" type="text" required />

          <label>Date of Birth:</label>
          <input v-model="newEmployee.dob" type="date" required />

          <label>Gender:</label>
          <select v-model="newEmployee.gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Salary:</label>
          <input v-model="newEmployee.salary" type="number" step="1000" required />

          <button type="submit" class="btn btn-primary">Save</button>
          <button type="button" class="btn btn-secondary" @click="closeAddModal">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Update Employee Modal -->
    <div v-if="showUpdateModal" class="modal">
      <div class="modal-content">
        <h2>Update Employee</h2>
        <form @submit.prevent="updateEmployee">
          <label>Name:</label>
          <input v-model="currentEmployee.name" type="text" required />

          <label>Date of Birth:</label>
          <input v-model="currentEmployee.dob" type="date" required />

          <label>Gender:</label>
          <select v-model="currentEmployee.gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Salary:</label>
          <input v-model="currentEmployee.salary" type="number" step="1000" required />

          <button type="submit" class="btn btn-primary">Update</button>
          <button type="button" class="btn btn-secondary" @click="closeUpdateModal">Cancel</button>
        </form>
      </div>
    </div>

    <!-- View Employee Details Modal -->
    <div v-if="showDetailsModal" class="modal">
      <div class="modal-content">
        <h2>Employee Details</h2>
        <p><strong>Name:</strong> {{ selectedEmployee.name }}</p>
        <p><strong>Date of Birth:</strong> {{ selectedEmployee.dob }}</p>
        <p><strong>Gender:</strong> {{ selectedEmployee.gender }}</p>
        <p><strong>Salary:</strong> {{ formatCurrency(selectedEmployee.salary) }}</p>
        <p><strong>Phone Number:</strong> {{ selectedEmployee.phone }}</p>
        <button class="btn btn-secondary" @click="closeDetailsModal">Close</button>
      </div>
    </div>
  </div>

</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: [], // List of employees
      showAddModal: false, // Controls visibility of the Add modal
      showUpdateModal: false, // Controls visibility of the Update modal
      showDetailsModal: false,
      newEmployee: {
        name: '',
        dob: '',
        gender: 'Male',
        salary: 0,
      }, // New employee data
      currentEmployee: {
        id: null,
        name: '',
        dob: '',
        gender: 'Female',
        salary: 0,
      }, // Data of the employee being updated
      currentEmployeeIndex: null, // Index of the employee being updated
      selectedEmployee: {},
    };
  },
  mounted() {
    this.fetchEmployees(); // Fetch employee data from server when the component is mounted
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get('http://localhost:8080/employees');
        this.employees = response.data;
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    },
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
      this.resetNewEmployee();
    },
    resetNewEmployee() {
      this.newEmployee = {
        name: '',
        dob: '',
        gender: 'Nam',
        salary: 0,
      };
    },
    addNewEmployee() {
      // Add a new employee to the list
      this.employees.push({ ...this.newEmployee });
      this.closeAddModal();
    },
    openUpdateModal(employee, index) {
      // Open the update modal and populate it with the selected employee data
      this.showUpdateModal = true;
      this.currentEmployee = { ...employee }; // Set the data of the employee being updated
      this.currentEmployeeIndex = index; // Store the index of the employee being updated
    },
    closeUpdateModal() {
      this.showUpdateModal = false;
      this.resetCurrentEmployee();
    },
    resetCurrentEmployee() {
      this.currentEmployee = {
        id: null,
        name: '',
        dob: '',
        gender: 'Nam',
        salary: 0,
      };
      this.currentEmployeeIndex = null;
    },
    async updateEmployee() {
      // Update the employee data in the list
      try {
        const employee = await axios.put(`http://localhost:8080/employees/${this.currentEmployee.id}`, this.currentEmployee)
        this.employees[this.currentEmployeeIndex] = employee.data; // Update the employee data in the list
      } catch (error) {
        error.message = "Error while updating";
      }
      this.closeUpdateModal();

    },
    async deleteEmployee(id) {
      const isConfirmed = confirm(`Do you want to delete this employee?`);

      if (isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/employees/${id}`);
          this.employees = this.employees.filter(employee => employee.id !== id);

        } catch (error) {
          console.error("Error while deleting employee:", error);
          alert("Error while deleting employee. Please try again.");
        }
      }
    },
    async viewDetails(id) {
      try {
        const response = await axios.get(`http://localhost:8080/employees/${id}`);
        this.selectedEmployee = response.data; // Assign response data to selectedEmployee
        this.showDetailsModal = true; // Open modal
      } catch (error) {
        console.error("Error fetching employee details:", error);
        alert("Unable to fetch employee details. Please try again.");
      }
    },
    closeDetailsModal() {
      this.showDetailsModal = false;
      this.selectedEmployee = {}; // Reset selectedEmployee
    },
    formatCurrency(value) {
      return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.employee-table th, .employee-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.employee-table th {
  background-color: #f2f2f2;
}
button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.btn-success {
  margin-bottom: 20px;
  color: white;
  background-color: green;
}
.btn-primary {
  color: white;
  background-color: blue;
}
.btn-danger {
  color: white;
  background-color: red;
}
.btn-info {
  color: white;
  background-color: #17a2b8;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.modal-content h2 {
  margin-top: 0;
}
.modal-content form {
  display: flex;
  flex-direction: column;
}
.modal-content label {
  margin: 10px 0 5px;
}
.modal-content input, .modal-content select {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.modal-content button {
  margin-top: 10px;
}
.btn-secondary {
  background-color: gray;
  color: white;
}
</style>
