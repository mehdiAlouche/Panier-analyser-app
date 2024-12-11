<script setup lang="ts">
import { useFilterStore } from '../stores/filter';
import type { TimePeriod } from '../types';

const filterStore = useFilterStore();

const periods: { value: TimePeriod; label: string }[] = [
  { value: 'all', label: 'All Time' },
  { value: '7days', label: 'Last 7 Days' },
  { value: '30days', label: 'Last 30 Days' },
  { value: '12months', label: 'Last 12 Months' }
];
</script>

<template>
  <div class="time-filter">
    <label for="time-period">Time Period:</label>
    <select
      id="time-period"
      v-model="filterStore.selectedPeriod"
      class="filter-select"
    >
      <option
        v-for="period in periods"
        :key="period.value"
        :value="period.value"
      >
        {{ period.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.time-filter {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  min-width: 150px;
}

label {
  font-weight: 500;
  color: #2c3e50;
}
</style>