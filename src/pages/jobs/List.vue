<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import JobCard from "@/components/JobCard.vue";
import Loader from "@/components/Loader.vue";
import { useJobStore } from "@/stores/jobs.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const jobsStore = useJobStore();
const { isLoadingJobs, getJobs, getHasMore } = storeToRefs(jobsStore);

onMounted(() => {
  window.scrollTo(0, 0);
  if (jobsStore.getJobs.length<15) {
  jobsStore.fetchJobs();
}
})
</script>

<template>
  <AppHeader text="All jobs" />

  <Loader v-if="isLoadingJobs && !getJobs.length" />
  <section v-else class="grid-view">
    <JobCard v-for="job in getJobs" :key="job.id" :job />
  </section>
    <div v-if="getHasMore && getJobs.length" class="flex justify-center mt-6">
    <button
      class="px-6 py-2 bg-[#d6fd60] text-[#013b52] font-bold rounded-full disabled:opacity-50"
      @click="jobsStore.fetchJobs()"
      :disabled="isLoadingJobs"
    >
      {{ isLoadingJobs ? "Loading..." : "Load More" }}
    </button>
  </div>
</template>
