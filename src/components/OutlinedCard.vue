<script setup lang="ts">
const { direction = "col", size = "md" } = defineProps<{
  direction?: "col" | "row";
  size?: "sm" | "md";
}>();
</script>

<template>
  <div
    class="flex text-gray text-sm gap-2 border border-light-gray rounded-lg max-w-4xl"
    :class="{
      'flex-col': direction == 'col',
      'items-center': direction == 'row',
      'p-4': size == 'md',
      'p-2': size == 'sm',
    }"
  >
    <slot></slot>
  </div>
</template>
