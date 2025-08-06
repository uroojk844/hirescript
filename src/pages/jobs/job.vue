<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import Avatar from "@/components/Avatar.vue";
import JobCard from "@/components/JobCard.vue";
import Loader from "@/components/Loader.vue";
import OutlinedCard from "@/components/OutlinedCard.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import Tag from "@/components/Tag.vue";
import { useJobStore } from "@/stores/jobs.store";
import moment from "moment";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch, } from "vue";
import { useRoute } from "vue-router";

const jobsStore = useJobStore();
const { getIsLoadingJobDetails, getJobDetails, getJobs } = storeToRefs(jobsStore);

const route = useRoute();
const id = route.params?.id as string;

const similarJobs = computed(() => {
  if (getJobs.value && getJobDetails.value) {
    return getJobs.value.
      filter((job) => job.id != id && getJobDetails.value?.title.split(" ")
        .map((word) => job.title.includes(word)));
  } else return [];
});

const lastDate = computed(() => {
  if (getJobDetails.value != null) {
    return moment(getJobDetails.value.createdAt.seconds * 1000).add(7, "day").format('ll');
  }
})

const top = ref<HTMLElement | null>(null);

watch(() => route.params.id, async (newId, _) => {
  await jobsStore.fetchJobById(newId as string);
  top.value?.scrollIntoView({behavior: "smooth"});
}, { deep: true, immediate: true })

onMounted(() => {
  jobsStore.fetchJobs();
  jobsStore.fetchJobById(id);
})
</script>
+

<template>
  <Loader v-if="getIsLoadingJobDetails" />
  <div v-else-if="getJobDetails == null">Job not found!</div>
  <main ref="top" v-else class="job-container">
    <section class="flex items-center gap-6 mb-8 title">
      <Avatar :src="getJobDetails.companyLogo" class="size-20" />
      <div>
        <div class="font-bold text-2xl capitalize">{{ getJobDetails.title }}</div>
        <div class="text-sm text-gray mb-2 capitalize">
          {{ getJobDetails.company }}
        </div>

        <div class="text-xs text-gray">Posted by</div>
        <div class="text-sm capitalize">{{ getJobDetails.postedBy }}</div>
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
      <OutlinedCard direction="row" class="my-2 flex-wrap">
        <Tag v-for="(tag, index) in getJobDetails.skills.split(',')" :key="index" v-text="tag" />
      </OutlinedCard>
    </section>

    <section class="grid gap-4 content-start submit">
      <div class="flex items-center justify-between gap-4">
        <div class="font-bold">Submit Application</div>
        <Tag v-if="getJobDetails.createdAt" class="flex items-center gap-1 bg-red-100 text-red-500 font-medium">
          <span>Apply before {{ lastDate }}</span>
          <Icon icon="uil:info-circle" />
        </Tag>
      </div>

      <div class="flex items-center gap-6">
        <PrimaryButton class="bg-primary text-white flex-1">Apply</PrimaryButton>
        <Icon icon="uil:share-alt" class="text-lg text-gray" />
        <Icon icon="material-symbols:favorite-rounded" class="text-lg text-red-400" />
      </div>
    </section>

    <div class="info">
      <div>Job Information & Benefits</div>
      <OutlinedCard class="mt-2">
        <div class="font-bold">Job Type</div>
        <div class="grid grid-cols-2 gap-4 capitalize">
          <OutlinedCard direction="row" size="sm">
            <Icon icon="uil:suitcase-alt" /> {{ getJobDetails.type }}
          </OutlinedCard>
          <OutlinedCard direction="row" size="sm">
            <Icon icon="uil:location-point" /> {{ getJobDetails.location }}
          </OutlinedCard>
          <OutlinedCard direction="row" size="sm">
            <Icon icon="uil:location-point" /> {{ getJobDetails.location }}
          </OutlinedCard>
          <OutlinedCard direction="row" size="sm">
            <Icon icon="uil:location-point" /> {{ getJobDetails.location }}
          </OutlinedCard>
        </div>
      </OutlinedCard>
    </div>

    <div class="company sm:max-w-80">
      <div class="mb-2">Company</div>
      <OutlinedCard>
        <div class="font-bold">About {{ getJobDetails.company }}</div>
        <p class="text-gray text-xs">{{ getJobDetails.about }}</p>
        <a v-if="getJobDetails.website" class="text-blue-700 hover:underline text-xs" :href="getJobDetails.website"
          target="_blank">{{ getJobDetails.website }}</a>
      </OutlinedCard>
    </div>
  </main>

  <section class="mt-8">
    <AppHeader text="Similar jobs" class="text-xl" />

    <section class="grid-view">
      <JobCard v-for="job in similarJobs?.slice(0, 6)" :key="job.id" :job />
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
