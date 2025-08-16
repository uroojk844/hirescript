<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import { useSalary } from "@/composables/use-salary";
import Avatar from "@/components/Avatar.vue";
import JobCard from "@/components/JobCard.vue";
import OutlinedCard from "@/components/OutlinedCard.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import Tag from "@/components/Tag.vue";
import { useJobStore } from "@/stores/jobs.store";
import moment from "moment";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch, } from "vue";
import { useRoute } from "vue-router";
import { applyJob, shareJob } from "@/api/jobs.api";
import Loader from "@/components/Loader.vue";
import { useUserStore } from "@/stores/user.store";
import NotFound from "@/components/NotFound.vue";
import { useAuthStore } from "@/stores/authShow.store";
import ModalBox from "@/components/ModalBox.vue";

const jobsStore = useJobStore();
const { getIsLoadingJobDetails, getJobDetails, getJobs } = storeToRefs(jobsStore);

const userStore = useUserStore();
const { getUser } = storeToRefs(userStore);

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
  top.value?.scrollIntoView({ behavior: "smooth" });
}, { deep: true, immediate: true })

const isModelActive = ref<boolean>(false);

function confirmApplied() {
  isModelActive.value = true;
  window.removeEventListener("focus", confirmApplied);
}

function handleApplyJob() {
  if (getUser.value) {
    window.open(getJobDetails.value?.applyLink, "_blank");
    window.addEventListener("focus", confirmApplied);
  } else {
    useAuthStore().showAuth();
  }
}

async function markJobApplied() {
  await applyJob(id);
  isModelActive.value = false;
}

const isApplied = computed(() => {
  if (route.params?.id) {    
    return getUser.value?.jobs.appliedJobs.includes(route.params.id as string);
  }
});

const matchingSkills = computed(() => {
  return getJobDetails.value?.skills
    .filter((s) => getUser.value?.skills.includes(s)) || [];
});

onMounted(() => {
  window.scrollTo(0, 0);
  jobsStore.fetchJobs();
  jobsStore.fetchJobById(id);
});

</script>

<template>
  <ModalBox v-model="isModelActive" @confirm="markJobApplied" />
  <Loader v-if="getIsLoadingJobDetails" />
  <NotFound v-else-if="getJobDetails == null">Job not found!</NotFound>
  <main ref="top" v-else class="grid lg:flex gap-4">
    <div class="contents lg:grid gap-4 content-start flex-1">
      <section class="flex items-center gap-6 mb-2">
        <Avatar :src="getJobDetails.companyLogo" class="size-20" />
        <div>
          <div class="font-bold text-2xl capitalize">{{ getJobDetails.title }}</div>
          <div class="text-sm text-gray mb-2 capitalize">
            {{ getJobDetails.company }}
          </div>
          <div v-if="getJobDetails.postedBy" class="text-xs text-gray">Posted by</div>
          <div class="text-sm capitalize">{{ getJobDetails.postedBy }}</div>
        </div>
      </section>

      <section>
        <div>Job Description</div>
        <OutlinedCard class="my-2 max-w-none break-all">
          <div v-html="getJobDetails.jobDescription || getJobDetails.description"></div>
        </OutlinedCard>
      </section>

      <section v-if="getJobDetails.jobRequirements">
        <div>Requirement And Responsibilities</div>
        <OutlinedCard class="my-2 max-w-none break-all">
          <div v-html="getJobDetails.jobRequirements"></div>
        </OutlinedCard>
      </section>

      <section>
        <div class="flex items-center gap-4">
          <span>Skill Needed</span>
          <span class="flex items-center gap-2">
            <Icon icon="material-symbols:check-circle" class="text-emerald-600" />
            <small class="text-gray flex gap-1">{{ matchingSkills?.length }}/{{ getJobDetails.skills.length }}
              <span class="hidden sm:block">of your skills match for this job</span>
              <span class="block sm:hidden">matching skills</span>
            </small>
          </span>
        </div>
        <OutlinedCard direction="row" class="my-2 flex-wrap max-w-none">
          <Tag v-for="(tag, index) in getJobDetails.skills" :key="index" v-text="tag" class="whitespace-break-spaces break-all"
            :class="{ 'bg-green-200': matchingSkills?.includes(tag.toLowerCase()) }" />
        </OutlinedCard>
      </section>
    </div>

    <div class="contents lg:grid gap-4 md:min-w-sm md:max-w-sm content-start">
      <section class="grid gap-4 content-start max-lg:row-start-2">
        <div class="flex max-sm:flex-col max-sm:items-start items-center justify-between gap-4">
          <div class="font-bold max-sm:hidden">Submit Application</div>
          <Tag v-if="getJobDetails.createdAt" class="flex items-center gap-1 bg-red-100 text-red-500 font-medium">
            <span>Apply before {{ lastDate }}</span>
            <Icon icon="uil:info-circle" />
          </Tag>
        </div>
        <div class="flex items-center gap-6">
          <PrimaryButton v-if="!isApplied" @click="handleApplyJob" class="flex-1">Apply</PrimaryButton>
          <PrimaryButton v-else class="flex-1">Applied</PrimaryButton>
          <Icon @click="shareJob(getJobDetails)" icon="uil:share-alt" class="text-lg cursor-pointer text-gray" />
          <!-- TODO: Will be added later -->
          <!-- <Icon icon="material-symbols:favorite-outline-rounded" class="text-lg hidden" /> -->
        </div>
      </section>

      <div>
        <div>Job Information & Benefits</div>
        <OutlinedCard class="mt-2 max-w-none">
          <div class="font-bold">Job Type</div>
          <div class="grid grid-cols-2 gap-4 capitalize">
            <OutlinedCard direction="row" size="sm">
              <Icon icon="ic:round-computer" /> {{ getJobDetails.type }}
            </OutlinedCard>
            <OutlinedCard direction="row" size="sm">
              <Icon icon="uil:suitcase-alt" /> {{ getJobDetails.experience == null ? "Not specified" :
                getJobDetails.experience }}
            </OutlinedCard>
            <OutlinedCard direction="row" size="sm">
              <Icon icon="tdesign:money" /> <span :title="useSalary(getJobDetails.salary, 'standard')"
                class="lg:max-w-32 text-ellipsis overflow-hidden">{{ useSalary(getJobDetails.salary, "standard")
                }}</span>
            </OutlinedCard>
            <OutlinedCard direction="row" size="sm">
              <Icon icon="uil:location-point" /> <span
                class="line-clamp-1 lg:max-w-32 text-ellipsis whitespace-nowrap">{{ getJobDetails.location }}</span>
            </OutlinedCard>
          </div>
        </OutlinedCard>
      </div>

      <div v-if="getJobDetails.companyDescription">
        <div class="mb-2">Company</div>
        <OutlinedCard class="max-w-none">
          <div class="font-bold">About {{ getJobDetails.company }}</div>
          <p class="text-gray text-xs break-all" v-html="getJobDetails.companyDescription"></p>
          <a v-if="getJobDetails.website" class="break-all text-blue-700 hover:underline text-xs"
            :href="getJobDetails.website" target="_blank">{{ getJobDetails.website }}</a>
        </OutlinedCard>
      </div>
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
</style>
