<template>
  <div class="bg-[#ecf4f6] py-16">
    <MaxWidth>
      <Header text="One Platform Many Solutions" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="job in jobTypes" :key="job.jobType" :to="`/jobs/category/${job.jobType}`">
          <JobTypesCard :job-type="job.jobType" :icon="job.icon"/>
        </div>
      </div>
    </MaxWidth>
  </div>
</template>

<script setup lang="ts">
import Header from "../AppHeader.vue";
import JobTypesCard from "../JobTypesCard.vue";
import MaxWidth from "../MaxWidth.vue";
const jobTypes = [
  { jobType: "Marketing", icon: "ri:briefcase-line"},
  { jobType: "Engineering", icon: "ri:settings-3-line"},
  { jobType: "Design", icon: "ri:palette-line"},
  { jobType: "Finance", icon: "ri:money-dollar-circle-line"},
  { jobType: "Sales", icon: "ri:bar-chart-2-line"},
  { jobType: "HR", icon: "ri:team-line" },
  { jobType: "IT Support", icon: "ri:customer-service-2-line" },
  { jobType: "Operations", icon: "ri:building-2-line" },
];
</script>
