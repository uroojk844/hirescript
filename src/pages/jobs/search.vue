<template>
    <MaxWidth>
        <AppHeader :text="headerText" />
        <Loader v-if="loading" class="py-12" />
        <div v-else-if="jobs.length === 0" class="text-center text-gray py-12 text-lg">
            No jobs found matching your criteria.
        </div>
        <div v-else class="grid-view gap-6">
            <JobCard v-for="job in jobs" :key="job.id" :job="job" />
        </div>
    </MaxWidth>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import MaxWidth from '@/components/MaxWidth.vue';
import JobCard from '@/components/JobCard.vue';
import Loader from '@/components/Loader.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { searchJobs } from '@/api/jobs.api';
import type { IJobDetails } from '@/interface/jobs.interface';

const route = useRoute();

const rawParams = Array.isArray(route.params.params)
    ? route.params.params[0]
    : route.params.params;

const queryParams = new URLSearchParams(rawParams);
const title = queryParams.get('title')?.trim() || '';
const location = queryParams.get('location')?.trim() || '';

const jobs = ref<IJobDetails[]>([]);
const loading = ref(true);

const headerText = title
    ? location
        ? `Jobs for ${title} in ${location}`
        : `Jobs for ${title}`
    : 'Job Results';

onMounted(async () => {
    if (title) {
        try {
            jobs.value = await searchJobs(title, location);
        } catch (err) {
            console.error('Failed to fetch jobs:', err);
        }
    }
    loading.value = false;
});
</script>
