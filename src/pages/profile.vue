<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import MaxWidth from "@/components/MaxWidth.vue";
import NavBar from "@/components/NavBar.vue";
import LinkedAcccounts from "@/components/Profile/LinkedAcccounts.vue";
import ProfileSocials from "@/components/Profile/ProfileSocials.vue";
import SectionCard from "@/components/Profile/SectionCard.vue";
import { Icon } from "@iconify/vue";
import { defineAsyncComponent, provide, ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";
import Tag from "@/components/Tag.vue";
import Portfolios from "@/components/Profile/Portfolios.vue";

const EditProfile = defineAsyncComponent(() => import("@/components/Profile/Edit/EditProfile.vue"));


const userStore = useUserStore();
const { getUser } = storeToRefs(userStore);

const edit = ref(false);
provide("edit", edit);
</script>

<template>
  <EditProfile v-if="edit" />

  <div v-if="getUser" class="bg-[#ecf4f6]">
    <MaxWidth>
      <NavBar />

      <section v-if="getUser" class="rounded-xl overflow-hidden">
        <div class="h-[160px] bg-gray-100 overflow-hidden max-sm:h-[100px]">
          <img :src="getUser.coverPhotoUrl || 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg'"
            alt="Cover" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col md:flex-row justify-between bg-white p-4 md:p-6 gap-4">
          <div class="flex flex-col sm:flex-row items-start gap-4">
            <img
              :src="getUser?.profilePhotoUrl || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png'"
              class="w-20 h-20 sm:size-42 inline-block rounded-full -mt-20 sm:-mt-20" />
            <div class="grid gap-y-2">
              <div class="font-bold text-primary text-lg">{{ getUser.name || "User Name" }}</div>
              <div class="text-sm text-gray" v-if="getUser?.experience?.length">{{ getUser?.experience[0]?.designation +
                " @ " + getUser?.experience[0]?.companyName || "Current Workplace" }}</div>
              <div v-if="getUser?.location?.city && getUser?.location?.state"
                class="text-xs bg-[#c3dce3] text-primary text-center p-1 flex items-center justify-center gap-2 rounded">
                <Icon class="text-xl" icon="material-symbols-light:location-on" />
                {{ getUser?.location?.city }}, {{ getUser?.location?.state }}
              </div>
              <ProfileSocials class="mt-3" />
            </div>
          </div>

          <div class="flex flex-col md:flex-row items-start gap-4">
            <div v-if="getUser?.experience?.length && getUser?.education?.college"
              class="flex flex-col sm:flex-row border border-gray-300 rounded-lg p-2 w-full max-sm:hidden md:w-auto">
              <div v-if="getUser?.experience?.length"
                class="text-sm p-3 pr-6 border-b sm:border-b-0 sm:border-r border-gray-300">
                <div class="font-bold text-primary">Work</div>
                <div class="text-gray">{{ getUser.experience[0]?.companyName || "company name" }}</div>
                <div class="text-gray">{{ getUser.experience[0]?.designation || "company state" }}</div>
              </div>
              <div v-if="getUser?.education?.college != ''" class="text-sm p-3 pl-6">
                <div class="font-bold">Education</div>
                <div class="text-gray">{{ getUser.education?.college }}, {{ getUser.education?.city }} </div>
                <div class="text-gray">{{ getUser.education?.state }}</div>
              </div>
            </div>
            <div class="flex flex-col  items-center gap-4">

              <button @click="edit = true"
                class="text-white bg-primary px-4 py-3 rounded-lg font-medium text-sm cursor-pointer">
                Edit profile
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 max-sm:gap-0">
        <div class="col-span-1">
          <SectionCard title="Skills">
            <div class="flex gap-3 flex-wrap">
              <Tag v-if="getUser?.skills?.length" v-for="(skill, idx) in getUser?.skills" :key="idx">
                {{ skill }}
              </Tag>
              <div v-else class="text-gray text-xs">
                No skills added yet.
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Portfolios">
            <Portfolios />
          </SectionCard>

          <SectionCard title="Linked accounts">
            <LinkedAcccounts />
          </SectionCard>
        </div>

        <div class="col-span-3">
          <div class="bg-white rounded-lg">
            <div class="flex text-sm gap-x-12 p-4 border-b border-gray-300 overflow-x-auto">
              <div class="text-primary font-medium">Background</div>
            </div>

            <div class="py-4 px-8">
              <section v-if="getUser" class="border-b border-gray-300 pb-4">
                <div class="text-primary pb-2 font-medium">About me</div>
                <div v-if="getUser.bio" class="text-sm">
                  {{ getUser.bio }}
                </div>
                <div v-else class="text-sm text-gray">No description provided.</div>
              </section>

              <section class="border-b border-gray-300 py-4">
                <div class="text-primary pb-4 font-medium">Experience</div>

                <div v-if="getUser?.experience?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div v-for="(exp, idx) in getUser.experience" :key="idx" class="flex items-center gap-4">
                    <img :src="`https://img.logo.dev/${exp?.companyName}.com?token=pk_OQqBffoyQ_mPP_urHDkMsg`"
                      :alt="`${exp?.companyName || 'Company'} Logo`" class="size-16 object-cover"
                      @error="($event.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64/e2e8f0/64748b?text=Logo'" />
                    <div class="grid gap-y-1">
                      <div class="text-primary font-medium">{{ exp?.companyName || 'Unknown Company' }}</div>
                      <div class="text-primary">{{ exp?.duration || 'N/A' }}</div>
                      <div class="text-sm text-gray">{{ exp?.designation || 'Position not specified' }}</div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-gray text-sm">
                  No experience added yet.
                </div>
              </section>

              <!-- Responsive portfolio image grid -->
              <section class="border-gray-300 py-4">
                <div class="text-primary pb-4 font-medium">Portfolio</div>
                <div v-if="getUser?.portfolio?.length" class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <img v-for="(item, idx) in getUser?.portfolio" :key="idx"
                    :src="item.image || 'https://via.placeholder.com/300'" alt="Portfolio item"
                    class="rounded-lg object-cover w-full h-48" />
                </div>
                <div v-else class="text-gray text-sm">
                  No portfolio items added yet.
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </MaxWidth>
  </div>
  <div v-else class="flex items-center justify-center h-screen">
    <button v-if="userStore.user" @click="userStore.handleLogout"
      class="text-white cursor-pointer bg-red-500 px-7 py-3 rounded-lg font-medium text-sm w-full md:w-auto">
      Logout
    </button>
  </div>
</template>
