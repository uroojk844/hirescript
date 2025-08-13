<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import BasicDetails from "./BasicDetails.vue";
import LinkedAccounts from "./LinkedAccounts.vue";
import Experience from "./Experience.vue";
import Portfolio from "./Portfolio.vue";
import { Icon } from "@iconify/vue";
import { useUserStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";
import type { IUser } from "@/interface/user.interface";
import { auth, fireDB } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { getUserData } from "@/api/user.api";

type TTabs = "basic" | "experience" | "portfolio" | "accounts"

const current = ref<TTabs>("basic");
const edit = inject("edit");

const saving = ref(false);
const userStore = useUserStore();
const { getUser } = storeToRefs(userStore);
const feilds = ref<IUser>({
  name: "",
  profilePhotoUrl: "",
  email: "",
  password: "",
  coverPhotoUrl: "",
  designation: "",
  bio: "",
  skills: [],
  education: {
    college: "",
    city: "",
    state: "",
    mail: "",
  },
  location: {
    city: "",
    state: "",
    country: "",
  },
  socialLinks: {
    facebook: "",
    dribble: "",
    twitter: "",
    whatsapp: "",
    linkedin: ""
  },
  jobs: {
    savedJobs: [],
    appliedJobs: [],
  },
  portfolioLinks: {
    behance: "",
    dribble: "",
    canva: "",
    github: "",
  },
  experience: [],
  portfolio: [],
  uid: "",
})
const user = auth.currentUser?.uid;

async function updateUserData() {
  if (user) {
    try {
      saving.value = true;
      const userRef = doc(fireDB, "users", user);
      await updateDoc(userRef, feilds.value);
      getUserData();
    }
    catch (error) {
      console.log(error)
    }
  }
  saving.value = false;
}


onMounted(() => {
  if (getUser.value != null) {
    feilds.value = getUser.value;
  }
});

const tabs: {
  name: string,
  key: TTabs
}[] = [
    {
      name: "Basic details",
      key: "basic",
    },
    {
      name: "Experience",
      key: "experience",
    },
    {
      name: "Linked accounts",
      key: "accounts",
    },
    {
      name: "Portfolio",
      key: "portfolio",
    },
  ]
</script>
<template>

  <div class="inset-0 fixed bg-black/50 z-50 grid place-items-center" @click.self="edit = false">
    <div class="w-[50%] max-sm:w-[90%] bg-white rounded-lg">
      <div class="text-primary p-4 border-b border-gray-300 flex items-center justify-between">
        Edit profile
        <Icon @click="edit = false" icon="stash:times-light" class="text-2xl cursor-pointer" />
      </div>

      <div class="grid grid-cols-4 items-start max-sm:grid-cols-1">
        <div class="flex flex-col max-sm:flex-row h-full overflow-x-auto max-sm:border-b border-light-gray">

          <div v-for="(tab, index) in tabs" :key="index" @click="current = tab.key"
            class="text-sm py-3 px-5 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            :class="{ 'bg-gray-100': tab.key == current }">
            {{ tab.name }}
          </div>

          <div class="px-5 py-3 mt-auto max-sm:hidden">
            <button :disabled="saving"
              class="w-full cursor-pointer bg-primary text-white text-sm px-3 py-2 rounded-md flex justify-center"
              @click="updateUserData">
              <Icon v-if="saving" icon="svg-spinners:3-dots-bounce" class="text-2xl text-white" />
              <span v-else>Save</span>
            </button>
          </div>
        </div>

        <div class="col-span-3 p-4 border-l border-gray-300 h-[560px] overflow-auto">
          <BasicDetails v-model="feilds" v-if="current == 'basic'" />
          <LinkedAccounts v-model="feilds" v-else-if="current == 'accounts'" />
          <Experience v-model="feilds" v-else-if="current == 'experience'" />
          <Portfolio v-model="feilds" v-else />

          <button :disabled="saving"
            class="cursor-pointer bg-primary text-white text-sm px-3 py-2 rounded-md flex justify-center mt-3 sm:hidden"
            @click="updateUserData">
            <Icon v-if="saving" icon="svg-spinners:3-dots-bounce" class="text-2xl text-white" />
            <span v-else>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
