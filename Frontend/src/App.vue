<script setup lang="ts">
import { useRoute } from "vue-router";
import Sidebar from "./components/layout/Sidebar.vue";
import Topbar from "./components/layout/Topbar.vue";

const route = useRoute();
</script>

<template>
  <div v-if="route.name !== 'login'" class="app-layout">
    <Sidebar />
    <div class="main-content">
      <Topbar />
      <router-view></router-view>
    </div>
  </div>
  <div v-if="route.name === 'login'" >
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  width: 100%;
  margin: 0 auto;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding-top: 64px;
}
</style>
