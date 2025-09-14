<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import JobCard from "@/components/JobCard.vue";
import Loader from "@/components/Loader.vue";
import { useHackathonStore } from "@/stores/hackathons.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

// imported hackathon store and its function
const hackathonStore = useHackathonStore();
const { hackathons, isLoadingHackathons } = storeToRefs(hackathonStore);

onMounted(() => {
  window.scrollTo(0, 0);
  hackathonStore.fetchHackathons();
});
</script>

<template>
  <AppHeader text="Hackathons" />

  <Loader v-if="isLoadingHackathons" />

 
  <section v-else class="grid-view">
    <JobCard v-for="job in hackathons" :key="job.id" :job="job" />
  </section>

  <p
    v-if="!isLoadingHackathons && hackathons.length === 0"
    class="text-center text-gray-500 mt-4"
  >
    No Hackathons found.
  </p>
</template>

<style scoped>
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>


