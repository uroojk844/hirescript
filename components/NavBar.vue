<script setup lang="ts">
import PrimaryButton from "./PrimaryButton.vue";
</script>

<template>
  <nav class="py-6">
    <MaxWidth class="flex items-center justify-between">
      <div class="text-2xl font-bold text-primary">HireScript</div>
      <div class="flex gap-8">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/jobs">Find Jobs</NuxtLink>
        <NuxtLink to="/campus">Campus Ambassador</NuxtLink>
      </div>
      <div>
        <PrimaryButton>Register Now</PrimaryButton>
      </div>
    </MaxWidth>
  </nav>
</template>

<style scoped>
a {
  @apply text-gray;

  &.router-link-exact-active {
    @apply text-primary;
  }
}
</style>
