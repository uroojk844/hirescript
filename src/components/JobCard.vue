<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  title: string;
  company: string;
  logo: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  salaryType: string;
  variant?: "outlined" | "filled";
  color?: string;
}>();

const isFilled = props.variant === "filled";
</script>

<template>
  <div
    :class="[
      'rounded-lg p-6 grid gap-y-2',
      isFilled ? '' : 'border border-gray-300',
    ]"
    :style="isFilled && props.color ? { backgroundColor: props.color } : {}"
  >
    <div class="flex items-center justify-between">
      <div class="text-primary font-medium">{{ props.title }}</div>
      <img class="size-8" :src="props.logo" :alt="props.company + ' logo'" />
    </div>
    <div class="text-primary text-sm">{{ props.company }}</div>
    <div class="text-gray text-sm">
      {{ props.description }}
    </div>
    <div class="flex items-center gap-4 text-gray">
      <div class="text-xs flex items-center gap-2">
        <Icon icon="ic:sharp-location-on" class="text-lg" />
        <div>{{ props.location }}</div>
      </div>
      <div class="text-xs flex items-center gap-2">
        <Icon icon="heroicons:building-office" class="text-sm" />
        <div>{{ props.type }}</div>
      </div>
    </div>
    <div class="flex justify-between items-center gap-4 mt-4">
      <div class="flex items-center flex-col">
        <div class="text-primary font-medium text-xl">{{ props.salary }}</div>
        <div class="text-gray text-sm">{{ props.salaryType }}</div>
      </div>
      <button
        class="text-sm font-medium border border-primary rounded-full px-22 py-3 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
      >
        Apply Now
      </button>
    </div>
  </div>
</template>
