<script setup lang="ts">
import { ref } from 'vue';
import Auth from './components/Auth/Auth.vue';

const auth = ref(false);
</script>

<template>
  <Auth v-if="auth" />
  <RouterView></RouterView>
</template>
