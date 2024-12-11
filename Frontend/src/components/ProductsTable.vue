<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { Product } from '../types';

//variables
const products = ref<Product[]>([]);

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 10; 
let totaleProducts = 0; 

// Loading state
const isLoading = ref(false);

// Function to fetch products with pagination
const fetchProduct = async (page: number, limit: number) => {
  isLoading.value = true;
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const productsEndpoint = import.meta.env.VITE_PRODUCTS_ENDPOINT;
    const response = await axios.get(`${apiUrl}${productsEndpoint}`, { params: { page, limit } });
    console.log(response.data);
    
    products.value = response.data[0].products; 
    totaleProducts = response.data[0].totalProduct;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
};

// Watch for changes in currentPage to fetch new products
watch(currentPage, (newPage) => {
  fetchProduct(newPage, itemsPerPage);
});

// Function to change page
const changePage = (page: number) => {
  currentPage.value = page;
};

onMounted(async () => {
 await fetchProduct(currentPage.value, itemsPerPage);
});

</script>

<template>
  <div class="products-table">
    <h3>Products List</h3>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Total Quantity</th>
          <th>Total Sales</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.ProductID">
          <td>{{ product.ProductName }}</td>
          <td>{{ product.Category }}</td>
          <td>${{ product.Price ? product.Price.toFixed(2) : 'N/A' }}</td>
          <td>{{ product.totalQuantity }}</td>
          <td>{{ product.totalSales }}</td>
        </tr>
      </tbody>
    </table>
    
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="spinner-container">
      <VueSpinnerOval size="20" color="blue" />
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1 || isLoading">Previous</button>
      <span>Page {{ currentPage }} of {{ Math.ceil(totaleProducts / itemsPerPage) }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage * itemsPerPage >= totaleProducts || isLoading">Next</button>
    </div>
  </div>
</template>

<style scoped>
.products-table {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

/* Add styles for pagination if needed */
.pagination {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #0056b3;
}

/* Add styles for the spinner container */
.spinner-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>