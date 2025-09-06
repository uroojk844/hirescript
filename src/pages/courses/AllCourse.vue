<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import Card from '@/components/Course/Card.vue';
import { useCourseStore } from '@/stores/course.store';
import Loader from '@/components/Loader.vue';

import { onMounted, ref } from 'vue';
import { getJobs } from '@/api/jobs.api';
import type { IJob } from '@/interface/jobs.interface';
import JobCard from '@/components/JobCard.vue';
import { Icon } from '@iconify/vue';

const courseStore = useCourseStore();
const loading = ref(true);

const challenges = ref<IJob[]>();

async function getChallenges() {
  try {
    const response = await getJobs(3);
    challenges.value = response.jobs;
  } catch (error) {
    console.error('Error fetching challenges:', error);
  }
}

onMounted(async () => {
  getChallenges()
  loading.value = true;
  await courseStore.fetchCourses();
  window.scrollTo(0, 0);
  loading.value = false;
});

var langs = ['Java', 'Javascript', 'Express', 'Python', 'Nodejs', 'PHP', 'TypeScript', 'React'];


</script>

<template>
  <section class="flex flex-col items-center text-primary gap-y-6 py-16">
    <div class="text-6xl font-bold">Learn. Code. Succeed</div>
    <div class="text-xl w-[58%] text-center">Master programming through interactive courses, compete in hackathons and
      land your dream internship at top
      tech companies</div>
    <div class="flex gap-5 mt-6">
      <button class="bg-primary text-white px-6 py-2 rounded flex items-center gap-4 cursor-pointer">Start learning
        <Icon icon="material-symbols:arrow-forward" />
      </button>
      <button class="border border-primary px-6 py-2 rounded cursor-pointer">View opportunites</button>
    </div>
  </section>
  <section class="py-6">
    <div class="flex items-center justify-between">
      <AppHeader text="Compete with others" />
      <div class="flex items-center gap-2 font-bold text-primary cursor-pointer">See all
        <Icon icon="material-symbols:arrow-right-alt" />
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <JobCard v-for="(job, index) in challenges" :key="job.id" :job :trending="true" :index />
    </div>
  </section>
  <section class="py-6">
    <div class="flex items-center justify-between">
      <AppHeader text="Learn to code" />
      <div class="flex items-center gap-2 font-bold text-primary cursor-pointer">See all
        <Icon icon="material-symbols:arrow-right-alt" />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 max-sm:grid-cols-2">
      <div v-for="language in langs"
        class="flex gap-4 items-center border border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-100">
        <img class="size-16"
          :src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${language.toLowerCase()}/${language.toLowerCase()}-original.svg`"
          alt="">
        <div>{{ language }}</div>

      </div>
    </div>
  </section>
  <Loader v-if="loading" />
  <div class="flex justify-center items-center font-bold" v-else-if="!courseStore.courses?.length">
    No course Found
  </div>
  <div v-else class="py-6">
    <div class="flex items-center justify-between">
      <AppHeader text="Master classes" />
      <div class="flex items-center gap-2 font-bold text-primary cursor-pointer">See all
        <Icon icon="material-symbols:arrow-right-alt" />
      </div>
    </div>
    <section class="grid-res">
      <Card v-for="course in courseStore.courses" :key="course.id" :course="course" />
    </section>
  </div>

</template>

<style scoped>
.grid-res {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>