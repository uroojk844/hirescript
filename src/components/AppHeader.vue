<template>
  <h1 class="text-4xl font-bold text-primary mb-8">{{ props.text }}</h1>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{ text: string }>();
</script>
