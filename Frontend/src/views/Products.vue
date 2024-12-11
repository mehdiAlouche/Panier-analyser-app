<template>
  <div class="layout">
    <div class="main-content">
      <div class="content">
        <ProductsTable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductsTable from "../components/ProductsTable.vue";
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
</style>
