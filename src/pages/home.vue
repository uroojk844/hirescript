<script setup lang="ts">
import JobTypes from "@/components/Home/JobTypes.vue";
import SearchBar from "@/components/Home/SearchBar.vue";
import NavBar from "@/components/NavBar.vue";
import MaxWidth from "@/components/MaxWidth.vue";
import JobCard from "@/components/JobCard.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { trendingJobs } from "@/assets/mock/trendingJobs";
import { featuredJobs } from "@/assets/mock/featuredJobs";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <section class="bg min-h-screen">
    <NavBar />
    <MaxWidth>
      <h1
        class="text-6xl xl:text-[80px] font-bold text-primary mt-8 sm:mt-24 max-w-lg xl:max-w-2xl text-center mx-auto leading-[1.3] xl:leading-[1.3]"
      >
        Get The Right Job You Deserve
      </h1>
      <p class="text-gray text-center mt-4 mb-8 xl:text-lg">
        1,80,570 jobs listed here! Your dream jobs is waiting.
      </p>
      <SearchBar />
    </MaxWidth>
  </section>
  <section class="py-12">
    <MaxWidth>
      <AppHeader text="Trending Jobs" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard v-for="job in trendingJobs" :key="job.company" :job />
      </div>
    </MaxWidth>
  </section>
  <section>
    <JobTypes />
  </section>
  <section class="py-12">
    <MaxWidth>
      <AppHeader text="Featured job circulars" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard v-for="job in featuredJobs" :key="job.company" :job />
      </div>
      <PrimaryButton class="mt-12 mx-auto block">Find More Jobs</PrimaryButton>
    </MaxWidth>
  </section>
  <section>
    <MaxWidth>
      <div class="bg-primary rounded-xl py-16 px-4">
        <div
          class="text-4xl font-bold leading-[1.4] text-white max-w-md mx-auto text-center"
        >
          Never want to miss any Job news?
        </div>
        <div
          class="max-w-md mx-auto leading-[1.4] text-white text-sm text-center mt-6"
        >
          Subscribe to stay up to date on insights, events and new solutions.
          You can unsubscribe anytime
        </div>
        <div
          class="flex bg-white max-w-md mx-auto rounded-full overflow-hidden mt-8"
        >
          <input
            class="w-full outline-none px-4 py-2 text-sm"
            type="text"
            placeholder="Enter your email address"
          />
          <button
            class="flex-none text-primary text-sm font-medium bg-accent p-4 cursor-pointer"
          >
            Subscribe
          </button>
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
  background-image: url("@/assets/images/plus.svg");
  background-size: 40px 40px;
}
</style>
