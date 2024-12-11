<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useThemeStore } from '../../stores/theme';

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <header class="topbar" :class="{ 'dark': themeStore.isDarkMode }">
    <div class="left">
   
    </div>
    <div class="right">
    
      
      <div class="dropdown">
        <button class="profile-button" @click="toggleDropdown">
          <span class="avatar"><i class="fas fa-user"></i></span>
          <span class="username">admin</span>
        </button>
        
        <div v-if="isDropdownOpen" class="dropdown-menu">
          <button class="dropdown-item" @click="router.push('/profile')">
            <span class="icon"><i class="fas fa-user"></i></span>
            Profile
          </button>
          <button class="dropdown-item" @click="router.push('/settings')">
            <span class="icon"><i class="fas fa-cog"></i></span>
            Settings
          </button>
          <hr class="dropdown-divider">
          <button class="dropdown-item logout" @click="handleLogout">
            <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  height: 64px;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 250px;
  z-index: 100;
  transition: all 0.3s ease;
}

.topbar.dark {
  background-color: #1a1a1a;
  border-bottom-color: #2d2d2d;
}

.left h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.5rem;
}

.dark .left h1 {
  color: #fff;
}

.right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background-color: #f7fafc;
}

.dark .theme-toggle:hover {
  background-color: #2d2d2d;
}

.dropdown {
  position: relative;
}

.profile-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark .profile-button {
  border-color: #2d2d2d;
  color: #fff;
}

.profile-button:hover {
  background-color: #f7fafc;
}

.dark .profile-button:hover {
  background-color: #2d2d2d;
}

.avatar {
  font-size: 1.25rem;
}

.username {
  font-size: 0.875rem;
  font-weight: 500;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
}

.dark .dropdown-menu {
  background-color: #1a1a1a;
  border-color: #2d2d2d;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  color: #4a5568;
  transition: all 0.2s ease;
}

.dark .dropdown-item {
  color: #a0aec0;
}

.dropdown-item:hover {
  background-color: #f7fafc;
}

.dark .dropdown-item:hover {
  background-color: #2d2d2d;
}

.dropdown-item.logout {
  color: #e53e3e;
}

.dark .dropdown-item.logout {
  color: #fc8181;
}

.dropdown-divider {
  margin: 0.5rem 0;
  border: none;
  border-top: 1px solid #e2e8f0;
}

.dark .dropdown-divider {
  border-top-color: #2d2d2d;
}
</style>