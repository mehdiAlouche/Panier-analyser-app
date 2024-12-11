<script setup lang="ts">

const props = defineProps<{
  totalSales: number;
}>();


</script>

<template>
  <div class="stats-card">
    <h3>Total Sales</h3>
    <p class="amount">${{ props.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>
  </div>
</template>

<style scoped>
.stats-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}
</style>