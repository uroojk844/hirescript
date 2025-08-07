<template>
  <div class="bg-[#ecf4f6] py-16">
    <MaxWidth>
      <Header text="One Platform Many Solutions" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <RouterLink v-for="job in jobTypes" :key="job.jobType" :to="`/jobs/category/${job.jobType}`">
          <JobTypesCard :job-type="job.jobType" :icon="job.icon" :job-count="job.jobCount" />
        </RouterLink>
      </div>
    </MaxWidth>
  </div>
</template>

<script setup lang="ts">
import Header from "../AppHeader.vue";
import JobTypesCard from "../JobTypesCard.vue";
import MaxWidth from "../MaxWidth.vue";
const jobTypes = [
  { jobType: "Marketing", icon: "ri:briefcase-line", jobCount: 58 },
  { jobType: "Engineering", icon: "ri:settings-3-line", jobCount: 120 },
  { jobType: "Design", icon: "ri:palette-line", jobCount: 34 },
  { jobType: "Finance", icon: "ri:money-dollar-circle-line", jobCount: 42 },
  { jobType: "Sales", icon: "ri:bar-chart-2-line", jobCount: 76 },
  { jobType: "HR", icon: "ri:team-line", jobCount: 27 },
  { jobType: "IT Support", icon: "ri:customer-service-2-line", jobCount: 19 },
  { jobType: "Operations", icon: "ri:building-2-line", jobCount: 51 },
];
</script>
