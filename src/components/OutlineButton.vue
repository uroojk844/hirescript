<script setup lang="ts">
const { loading = false, disabled = false, varient = 'default' } = defineProps<{
    loading?: boolean;
    disabled?: boolean;
    varient?: 'default' | 'primary',
}>()
</script>

<template>
    <button type="button" class="w-full flex items-center justify-center gap-2 p-3 border rounded-full text-sm transition" :class="{
        'cursor-pointer': !(disabled || loading),
        'cursor-not-allowed bg-gray-100 border-gray-300': disabled || loading,
        'border-gray-300 hover:bg-gray-100': varient === 'default' && !(disabled || loading),
        'border-primary hover:bg-primary hover:text-white': varient === 'primary' && !(disabled || loading)
    }" :disabled="disabled || loading">
        <slot>Outlined Button</slot>
    </button>
</template>