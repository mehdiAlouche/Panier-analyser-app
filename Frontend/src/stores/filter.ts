import { subDays, subMonths } from 'date-fns';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product, TimePeriod } from '../types';

export const useFilterStore = defineStore('filter', () => {
  const selectedPeriod = ref<TimePeriod>('all');

  const dateFilter = () => {
    if (selectedPeriod.value === 'all') {
      return { startDate: null };
    }

    const currentDate = new Date();
    let startDate: Date;

    switch (selectedPeriod.value) {
      case '7days':
        startDate = subDays(currentDate, 7);
        break;
      case '30days':
        startDate = subDays(currentDate, 30);
        break;
      case '12months':
        startDate = subMonths(currentDate, 12);
        break;
      default:
        return { startDate: null };
    }

    return { startDate };
  };

  return { selectedPeriod, dateFilter };
});