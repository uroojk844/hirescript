<template>
  <h1 class="text-4xl max-sm:text-3xl font-bold items-center text-primary">{{ props.text }}</h1>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{ text: string }>();
</script>
