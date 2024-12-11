<template>
    <div class="pulse-loader">
      <div class="pulse"></div>
      <div class="pulse"></div>
      <div class="pulse"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No specific logic needed for a simple loader
  </script>
  
  <style scoped>
  .pulse-loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .pulse {
    width: 15px;
    height: 15px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #3498db;
    animation: pulse 0.6s infinite alternate;
  }
  
  .pulse:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .pulse:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }
  </style>