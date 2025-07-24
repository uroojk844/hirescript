<script setup lang="ts">
import { featuredJobs } from "@/assets/mock/featuredJobs";
import AppHeader from "@/components/AppHeader.vue";
import Avatar from "@/components/Avatar.vue";
import JobCard from "@/components/JobCard.vue";
import OutlinedCard from "@/components/OutlinedCard.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import Tag from "@/components/Tag.vue";
import type { IJob, IJobDetails } from "@/interface/jobs.interface";
import { computed, ref } from "vue";

const jobDetails = ref<IJobDetails>({
  id: 1,
  logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLfm0ooWZDodEBD2zlKPK3xt37ot4lUZHIBw&s",
  title: "UI Designer",
  company: "facebook Meta Inc.",
  postedBy: "sam smith",
  salary: 23443,
  salaryType: "Monthly",
  description: "this is a job.",
  location: "lucknow",
  skills: ["UI Design", "figma", "web design"],
  type: "Internship",
  about:
    "We are seekjng a talented graphic designer to join our Product team, In this role. you Will be responsible for creating illustrations for our digital product- You Will work closely With our product teams to create compelling. on-brand illustrations that commumcate complex Ideas and make our products more engaging for our users.",
  website: "https://www.facebook.com",
});

const similarJobs = computed(() => {
  return featuredJobs.filter(
    (job) =>
      job.id != jobDetails.value.id &&
      job.title.includes(jobDetails.value.title)
  );
});
</script>
+

<template>
  <main class="job-container">
    <section class="flex items-center gap-6 mb-8 title">
      <Avatar :src="jobDetails.logo" class="size-20" />
      <div>
        <div class="font-bold text-2xl capitalize">{{ jobDetails.title }}</div>
        <div class="text-sm text-gray mb-2 capitalize">
          {{ jobDetails.company }}
        </div>

        <div class="text-xs text-gray">Posted by</div>
        <div class="text-sm capitalize">{{ jobDetails.postedBy }}</div>
      </div>
    </section>

    <section class="jd">
      <div>Job Description</div>
      <OutlinedCard class="my-2">
        <p class="text-md">
          We are seeking a talented graphic designer to join our Product team.
          In this role. you will be responsible for creating illustrations for
          our digital product. You will work closely with our product teams to
          create compelling. on-brand illustrations that communicate complex
          ideas and make our products more engaging for our users.
        </p>
        <strong class="uppercase">responsibilities</strong>
        <ul>
          <li>
            Develop and maintain a consistent product illustration style that
            aligns with our brand Identity and values
          </li>
          <li>
            Develop and maintain a library of reusable illustrations that can be
            used across our product portfolio
          </li>
          <li>
            Work closely with the design and product teams to understand their
            needs and create custom illustrations that meet their requirement
          </li>
          <li>
            Collaborate with other designers to ensure that illustrations are
            integrated seamlessly into our products and interfaces
          </li>
        </ul>
      </OutlinedCard>
    </section>

    <section class="req">
      <div>Requirement</div>
      <OutlinedCard class="my-2">
        <p class="text-md">
          We are seeking a talented graphic designer to join our Product team.
          In this role. you will be responsible for creating illustrations for
          our digital product. You will work closely with our product teams to
          create compelling. on-brand illustrations that communicate complex
          ideas and make our products more engaging for our users.
        </p>
        <strong class="uppercase">responsibilities</strong>
        <ul>
          <li>
            Develop and maintain a consistent product illustration style that
            aligns with our brand Identity and values
          </li>
          <li>
            Develop and maintain a library of reusable illustrations that can be
            used across our product portfolio
          </li>
          <li>
            Work closely with the design and product teams to understand their
            needs and create custom illustrations that meet their requirement
          </li>
          <li>
            Collaborate with other designers to ensure that illustrations are
            integrated seamlessly into our products and interfaces
          </li>
        </ul>
      </OutlinedCard>
    </section>

    <section class="skills">
      <div class="flex items-center gap-4">
        <span>Skill Needed</span>
        <span class="flex items-center gap-2">
          <Icon icon="material-symbols:check-circle" class="text-emerald-600" />
          <small class="text-gray">3/5 of your skills match for this iob</small>
        </span>
      </div>
      <OutlinedCard direction="row" class="my-2">
        <Tag
          v-for="(tag, index) in jobDetails.skills"
          :key="index"
          v-text="tag"
        />
      </OutlinedCard>
    </section>

    <section class="grid gap-4 content-start submit">
      <div class="flex items-center justify-between gap-4">
        <div class="font-bold">Submit Application</div>
        <Tag
          class="flex items-center gap-1 bg-red-100 text-red-500 font-medium"
        >
          <span>Apply before 7 Dec</span>
          <Icon icon="uil:info-circle" />
        </Tag>
      </div>

      <div class="flex items-center gap-6">
        <PrimaryButton class="bg-primary text-white flex-1"
          >Apply</PrimaryButton
        >
        <Icon icon="uil:share-alt" class="text-lg text-gray" />
        <Icon
          icon="material-symbols:favorite-rounded"
          class="text-lg text-red-400"
        />
      </div>
    </section>

    <div class="info">
      <div>Job Information & Benefits</div>
      <OutlinedCard class="mt-2">
        <div class="font-bold">Job Type</div>
        <div class="grid grid-cols-2 gap-4 capitalize">
          <OutlinedCard direction="row" size="sm">
            <Icon icon="uil:suitcase-alt" /> {{ jobDetails.type }}
          </OutlinedCard>
          <OutlinedCard direction="row" size="sm">
            <Icon icon="uil:location-point" /> {{ jobDetails.location }}
          </OutlinedCard>
          <OutlinedCard direction="row" size="sm">
            <Icon icon="uil:location-point" /> {{ jobDetails.location }}
          </OutlinedCard>
          <OutlinedCard direction="row" size="sm">
            <Icon icon="uil:location-point" /> {{ jobDetails.location }}
          </OutlinedCard>
        </div>
      </OutlinedCard>
    </div>

    <div class="company sm:max-w-80">
      <div class="mb-2">Company</div>
      <OutlinedCard>
        <div class="font-bold">About {{ jobDetails.company }}</div>
        <p class="text-gray text-xs">{{ jobDetails.about }}</p>
        <a
          v-if="jobDetails.website"
          class="text-blue-700 hover:underline text-xs"
          :href="jobDetails.website"
          target="_blank"
          >{{ jobDetails.website }}</a
        >
      </OutlinedCard>
    </div>
  </main>

  <section class="mt-8">
    <AppHeader text="Similar jobs" class="text-xl" />

    <section class="grid-view">
      <JobCard v-for="job in similarJobs" :key="job.id" :job />
    </section>
  </section>
</template>

<style>
@reference "@/style.css";

ul {
  list-style: disc inside;

  li {
    line-height: 1.7;
  }

  li::marker {
    color: var(--color-primary);
  }
}

.job-container {
  display: grid;
  gap: 16px;
  grid-template-areas:
    "title submit"
    "jd info"
    "req company"
    "skills company";
  grid-template-columns: auto max-content;
}

.title {
  grid-area: title;
}

.jd {
  grid-area: jd;
}

.req {
  grid-area: req;
}

.skills {
  grid-area: skills;
}

.submit {
  grid-area: submit;
}

.info {
  grid-area: info;
}

.company {
  grid-area: company;
}

@media screen and (width < 768px) {
  .job-container {
    grid-template-areas:
      "title"
      "submit"
      "info"
      "jd"
      "req"
      "skills"
      "company";
    grid-template-columns: 1fr;
  }
}
</style>
