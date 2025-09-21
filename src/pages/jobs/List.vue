<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import JobCard from "@/components/JobCard.vue";
import Loader from "@/components/Loader.vue";
import { useJobStore } from "@/stores/jobs.store";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const jobsStore = useJobStore();
const { isLoadingJobs, getJobs, getHasMore } = storeToRefs(jobsStore);

async function loadJobs() {
  window.scrollTo(0, 0);
  const category = route.params.category as string | undefined;

  if (category) {
    //  call category specific fetch
    await jobsStore.fetchJobsByCategory(category);
  } else {
    //  call normal fetch
    if (jobsStore.getJobs.length < 15) {
      await jobsStore.fetchJobs();
    }
  }
}

onMounted(loadJobs);

// watch route param change for dynamic reload
watch(() => route.params.category, loadJobs);
</script>

<template>
  <AppHeader :text="route.params.category ? `All ${route.params.category}s` : 'All Jobs'" />

  <Loader v-if="isLoadingJobs && !getJobs.length" />

  <section v-else class="grid-view">
    <JobCard v-for="job in getJobs" :key="job.id" :job />
  </section>

  <div v-if="getHasMore && getJobs.length && !route.params.category" class="flex justify-center mt-6">
    <button
      class="px-6 py-2 bg-[#d6fd60] text-[#013b52] font-bold rounded-full disabled:opacity-50 cursor-pointer"
      @click="jobsStore.fetchJobs()"
      :disabled="isLoadingJobs"
    >
      {{ isLoadingJobs ? "Loading..." : "Load More" }}
    </button>
  </div>

  <p v-if="!isLoadingJobs && !getJobs.length" class="text-center text-gray-500 mt-4">
    No jobs found.
  </p>
</template>
