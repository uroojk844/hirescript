<script setup lang="ts">
import PrimaryButton from "../PrimaryButton.vue";
</script>

<template>
  <div
    class="flex items-center border border-light-gray p-2 rounded-full bg-white max-w-2xl w-full mx-auto"
  >
    <div
      class="w-full sm:w-56 transition-all duration-300 [&:has(input:focus)]:w-[350px] px-4 flex gap-2 items-center"
    >
      <label
        class="grid place-items-center cursor-pointer"
        for="search-job-title"
      >
        <Icon icon="uil:search" size="20" class="text-primary" />
      </label>
      <input
        type="search"
        placeholder="Job title or keyword"
        id="search-job-title"
        class="outline-none w-full"
      />
    </div>
    <div class="max-sm:hidden flex-1 px-4 flex gap-2 items-center border-primary border-l">
      <label class="grid place-items-center" for="search-job-location">
        <Icon
          icon="material-symbols:location-on-outline"
          size="20"
          class="text-primary"
        />
      </label>
      <input
        type="search"
        placeholder="New York, USA"
        id="search-job-location"
        class="outline-none w-full"
      />
    </div>
    <PrimaryButton>Search</PrimaryButton>
  </div>
</template>
