<script setup lang="ts">
import 'animate.css';
import JobTypes from "@/components/Home/JobTypes.vue";
import SearchBar from "@/components/Home/SearchBar.vue";
import NavBar from "@/components/NavBar.vue";
import MaxWidth from "@/components/MaxWidth.vue";
import JobCard from "@/components/JobCard.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { onMounted } from "vue";
import { useJobStore } from "@/stores/jobs.store";
import { storeToRefs } from "pinia";
import Loader from "@/components/Loader.vue";
import { ref } from "vue";

const jobsStore = useJobStore();
const { getIsLoadingJobs , getJobs} = storeToRefs(jobsStore);

const heroTexts = [
  "Boost your skills, land your dream job!",
  "Learn, grow, succeed – start your journey today",
  "Opportunities are everywhere, grab yours now",
  "Upskill. Apply. Achieve",
  "The right skills lead to the right career",
  "Bridging the gap between Career and Learning"
];


const subTexts = [
  "Discover new opportunities and take your career to the next level",
  "Step into a world of learning and professional growth",
  "Find your dream role with the right guidance and resources",
  "Enhance your abilities and achieve your career goals",
  "Transform your skills into real-world success",
  "Empowering you to reach new heights in your career"
];


const randomIndex = Math.floor(Math.random() * heroTexts.length);

const heroText = ref(heroTexts[randomIndex]);
const subText = ref(subTexts[randomIndex]);


onMounted(() => {
  if (jobsStore.getJobs.length<15) {
  jobsStore.fetchJobs();
}
});
</script>

<template>
  <section class="bg min-h-screen">
    <NavBar />
    <MaxWidth>
      <h1
        class="animate__animated animate__fadeIn text-wrap max-sm:text-4xl text-6xl xl:text-[80px] font-bold text-primary mt-8 sm:mt-24 max-w-lg xl:max-w-2xl text-center mx-auto leading-[1.3] xl:leading-[1.3]">
        {{ heroText }}
      </h1>

      <p class="animate__animated animate__fadeIn text-gray text-center mt-4 mb-8 xl:text-lg">
        {{ subText }}
      </p>

      <SearchBar />

      <section class="my-16">
        <AppHeader text="Trending Jobs" />

        <Loader v-if="getIsLoadingJobs" />
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <JobCard v-for="(job, index) in getJobs.slice(0, 3)" :key="job.id" :job :trending="true" :index />
        </div>
      </section>
    </MaxWidth>
  </section>
  <section>
    <JobTypes />
  </section>
  <section class="py-12">
    <MaxWidth>
      <AppHeader text="Featured job circulars" />
      <Loader v-if="getIsLoadingJobs" />
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard v-for="job in getJobs.slice(0, 12)" :key="job.id" :job />
      </div>
      <RouterLink to="/jobs">
        <PrimaryButton class="mt-12 mx-auto block">Find More Jobs</PrimaryButton>
      </RouterLink>
    </MaxWidth>
  </section>
  <section>
    <MaxWidth>
      <div class="bg-primary rounded-xl py-16 px-4">
        <div class="text-4xl font-bold leading-[1.4] text-white max-w-md mx-auto text-center">
          Never want to miss any Job news?
        </div>
        <div class="max-w-md mx-auto leading-[1.4] text-white text-sm text-center mt-6">
          Subscribe to stay up to date on insights, events and new solutions.
          You can unsubscribe anytime
        </div>
        <div class="flex bg-white max-w-lg mx-auto rounded-full overflow-hidden mt-8">
          <input class="w-full outline-none px-6 py-3 text-sm" type="text" placeholder="Enter your email address" />
          <PrimaryButton variant="accent" class="rounded-l-none">Subscribe</PrimaryButton>
        </div>
      </div>
    </MaxWidth>
    <section>
      <AppFooter />
    </section>
  </section>
</template>

<style>
@reference "@/style.css";

.bg {
  background-image: linear-gradient(#fff0, #fff),
    url("@/assets/images/plus.svg");
  background-size: cover, 40px 40px;
}
</style>
