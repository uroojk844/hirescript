<script setup lang="ts">
import MaxWidth from "./MaxWidth.vue";
import PrimaryButton from "./PrimaryButton.vue";
</script>

<template>
  <nav class="py-6 xl:py-8">
    <MaxWidth class="flex items-center justify-between">
      <div class="text-2xl font-bold text-primary">HireScript</div>
      <div class="flex gap-8 max-sm:hidden">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/jobs">Find Jobs</RouterLink>
        <RouterLink to="/campus">Campus Ambassador</RouterLink>
      </div>
      <div>
        <PrimaryButton>Register Now</PrimaryButton>
      </div>
    </MaxWidth>
  </nav>
</template>

<style scoped>
@reference "@/style.css";

a {
  @apply text-primary;

  &.router-link-exact-active {
    @apply text-primary font-medium;
  }
}
</style>
