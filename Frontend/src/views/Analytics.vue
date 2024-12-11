<template>
  <div class="layout">
    <div class="main-content">
      <div class="content">
        <div class="header-left">
          <TimeFilter />
        </div>
        <div v-if="isLoading" class="spinner-container">
          <VueSpinnerOval size="90" color="#3498db" />
        </div>
        <SalesChart  v-else
          :salesByCategory="categorySales"
          :salesByProduct="salesPerProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useFilterStore } from "../stores/filter";
import SalesChart from "../components/SalesChart.vue";
import TimeFilter from "../components/TimeFilter.vue";

const filterStore = useFilterStore();
const categorySales = ref([]);
const salesPerProduct = ref([]);
const startDate = ref<Date | null>(filterStore.dateFilter().startDate);
const apiUrl = import.meta.env.VITE_API_URL;

const isLoading = ref(false);

const fetchCategorySales = async () => {
  isLoading.value = true;
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
  } finally {
    isLoading.value = false;
  }
};

const fetchSalesPerProduct = async () => {
  isLoading.value = true;
  try {
    const salesPerProductEndpoint = import.meta.env.VITE_SALES_PER_PRODUCT_ENDPOINT;
    const response = await axios.get(`${apiUrl}${salesPerProductEndpoint}`, {
      params: {
        startDate: startDate.value ? startDate.value.toISOString() : null,
      },
    });
    salesPerProduct.value = response.data;
  } catch (error) {
    console.error("Error fetching sales per product:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchCategorySales();
  await fetchSalesPerProduct();
});

watch(
  () => filterStore.selectedPeriod,
  async () => {
    const { startDate: newStartDate } = filterStore.dateFilter();
    if (newStartDate) {
      startDate.value = newStartDate;
    } else {
      startDate.value = null;
    }
    await fetchCategorySales();
    await fetchSalesPerProduct();
  }
);
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 64px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.spinner-container {
  display: flex;
  justify-content: center;
  margin: 6rem 0;
}
</style>
