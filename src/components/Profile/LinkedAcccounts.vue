<script lang="ts" setup>
import { useUserStore } from '@/stores/user.store';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const { getUser } = storeToRefs(userStore);
</script>

<template>
  <div v-for="(idx,social) in getUser?.socialLinks" :key="idx">
    <div class="flex items-center gap-2 capitalize text-sm py-2 border-gray-300 border-b last:border-b-0">
  
      {{ social }}
    </div>
  </div>
</template>
