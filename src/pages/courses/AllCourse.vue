<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import Card from '@/components/Course/Card.vue';
import { useCourseStore } from '@/stores/course.store';
import Loader from '@/components/Loader.vue';

import { onMounted, ref } from 'vue';
import { getHackathons, getInternship } from '@/api/jobs.api';
import type { IJob } from '@/interface/jobs.interface';
import JobCard from '@/components/JobCard.vue';
import { Icon } from '@iconify/vue';

const courseStore = useCourseStore();
const loading = ref(true);

const challenges = ref<IJob[]>();
const internship = ref<IJob[]>();

async function getChallenges() {
  try {
    const response = await getHackathons();
    console.log(response)
    challenges.value = response.jobs;
  } catch (error) {
    console.error('Error fetching challenges:', error);
  }
}
async function getOpportunity() {
  try {
    const response = await getInternship();
    console.log(response)
    internship.value = response.jobs;
  } catch (error) {
    console.error('Error fetching challenges:', error);
  }
}

onMounted(async () => {
  getChallenges()
  getOpportunity()
  loading.value = true;
  await courseStore.fetchCourses();
  window.scrollTo(0, 0);
  loading.value = false;
});

var langs = ['Java', 'Javascript', 'Express', 'Python', 'Nodejs', 'PHP', 'TypeScript', 'React'];


</script>

<template>
  <section class="flex flex-col items-center text-primary gap-y-6 py-16">
    <div class="text-6xl sm:text-5xl lg:text-6xl font-bold text-center animate__animated animate__fadeIn">Learn. Code.
      Succeed</div>
    <div class="text-center sm:text-lg lg:text-xl w-full sm:w-[80%] lg:w-[58%] animate__animated animate__fadeIn">Master
      programming through interactive courses, compete in hackathons and
      land your dream internship at top
      tech companies</div>
    <div class="flex flex-col sm:flex-row gap-4 mt-6">
      <button class="bg-primary text-white px-6 py-2 rounded flex items-center gap-4 cursor-pointer">Start learning
        <Icon icon="material-symbols:arrow-forward" />
      </button>
      <button class="border border-primary px-6 py-2 rounded cursor-pointer">View opportunites</button>
    </div>
  </section>

  <section class="py-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <!-- removed see all from languages section -->
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="language in langs"
        class="flex  flex-col sm:flex-row gap-4 items-center border border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-100">
        <img class="size-16"
          :src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${language.toLowerCase()}/${language.toLowerCase()}-original.svg`"
          alt="">
        <div>{{ language }}</div>

      </div>
    </div>
  </section>

  <section class="py-6">
    <div class="flex flex-row justify-between">
      <AppHeader text="Join Hackathons" />
      <!-- functional see all for hackathon filteration -->
      <RouterLink to="/jobs/category/Hackathon" class="flex items-center font-bold text-primary cursor-pointer">
        <span class="flex flex-row items-center mb-6 gap-1 sm:gap-2">
          See all
          <Icon icon="material-symbols:arrow-right-alt" />
        </span>
      </RouterLink>
    </div>
    <Loader v-if="loading" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <JobCard v-for="(job, index) in challenges" :key="job.id" :job :trending="true" :index />
    </div>
  </section>


  <section class="py-6">
    <div class="flex flex-row justify-between">
      <AppHeader text="Get Internships" />
      <!-- functional see all for internship filteration -->
      <RouterLink to="/jobs/category/Internship" class="flex items-center gap-2 font-bold text-primary cursor-pointer">
        <span class="flex flex-row items-center mb-6 gap-1 sm:gap-2">
          See all
          <Icon icon="material-symbols:arrow-right-alt" />
        </span>
      </RouterLink>
    </div>
    <Loader v-if="loading" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <JobCard v-for="(job, index) in internship" :key="job.id" :job :trending="true" :index />
    </div>
  </section>

  <div class="py-6">
    <div class="flex flex-row justify-between">
      <AppHeader text="Master classes" />
      <RouterLink to="#" class="flex items-center gap-2 font-bold text-primary cursor-pointer">
        <span class="flex flex-row items-center mb-6 gap-1 sm:gap-2">See all
          <Icon icon="material-symbols:arrow-right-alt" />
        </span>
      </RouterLink>
    </div>
    <Loader v-if="loading" />
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