<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="mb-4 w-full rounded-lg overflow-hidden bg-white">
    <div class="py-4 text-sm px-3 border-b border-gray-300 font-medium text-primary">
      {{ props.title }}
    </div>
    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template>
