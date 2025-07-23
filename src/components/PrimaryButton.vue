<script setup lang="ts">
const { loading = false, disabled = false } = defineProps<{
  loading?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    class="bg-accent transition-all text-primary font-semibold py-3 px-6 rounded-full focus:brightness-90 focus-within:outline-primary"
    :class="{
      'hover:brightness-90': !(disabled || loading),
      'inline-grid place-items-center': loading,
      'bg-light-gray hover:brightness-100 cursor-not-allowed text-gray':
        disabled || loading,
    }"
    :disabled
  >
    <span :class="{ invisible: loading }">
      <slot>Primary Button</slot>
    </span>
    <Icon v-if="loading" class="absolute" icon="svg-spinners:3-dots-fade" />
  </button>
</template>
