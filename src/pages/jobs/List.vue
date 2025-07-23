<script setup lang="ts">
import { featuredJobs } from "@/assets/mock/featuredJobs";
import AppHeader from "@/components/AppHeader.vue";
import JobCard from "@/components/JobCard.vue";
</script>

<template>
  <AppHeader text="All jobs" />

  <section v-for="(job, index) in featuredJobs" :key="index">
    <JobCard :job />
  </section>
</template>
