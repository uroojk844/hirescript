<script setup lang="ts">
import JobTypes from "@/components/Home/JobTypes.vue";
import SearchBar from "@/components/Home/SearchBar.vue";
import Header from "@/components/Header.vue";
import NavBar from "@/components/NavBar.vue";
import MaxWidth from "@/components/MaxWidth.vue";
import JobCard from "@/components/JobCard.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import Footer from "@/components/Footer.vue";

const jobs = [
  {
    title: "Senior UI Designer",
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
    description: "Design and improve user interfaces for our core products.",
    location: "New York, USA",
    type: "Full Time",
    salary: "$20K",
    salaryType: "Annual",
    color: "#e2f5cd",
  },
  {
    title: "Frontend Engineer",
    company: "Meta",
    logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png",
    description:
      "Work on scalable frontend applications for billions of users.",
    location: "Menlo Park, USA",
    type: "Full Time",
    salary: "$25K",
    salaryType: "Annual",
    color: "#e9ecf8",
  },
  {
    title: "Backend Developer",
    company: "Flipkart",
    logo: "https://thumbs.dreamstime.com/b/flipcart-logo-219165303.jpg",
    description:
      "Build robust backend systems for e-commerce platform and enhance the user experience",
    location: "Bangalore, India",
    type: "Full Time",
    salary: "$18K",
    salaryType: "Annual",
    color: "#e4eefa",
  },
];

const jobstwo = [
  {
    title: "Senior UI Designer",
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
    description: "Design and improve user interfaces for our core products.",
    location: "New York, USA",
    type: "Full Time",
    salary: "$20K",
    salaryType: "Annual",
    color: "#e2f5cd",
  },
  {
    title: "Frontend Engineer",
    company: "Meta",
    logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png",
    description:
      "Work on scalable frontend applications for billions of users.",
    location: "Menlo Park, USA",
    type: "Full Time",
    salary: "$25K",
    salaryType: "Annual",
    color: "#e9ecf8",
  },
  {
    title: "Backend Developer",
    company: "Flipkart",
    logo: "https://thumbs.dreamstime.com/b/flipcart-logo-219165303.jpg",
    description:
      "Build robust backend systems for e-commerce platform and enhance the user experience",
    location: "Bangalore, India",
    type: "Full Time",
    salary: "$18K",
    salaryType: "Annual",
    color: "#e4eefa",
  },
  {
    title: "Senior UI Designer",
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
    description: "Design and improve user interfaces for our core products.",
    location: "New York, USA",
    type: "Full Time",
    salary: "$20K",
    salaryType: "Annual",
    color: "#e2f5cd",
  },
  {
    title: "Frontend Engineer",
    company: "Meta",
    logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png",
    description:
      "Work on scalable frontend applications for billions of users.",
    location: "Menlo Park, USA",
    type: "Full Time",
    salary: "$25K",
    salaryType: "Annual",
    color: "#e9ecf8",
  },
  {
    title: "Backend Developer",
    company: "Flipkart",
    logo: "https://thumbs.dreamstime.com/b/flipcart-logo-219165303.jpg",
    description:
      "Build robust backend systems for e-commerce platform and enhance the user experience",
    location: "Bangalore, India",
    type: "Full Time",
    salary: "$18K",
    salaryType: "Annual",
    color: "#e4eefa",
  },
];
</script>

<template>
  <section class="bg min-h-screen">
    <NavBar />
    <h1
      class="text-6xl xl:text-[80px] font-bold text-primary mt-24 max-w-lg xl:max-w-2xl text-center mx-auto leading-[1.3] xl:leading-[1.3]"
    >
      Get The Right Job You Deserve
    </h1>
    <p class="text-gray text-center mt-4 mb-8 xl:text-lg">
      1,80,570 jobs listed here! Your dream jobs is waiting.
    </p>
    <SearchBar />
  </section>
  <section class="py-12">
    <MaxWidth>
      <Header text="Trending Jobs" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard
          v-for="job in jobs"
          :key="job.company"
          v-bind="job"
          variant="filled"
          :color="job.color"
        />
      </div>
    </MaxWidth>
  </section>
  <section>
    <JobTypes />
  </section>
  <section class="py-12">
    <MaxWidth>
      <Header text="Featured job circulars" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard v-for="job in jobstwo" :key="job.company" v-bind="job" />
      </div>
      <PrimaryButton class="mt-12 mx-auto block">Find More Jobs</PrimaryButton>
    </MaxWidth>
  </section>
  <section>
    <MaxWidth>
      <div class="bg-primary rounded-xl p-12">
        <div class="text-4xl font-bold text-white w-[40%] mx-auto text-center">
          Never want to miss any job news?
        </div>
        <div
          class="text-gray w-[40%] mx-auto text-white text-sm text-center mt-4"
        >
          Subscribe to stay up to date on insights, events and new solutions.
          You can unsubscribe anytime
        </div>
        <div class="bg-white w-[50%] mx-auto rounded-full overflow-hidden mt-6">
          <input
            class="w-[80%] outline-none px-4 text-sm"
            type="text"
            placeholder="Enter your email address"
          />
          <button
            class="w-[20%] text-primary text-sm bg-accent p-4 cursor-pointer"
          >
            Subscribe
          </button>
        </div>
      </div>
    </MaxWidth>
    <section>
      <Footer />
    </section>
  </section>
  <RouterLink to="/jobs/123">123</RouterLink>
</template>

<style>
@reference "@/style.css";

.bg {
  background-image: url("@/assets/images/plus.svg");
  background-size: 40px 40px;
}
</style>
