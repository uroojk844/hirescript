<script setup lang="ts">
import { computed, ref } from "vue";
import GoogleLogin from "./GoogleLogin.vue";
import { saveUser } from "@/api/user.api";
import { useUserStore } from "@/stores/user.store";
import type { IUser } from "@/interface/user.interface";
import PrimaryButton from "../PrimaryButton.vue";
import InputField from "../InputField.vue";
import Separator from "../Separator.vue";
import { useAuthStore } from "@/stores/authShow.store";

const userStore = useUserStore();

const message = ref("");

const fullname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const isPasswordMatching = computed(() => password.value === confirmPassword.value);

const loading = ref(false);

const authStore = useAuthStore();

async function handleSignup() {
  if (!fullname.value || !email.value || !password.value) {
    message.value = "Please fill all fields";
    return;
  }

  loading.value = true;

  const newUser: IUser = {
    name: fullname.value,
    profilePhotoUrl: "",
    email: email.value,
    password: password.value,
    coverPhotoUrl: "",
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
      instagram: "",
      dribbble: "",
      mail: "",
      whatsapp: "",
    },
    jobs: {
      savedJobs: [],
      appliedJobs: [],
    },
    portfolioLinks: {
      behance: "",
      dribbble: "",
      canva: "",
      github: "",
    },
    experience: [],
    portfolio: [],
    uid: "",
  };

  const res = await saveUser(newUser);

  if (res.success && res.user) {
    userStore.setUser(res.user);
    authStore.setSeletedForm('Login');
  } else {
    console.error(res.message);
  }

  loading.value = false;
}
</script>

<template>
  <form @submit.prevent="handleSignup" method="post" class="grid gap-y-5">
    <div class="text-2xl font-bold text-primary">Create your account</div>

    <InputField v-model="fullname" name="name" placeholder="Enter your full name" />

    <InputField v-model="email" type="email" name="email" placeholder="Enter your email" />

    <InputField v-model="password" type="password" placeholder="Create a password" />

    <InputField v-model="confirmPassword" type="password" placeholder="Confirm password" />

    <PrimaryButton :loading :disabled="!isPasswordMatching">Continue</PrimaryButton>

    <div v-if="message">
      <div class="text-sm text-red-500">{{ message }}</div>
    </div>

    <Separator />

    <GoogleLogin />

    <div @click="authStore.setSeletedForm('Login')" class="text-sm text-gray-500 text-center cursor-pointer">
      Already registered? Login!
    </div>
  </form>
</template>