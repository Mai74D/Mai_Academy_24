<template>
  <div class="container">
    <!-- Form tìm kiếm -->
    <div class="search-form">
      <input type="text" v-model="searchParams.name" placeholder="Employee name" />
      <input type="date" v-model="searchParams.dobFrom" />
      <input type="date" v-model="searchParams.dobTo" />
      <select v-model="searchParams.gender">
          <option value="">All</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
      </select>
      <div>
        <input type="number" v-model="searchParams.salaryFrom" placeholder="Min Salary" />
        <input type="number" v-model="searchParams.salaryTo" placeholder="Max Salary" />
      </div>
      <button class="btn btn-search" @click="fetchEmployees(1)">Search</button>
    </div>
    <div class="header">
      <h1 class="title">Employee Management</h1>
      <button class="btn btn-add" @click="showAddForm">+ Add New</button>
    </div>
    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="employees.length > 0">
            <tr v-for="(employee, index) in employees" :key="employee.id">
              <td>{{ index + 1 }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ formatDate(employee.dob) }}</td>
              <td>{{ employee.gender === 'MALE' ? 'Male' : 'Female' }}</td>
              <td>{{ formatCurrency(employee.salary) }}</td>
              <td>
                <button class="btn btn-primary" @click="showUpdateForm(employee)">Update</button>
                <button class="btn btn-danger" @click="deleteEmployee(employee.id)">Delete</button>
                <button class="btn btn-info" @click="showDetails(employee)">Detail</button>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="6" class="no-data">No employees found</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="fetchEmployees(currentPage - 1)"
      >
        Previous
      </button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        :disabled="currentPage === totalPages"
        @click="fetchEmployees(currentPage + 1)"
      >
        Next
      </button>
    </div>

    <!-- Form thêm/sửa -->
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h3>{{ formMode === 'add' ? 'Add new employee' : 'Update employee information' }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" v-model="formData.name" required />
          </div>
          <div class="form-group">
            <label>Date of birth:</label>
            <input type="date" v-model="formData.dob" required />
          </div>
          <div class="form-group">
            <label>Gender:</label>
            <select v-model="formData.gender" required>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label>Salary:</label>
            <input type="number" v-model="formData.salary" required />
          </div>
          <div class="form-group">
            <label>Phone Number:</label>
            <input type="number" v-model="formData.phone" required />
          </div>
          <div class="form-buttons">
            <button class="btn btn-primary" type="submit">
              {{ formMode === 'add' ? 'Add New' : 'Update' }}
            </button>
            <button class="btn btn-secondary" @click="closeForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal chi tiết -->
    <div v-if="showDetailModal" class="modal">
      <div class="modal-content">
        <h3>Details</h3>
        <p><strong>Name:</strong> {{ selectedEmployee.name }}</p>
        <p><strong>Date of birth:</strong> {{ formatDate(selectedEmployee.dob) }}</p>
        <p><strong>Gender:</strong> {{ selectedEmployee.gender === 'MALE' ? 'Male' : 'Female' }}</p>
        <p><strong>Salary:</strong> {{ formatCurrency(selectedEmployee.salary) }}</p>
        <p><strong>Phone Number:</strong> {{ selectedEmployee.phone }}</p>
        <button class="btn btn-secondary" @click="closeDetailModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      showForm: false,
      formMode: 'add',
      formData: {
        id: '',
        name: '',
        dob: '',
        gender: 'MALE',
        salary: 0,
        phone: '',
      },
      searchParams: {
        name: '',
        dobFrom: '',
        dobTo: '',
        gender: '',
        salaryFrom: '',
        salaryTo: '',
      },
      showDetailModal: false,
      selectedEmployee: {},
    };
  },
  methods: {
    async fetchEmployees(page = 1) {
        try {
            this.currentPage = page;
            const { name, dobFrom, dobTo, gender, salaryFrom, salaryTo } = this.searchParams;
            const response = await axios.get('http://localhost:8080/employees', {
                params: {
                    name,
                    dobFrom,
                    dobTo,
                    gender,
                    salaryFrom,
                    salaryTo,
                    page: this.currentPage - 1,
                    size: this.pageSize,
                },
            });
            this.employees = response.data.data.content;
            this.totalPages = response.data.totalPages;
            console.log(this.employees);
        } catch (error) {
            console.error(error);
        }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('vi-VN');
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    showAddForm() {
      this.formMode = 'add';
      this.formData = { id: '', name: '', dob: '', gender: 'MALE', salary: 0, phone: '' };
      this.showForm = true;
    },
    showUpdateForm(employee) {
      this.formMode = 'update';
      this.formData = { ...employee };
      this.showForm = true;
    },
    async handleSubmit() {
        try {
            if (this.formMode === 'add') {
                await axios.post('http://localhost:8080/employees', this.formData);
            } else if (this.formMode === 'update') {
                await axios.put(`http://localhost:8080/employees/${this.formData.id}`, this.formData);
            }
            this.closeForm();
            this.fetchEmployees();
        } catch (error) {
            console.error(error);
        }
    },
    async deleteEmployee(id) {
        try {
            if (confirm('Are you sure you want to delete this employee?')) {
                await axios.delete(`http://localhost:8080/employees/${id}`);
                this.fetchEmployees();
            }
        } catch (error) {
            console.error(error);
        }
    },
    showDetails(employee) {
      this.selectedEmployee = employee;
      this.showDetailModal = true;
    },
    closeDetailModal() {
      this.showDetailModal = false;
    },
    closeForm() {
      this.showForm = false;
    },
  },
  mounted() {
    this.fetchEmployees();
  },
};
</script>

<style scoped>
.container {
  max-width: 95%;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.title {
  font-size: 2rem;
  color: #333;
}
.btn-add {
  background-color: #28a745;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-add:hover {
  background-color: #218838;
}
.table-container {
  overflow-x: auto;
}
.styled-table {
  width: 100%;
  border-collapse: collapse;
}
.styled-table thead {
  background-color: #007bff;
  color: #fff;
}
.styled-table th,
.styled-table td {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
}
.styled-table tbody tr:nth-child(even) {
  background-color: #f3f3f3;
}
.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}
.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-primary {
  background-color: #007bff;
  color: #fff;
}
.btn-danger {
  background-color: #dc3545;
  color: #fff;
}
.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}
.btn-info {
  background-color: #17a2b8;
  color: #fff;
}
.btn-info:hover {
  background-color: #138496;
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
  z-index: 1000;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
/* Container form tìm kiếm */
.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
}
/* Input chung và select */
.search-form input,
.search-form select {
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
border-radius: 5px;
  outline: none;
  transition: all 0.3s ease-in-out;
}
.search-form input:focus,
.search-form select:focus {
  border-color: #409eff;
  box-shadow: 0 0 5px rgba(64, 158, 255, 0.6);
}
/* Nút tìm kiếm */
.btn-search {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s ease-in-out,
    transform 0.2s ease-in-out;
}
.btn-search:hover {
  background-color: #337ecc;
  transform: scale(1.05);
}
.btn-search:active {
  background-color: #295bb3;
  transform: scale(0.95);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
  }
  .search-form input,
  .search-form select,
  .btn-search {
    width: 100%;
  }
}
</style>
