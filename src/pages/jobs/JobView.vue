<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import MaxWidth from "@/components/MaxWidth.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <NavBar />
  <MaxWidth>
    <RouterView></RouterView>
  </MaxWidth>
  <AppFooter />
</template>
