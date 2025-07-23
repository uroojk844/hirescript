<script setup lang="ts">
import { ref } from 'vue';

const jobDetails = ref({
    title: ""
});
</script>

<template>
    {{ $route.params.id }}
</template>