<script setup lang="ts">
import { featuredJobs } from "@/assets/mock/featuredJobs";
import AppHeader from "@/components/AppHeader.vue";
import JobCard from "@/components/JobCard.vue";
</script>

<template>
  <AppHeader text="All jobs" />

  <section class="grid-view">
    <JobCard v-for="job in featuredJobs" :key="job.id" :job />
  </section>
</template>
