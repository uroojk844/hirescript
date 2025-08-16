<template>
  <div
    class="bg-white p-2 rounded-full hover:bg-primary group flex items-center justify-between transition-all duration-300"
  >
    <div class="flex items-center gap-4">
      <div class="p-2 bg-gray-100 rounded-full group-hover:bg-accent">
        <Icon :icon="props.icon" class="text-primary text-2xl" />
      </div>
      <div>
        <div class="font-medium text-primary group-hover:text-white">
          {{ props.jobType }}
        </div>
        <div class="text-sm group-hover:text-white">
          {{ props.jobCount }} Jobs available
        </div>
      </div>
    </div>
    
  </div>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { defineProps } from "vue";

const props = defineProps<{
  jobType: string;
  icon: string;
  jobCount: number;
}>();
</script>
