import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const token = ref<string | null>(null);

  // Set up axios interceptor to add token to all requests
  axios.interceptors.request.use((config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  function login(username: string, password: string): Promise<boolean> {
    const apiUrl = import.meta.env.VITE_API_URL;
    const loginEndpoint = import.meta.env.VITE_LOGIN_ENDPOINT;
    return axios.post(`${apiUrl}${loginEndpoint}`, { username, password })
      .then(response => {
        if (response.status === 200) {
          isAuthenticated.value = true;
          token.value = response.data.token;
          if (token.value) {
            localStorage.setItem('token', token.value);
          }
          return true;
        }
        return false;
      })
      .catch(() => {
        return false; 
      });
  }

  function logout() {
    isAuthenticated.value = false;
    token.value = null;
    localStorage.removeItem('token');
  }

  // Initialize from localStorage
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    token.value = savedToken;
    isAuthenticated.value = true;
  }

  return {
    isAuthenticated,
    token,
    login,
    logout
  };
});