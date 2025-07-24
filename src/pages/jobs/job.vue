<script setup lang="ts">
import { useSalary } from "@/composables/use-salary";
import type { IJob } from "@/interface/jobs.interface";
import { ref } from "vue";

const jobDetails = ref<IJob>({
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLfm0ooWZDodEBD2zlKPK3xt37ot4lUZHIBw&s",
  title: "UI Designer",
  company: "Facebook Meta Inc.",
  salary: 23443,
  salaryType: "Monthly",
  description: "This is a job.",
  location: "Lucknow",
  type: "Internship",
});
</script>

<template>
    {{ useSalary(jobDetails.salary) }}
</template>
