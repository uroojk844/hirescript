<script lang="ts" setup>
import { useUserStore } from '@/stores/user.store';
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const userStore = useUserStore();
const { getUser } = storeToRefs(userStore);

const hasSocialLinks = computed(() => {
  const links = getUser?.value?.socialLinks || {};
  return Object.values(links).some(val => val !== "");
});
</script>

<template>
  <div v-if="hasSocialLinks">
    <div v-for="(val, key) in getUser?.socialLinks" :key="key">
      <div v-if="val && val.trim() !== ''"
        class="flex items-center gap-2 capitalize text-sm mb-3 border-gray-300 border-b last:border-b-0">
        <Icon icon="material-symbols:check-circle" class="text-green-500" /> {{ key }}
      </div>
    </div>
  </div>
  <div v-else class="text-gray text-xs">
    No accounts linked yet.
  </div>
</template>
