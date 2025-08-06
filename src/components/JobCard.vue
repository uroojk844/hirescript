<script setup lang="ts">
import { useSalary } from "@/composables/use-salary";
import type { IJob } from "@/interface/jobs.interface";

const { trending = false } = defineProps<{ job: IJob, trending?: boolean, index?: number }>();
const colors = ["#e2f5cd", "#e9ecf8", "#e4eefa"];
</script>

<template>
  <RouterLink :to="'/jobs/' + job.id">
    <div class="rounded-lg p-6 grid gap-y-2" :class="{ 'border border-gray-300': !trending }"
      :style="trending && { backgroundColor: colors[index! % 3] }">
      <div class="flex items-center justify-between">
        <div class="text-primary font-medium line-clamp-1">{{ job.title }}</div>
        <img class="size-8 object-cover object-center" :src="job.companyLogo" :alt="job.company + ' logo'" />
      </div>
      <div class="text-primary text-sm">{{ job.company }}</div>
      <div class="text-gray text-sm line-clamp-2 text-ellipsis">
        {{ job.description }}
      </div>
      <div class="flex items-center gap-4 text-gray">
        <div class="text-xs flex items-center gap-2">
          <Icon icon="ic:sharp-location-on" class="text-lg" />
          <div>{{ job.location }}</div>
        </div>
        <div class="text-xs flex items-center gap-2">
          <Icon icon="heroicons:building-office" class="text-sm" />
          <div>{{ job.type }}</div>
        </div>
      </div>
      <div class="flex justify-between items-center gap-8 mt-4">
        <div class="flex items-center flex-col">
          <div class="text-primary font-medium text-xl">
            {{ useSalary(job.salary) }}
          </div>
          <div class="text-gray text-sm">{{ job.salaryType }}</div>
        </div>
        <button
          class="text-sm font-medium border border-primary rounded-full flex-1 py-3 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  </RouterLink>
</template>
