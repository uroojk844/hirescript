<script setup lang="ts">
defineProps<{
  src: string;
}>();
</script>

<template>
  <img :src class="size-16 object-cover object-center" />
</template>
