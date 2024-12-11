<script setup lang="ts">
import { TopProduct } from '../types';

const props = defineProps<{
  products: TopProduct[];
}>();

</script>

<template>
  <div class="top-products">
    <h3>Top 5 Products</h3>
    <ul>
      <li v-for="product in props.products" :key="product.productName">
        {{ product.productName }} - {{ product.totalQuantity }} total Quantity
      </li>
    </ul>
  </div>
</template>

<style scoped>
.top-products {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>