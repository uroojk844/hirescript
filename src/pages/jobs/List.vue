<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import JobCard from "@/components/JobCard.vue";
import Loader from "@/components/Loader.vue";
import { useJobStore } from "@/stores/jobs.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const jobsStore = useJobStore();
const { getJobDetails, getJobs } = storeToRefs(jobsStore);

onMounted(() => {
  jobsStore.fetchJobs();
})
</script>

<template>
  <AppHeader text="All jobs" />

  <Loader v-if="getJobDetails" />
  <section v-else class="grid-view">
    <JobCard v-for="job in getJobs" :key="job.id" :job />
  </section>
</template>
