<script setup lang="ts">
const modelValue = defineModel({ required: true });
</script>

<template>
    <input v-model="modelValue" type="text" class="border border-light-gray w-full py-3 px-4 rounded-full text-sm"
        required />
</template>