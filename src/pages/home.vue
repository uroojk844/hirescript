<script setup lang="ts">
import SearchBar from "@/components/Home/SearchBar.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <section class="bg min-h-screen">
    <NavBar />
    <h1
      class="text-6xl xl:text-[80px] font-bold text-primary mt-24 max-w-lg xl:max-w-2xl text-center mx-auto leading-[1.3] xl:leading-[1.3]"
    >
      Get The Right Job You Deserve
    </h1>
    <p class="text-gray text-center mt-4 mb-8 xl:text-lg">
      1,80,570 jobs listed here! Your dream jobs is waiting.
    </p>
    <SearchBar />
    
  </section>
</template>

<style>
@reference "@/style.css";

.bg {
  background-image: url("@/assets/images/plus.svg");
  background-size: 40px 40px;
}
</style>
