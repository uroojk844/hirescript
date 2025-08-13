<script setup lang="ts">
import PrimaryButton from "../PrimaryButton.vue";
import CityAutocomplete from "../CityAutocomplete.vue";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const jobTitle = ref('');
const location = ref('');
const router = useRouter();

const handleSearch = () => {
  if (!jobTitle.value.trim()) {
    return;
  }

  const queryParams = new URLSearchParams({
    title: jobTitle.value.trim(),
  });

  if (location.value?.trim()) {
    queryParams.append('location', location.value.trim());
  }

  router.push(`jobs/search/${queryParams.toString()}`);
}
</script>


<template>
  <div class="flex items-center border border-light-gray p-2 rounded-full bg-white max-w-2xl w-full mx-auto">
    <div class="w-full sm:w-56 transition-all duration-300 [&:has(input:focus)]:w-[350px] px-4 flex gap-2 items-center">
      <label class="grid place-items-center cursor-pointer" for="search-job-title">
        <Icon icon="uil:search" size="20" class="text-primary" />
      </label>
      <input v-model="jobTitle" type="search" placeholder="Job title or keyword" id="search-job-title"
        class="outline-none w-full" />
    </div>

    <div class="max-sm:hidden flex-1 px-4 border-primary border-l">
      <CityAutocomplete v-model="location" placeholder="Search cities in India..." input-id="search-job-location" />
    </div>

    <PrimaryButton variant="accent" @click="handleSearch">Search</PrimaryButton>
  </div>
</template>