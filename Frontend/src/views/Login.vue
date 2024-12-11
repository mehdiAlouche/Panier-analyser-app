<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <ShoppingBasketIcon class="mx-auto h-12 w-12 text-indigo-600" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Panier Analyser
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div class="mt-1">
              <input
                id="username"
                v-model="username"
                name="username"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-500': usernameError }"
              />
            </div>
            <p v-if="usernameError" class="mt-2 text-sm text-red-600">
              {{ usernameError }}
            </p>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <div class="relative mt-1">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                  :class="{ 'border-red-500': passwordError }"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <span v-if="showPassword">
                    <EyeOffIcon class="h-5 w-5 text-gray-400" />
                  </span>
                  <span v-else>
                    <EyeIcon class="h-5 w-5 text-gray-400" />
                  </span>
                </button>
              </div>
            </div>
            <p v-if="passwordError" class="mt-2 text-sm text-red-600">
              {{ passwordError }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="rememberMe"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <p v-if="loginError" class="mt-2 text-sm text-red-600">
            {{ loginError }}
          </p>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
            >
              <LoaderIcon
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              />
              {{ isLoading ? "Signing in..." : "Sign in" }}
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500"> Or </span>
            </div>
          </div>

          <div class="mt-6 text-center">
            <p class="text-sm">
              Don't have an account?
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  ShoppingBasketIcon,
  LoaderIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-vue-next";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);
const usernameError = ref("");
const passwordError = ref("");
const authStore = useAuthStore();
const router = useRouter();
const showPassword = ref(false);
const loginError = ref("");

const handleSubmit = async () => {
  // Reset errors
  usernameError.value = "";
  passwordError.value = "";
  loginError.value = "";

  // Validate username
  if (!username.value) {
    usernameError.value = "Please enter a username";
    return;
  }

  // Validate password
  if (password.value.length < 6) {
    passwordError.value = "Password must be at least 6 characters long";
    return;
  }

  // Simulate login process
  isLoading.value = true;
  try {
    if (await authStore.login(username.value, password.value)) {
      router.push("/dashboard");
    } else {
      loginError.value = "Username or password is incorrect";
    }
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
