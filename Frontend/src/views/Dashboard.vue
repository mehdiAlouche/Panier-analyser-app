<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import ProductsTable from "../components/ProductsTable.vue";
import SalesChart from "../components/SalesChart.vue";
import TimeFilter from "../components/TimeFilter.vue";
import TopProducts from "../components/TopProducts.vue";
import TotalSales from "../components/TotalSales.vue";
import { useFilterStore } from "../stores/filter";
import PulseLoader from "../components/PluseLoader.vue";

const filterStore = useFilterStore();

// Data variables
const totalSales = ref(0);
const trendingProducts = ref([]);
const categorySales = ref([]);
const salesPerProduct = ref([]);
const startDate = ref<Date | null>(filterStore.dateFilter().startDate);
const apiUrl = import.meta.env.VITE_API_URL;
const isLoading = ref(true);

// Fetch data functions
const fetchTotalSales = async () => {
  const salesEndpoint = import.meta.env.VITE_TOTAL_SALES_ENDPOINT;
  try {
    const response = await axios.get(`${apiUrl}${salesEndpoint}`, {
      params: {
        startDate: startDate.value ? startDate.value.toISOString() : null,
      },
    });
    totalSales.value = response.data.totalSales;
  } catch (error) {
    console.error("Error fetching total sales:", error);
  }
};

const fetchTrendingProducts = async () => {
  const trendingEndpoint = import.meta.env.VITE_TRENDING_ENDPOINT;
  try {
    const response = await axios.get(`${apiUrl}${trendingEndpoint}`, {
      params: {
        startDate: startDate.value ? startDate.value.toISOString() : null,
      },
    });
    trendingProducts.value = response.data;
  } catch (error) {
    console.error("Error fetching trending products:", error);
  }
};

const fetchCategorySales = async () => {
  const categorySalesEndpoint = import.meta.env.VITE_CATEGORY_SALES_ENDPOINT;
  try {
    const response = await axios.get(`${apiUrl}${categorySalesEndpoint}`, {
      params: {
        startDate: startDate.value ? startDate.value.toISOString() : null,
      },
    });
    categorySales.value = response.data;
  } catch (error) {
    console.error("Error fetching category sales:", error);
  }
};

const fetchSalesPerProduct = async () => {
  try {
    const salesPerProductEndpoint = import.meta.env
      .VITE_SALES_PER_PRODUCT_ENDPOINT;
    const response = await axios.get(`${apiUrl}${salesPerProductEndpoint}`, {
      params: {
        startDate: startDate.value ? startDate.value.toISOString() : null,
      },
    });
    salesPerProduct.value = response.data;
  } catch (error) {
    console.error("Error fetching sales per product:", error);
  }
};

// Watch for changes in selectedPeriod to update startDate
watch(
  () => filterStore.selectedPeriod,
  async () => {
    const { startDate: newStartDate } = filterStore.dateFilter();
    if (newStartDate) {
      startDate.value = newStartDate;
    } else {
      startDate.value = null;
    }
    await loadData();
  }
);

// Function to load all data
const loadData = async () => {
  isLoading.value = true;
  await fetchTotalSales();
  await fetchTrendingProducts();
  await fetchCategorySales();
  await fetchSalesPerProduct();
  isLoading.value = false;
};

// Fetch all data on component mount
onMounted(loadData);
</script>

<template>
  <div class="dashboard-layout">
    <div class="main-content">
      <div class="dashboard-content">
        <div class="header-left">
          <TimeFilter />
        </div>
        <div class="stats-grid">
          <TotalSales :total-sales="totalSales" />
          <TopProducts :products="trendingProducts" />
        </div>  
        <div  v-if="!isLoading" >
          <SalesChart :salesByCategory="categorySales":salesByProduct="salesPerProduct"/>
          <ProductsTable class="spacing"/>
        </div>
        <div class="spinner-container" v-else>
          <VueSpinnerOval size="90" color="#3498db" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.spacing {
  margin-top: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

h1 {
  color: #2c3e50;
  margin: 0;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding-top: 64px;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header-left {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.spinner-container {
  display: flex;
  justify-content: center;
  margin: 6rem 0;
}
</style>
