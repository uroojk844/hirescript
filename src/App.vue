<script setup lang="ts">
import { ref } from 'vue';
import Auth from './components/Auth/Auth.vue';
import { useAuthStore } from '@/stores/authShow.store';
const authStore = useAuthStore();
</script>

<template>
  <RouterView></RouterView>
  <Auth v-if="authStore.isAuthVisible" />
</template>
