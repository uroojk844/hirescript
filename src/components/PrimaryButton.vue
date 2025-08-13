<script setup lang="ts">
const { loading = false, disabled = false, variant = "primary" } = defineProps<{
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "accent",
}>();
</script>

<template>
  <button class="transition-all  font-semibold py-3 px-6 rounded-full focus:brightness-90 focus-within:outline-primary"
    :class="{
      'bg-accent text-primary': variant == 'accent' && !(disabled || loading),
      'bg-primary text-white': variant == 'primary' && !(disabled || loading),
      'inline-grid place-items-center': loading,
      'hover:brightness-90 cursor-pointer': !(disabled || loading),
      'bg-light-gray hover:brightness-100 cursor-not-allowed text-gray':
        disabled || loading,
    }" :disabled="disabled || loading">
    <span :class="{ invisible: loading }">
      <slot>Primary Button</slot>
    </span>
    <Icon v-if="loading" class="absolute" icon="svg-spinners:3-dots-fade" />
  </button>
</template>
