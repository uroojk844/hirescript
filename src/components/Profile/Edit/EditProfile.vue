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
const current = ref("Basic");
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
      alert(error)
    }
  }
  saving.value = false;
}


onMounted(() => {
  if (getUser.value != null) {
    feilds.value = getUser.value;
  }
});

</script>
<template>

  <div class="inset-0 fixed bg-black/50 z-50 grid place-items-center">
    <div class="w-[50%] max-sm:w-[90%] bg-white rounded-lg">
      <div class="text-primary p-4 border-b border-gray-300 flex items-center justify-between">
        Edit profile
        <Icon @click="edit = false" icon="stash:times-light" class="text-2xl cursor-pointer" />
      </div>
      <div class="border-b border-gray-300 md:hidden max-sm:flex">
        <div @click="current = 'Basic'" class="py-2 px-4 text-sm cursor-pointer">
          Basic
        </div>
        <div @click="current = 'Portfolio'" class="py-2 px-4 text-sm cursor-pointer">
          Portfolio
        </div>
        <div @click="current = 'Experience'" class="py-2 px-4 text-sm cursor-pointer">
          Experience
        </div>
        <div @click="current = 'Linked'" class="py-2 px-4 text-sm cursor-pointer">
          Linked accounts
        </div>
      </div>
      <div class="grid grid-cols-4 items-start max-sm:grid-cols-1">
        <div class="col-span-1 grid max-sm:hidden">
          <div @click="current = 'Basic'" class="text-sm py-3 px-5 hover:bg-gray-100 cursor-pointer">
            Basic details
          </div>
          <div @click="current = 'Experience'" class="text-sm py-3 px-5 hover:bg-gray-100 cursor-pointer">
            Experience
          </div>
          <div @click="current = 'Portfolio'" class="text-sm py-3 px-5 hover:bg-gray-100 cursor-pointer">
            Portfolio
          </div>
          <div @click="current = 'Linked'" class="text-sm py-3 px-5 hover:bg-gray-100 cursor-pointer">
            Linked accounts
          </div>
        </div>
        <div class="col-span-3 p-4 border-l border-gray-300 h-[560px] overflow-auto">
          <BasicDetails v-model="feilds" v-if="current == 'Basic'" />
          <LinkedAccounts v-model="feilds" v-else-if="current == 'Linked'" />
          <Experience v-model="feilds" v-else-if="current == 'Experience'" />
          <Portfolio v-model="feilds" v-else />
          <button :disabled="saving" class="cursor-pointer bg-primary mt-3 text-white text-sm px-3 py-2 rounded-md flex justify-center"
            @click="updateUserData">
            <Icon v-if="saving" icon="svg-spinners:3-dots-bounce" class="text-2xl text-white" />
            <span v-else>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
