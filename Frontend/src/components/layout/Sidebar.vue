<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useThemeStore } from '../../stores/theme';

const router = useRouter();
const themeStore = useThemeStore();

const menuItems = [
  { icon: 'fas fa-tachometer-alt', label: 'Dashboard', route: '/dashboard' },
  { icon: 'fas fa-chart-line', label: 'Analytics', route: '/analytics' },
  { icon: 'fas fa-box', label: 'Products', route: '/products' },
];
</script>

<template>
  <aside class="sidebar" :class="{ 'dark': themeStore.isDarkMode }">
    <div class="logo">
      <h2>PanierAnalyser</h2>
    </div>
    <nav class="nav-menu">
      <router-link
        v-for="item in menuItems"
        :key="item.label"
        :to="item.route"
        class="nav-item"
        :class="{ active: $route.path === item.route }"
      >
        <span class="icon"><i :class="item.icon"></i></span>
        <span class="label">{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #e2e8f0;
  position: fixed;
  left: 0;
  top: 0;
  padding: 1rem;
  transition: all 0.3s ease;
}

.sidebar.dark {
  background-color: #1a1a1a;
  border-right-color: #2d2d2d;
}

.logo {
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
}

.logo h2 {
  color: #2c3e50;
  margin: 0;
}

.dark .logo h2 {
  color: #fff;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #4a5568;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.dark .nav-item {
  color: #a0aec0;
}

.nav-item:hover {
  background-color: #f7fafc;
}

.dark .nav-item:hover {
  background-color: #2d2d2d;
}

.nav-item.active {
  background-color: #e2e8f0;
  color: #2c3e50;
}

.dark .nav-item.active {
  background-color: #2d2d2d;
  color: #fff;
}

.icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>