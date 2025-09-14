<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import JobCard from "@/components/JobCard.vue";
import Loader from "@/components/Loader.vue";
import { useInternshipStore } from "@/stores/internships.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

// imported internships and its functions 
const internshipStore = useInternshipStore();
const { internships, isLoadingInternships } = storeToRefs(internshipStore);

onMounted(() => {
  window.scrollTo(0, 0);
  internshipStore.fetchInternships(); 
});
</script>

<template>
  <AppHeader text="Internships" />

  <Loader v-if="isLoadingInternships" />

  <section v-else class="grid-view">
    <JobCard v-for="job in internships" :key="job.id" :job="job" />
  </section>

  <p
    v-if="!isLoadingInternships && internships.length === 0"
    class="text-center text-gray-500 mt-4"
  >
    No Internships found.
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
