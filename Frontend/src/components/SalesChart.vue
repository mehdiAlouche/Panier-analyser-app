<script setup lang="ts">
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { computed } from 'vue';
import { Bar, Pie } from 'vue-chartjs';
import { SalesByCategory, SalesByProducts } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const props = defineProps<{
  salesByCategory: SalesByCategory[];
  salesByProduct: SalesByProducts[]
}>();



const pieChartData = computed(() => ({
  labels: props.salesByCategory.map(item => item.category),
  datasets: [{
    data: props.salesByCategory.map(item => item.percentage),
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
  }]
}));

const barChartData = computed(() => ({
  labels: props.salesByProduct.map(product => product.ProductName),
  datasets: [{
    label: 'Sales by Product',
    data: props.salesByProduct.map(product => product.totalSales),
    backgroundColor: '#36A2EB'
  }]
}));
</script>

<template>
  <div class="charts-container">
    <!-- Check if there are no sales by category -->
    <div v-if="!props.salesByCategory.length">
      <h3>Sales by Category</h3>
      <p>No data available</p>
    </div>
    <div v-else class="chart">
      <h3>Sales by Category</h3>
      <Pie :data="pieChartData" />
    </div>

    <!-- Check if there are no sales by product -->
    <div v-if="!props.salesByProduct.length">
      <h3>Sales by Product</h3>
      <p>No data available</p>
    </div>
    <div v-else class="chart">
      <h3>Sales by Product</h3>
      <Bar :data="barChartData" />
    </div>
  </div>
</template>

<style scoped>
.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.chart {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>