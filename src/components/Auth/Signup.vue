<script setup lang="ts">
import { inject, ref, type Ref } from "vue";
import GoogleLogin from "./GoogleLogin.vue";
import { saveUser } from "@/api/user.api";
import { useUserStore } from "@/stores/user.store";
import type { IUser } from "@/interface/user.interface";

const current = inject<Ref<string>>("authCurrent", ref("Login"));
const userStore = useUserStore();

const fullname = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);

async function handleSignup() {
  if (!fullname.value || !email.value || !password.value) {
    alert("Please fill all fields");
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
    jobs:{
    savedJobs:[],
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
    console.log("Signup successful", res.user);
    current.value = "Login";
  } else {
    alert(res.message);
  }

  loading.value = false;
}
</script>

<template>
  <div class="grid gap-y-5">
    <div class="text-2xl font-bold text-primary">Create your account</div>

    <input
      v-model="fullname"
      type="text"
      class="border border-gray-300 w-full p-3 rounded-full text-sm"
      placeholder="Enter your Full name"
    />
    <input
      v-model="email"
      type="text"
      class="border border-gray-300 w-full p-3 rounded-full text-sm"
      placeholder="Enter your email"
    />
    <input
      v-model="password"
      type="password"
      class="border border-gray-300 w-full p-3 rounded-full text-sm"
      placeholder="Create a password"
    />

    <button
      class="w-full p-3 text-sm bg-primary text-white rounded-full"
      :disabled="loading"
      @click="handleSignup"
    >
      {{ loading ? "Creating..." : "Continue" }}
    </button>

    <div class="flex items-center justify-center gap-4">
      <div class="flex-1 h-px bg-gray-300"></div>
      <div class="text-gray-500 text-sm">or</div>
      <div class="flex-1 h-px bg-gray-300"></div>
    </div>

    <GoogleLogin />

    <div
      @click="current = 'Login'"
      class="text-sm text-gray-500 text-center cursor-pointer"
    >
      Already registered? Login!
    </div>
  </div>
</template>