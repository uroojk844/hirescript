<script setup lang="ts">
import AppFooter from './AppFooter.vue';
import MaxWidth from './MaxWidth.vue';
import NavBar from './NavBar.vue';
</script>

<template>
  <MaxWidth>
    <NavBar />

    <div class="flex flex-col items-center justify-center min-h-[70vh] px-4">  
        <h1 class="text-2xl font-semibold mb-2">Page Not Available</h1>
        <p class="text-gray-500">
          We are not serving this page right now.  
          <br />
          Thank you for cooperating!
        </p>
    </div>

    <AppFooter />
  </MaxWidth>
</template>
