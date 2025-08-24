<script setup lang="ts">
import type { IUser } from "@/interface/user.interface";
import { computed } from "vue";

const data = defineModel<IUser>();
const skillsInput = computed({
  get() {
    return Array.isArray(data.value?.skills)
      ? data.value!.skills.join(", ")
      : "";
  },
  set(value: string) {
    if (data.value) {
      data.value.skills = value
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);
    }
  },
});
</script>

<template>
  <div class="text-primary font-semibold">Basic details</div>

  <div class="grid gap-y-4 mt-4" v-if="data">
    <input v-model="data.name" type="text"  maxlength="20" placeholder="Name"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" required />

    <textarea v-model="data.bio" placeholder="Bio" class="border border-gray-300 rounded-lg p-2 text-sm w-full"
      rows="3"></textarea>

    <!-- College Details -->
    <input v-model="data.education.college" type="text" placeholder="College name"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
    <input v-model="data.education.city" type="text" placeholder="College city"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
    <input v-model="data.education.state" type="text" placeholder="College state"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />

    <!-- Skills (comma separated in UI, stored as array in model) -->
    <input v-model="skillsInput" type="text" placeholder="Enter skills (comma separated)"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />

    <!-- Residential Details -->
    <input v-model="data.location.city" type="text" placeholder="Residential city"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
    <input v-model="data.location.state" type="text" placeholder="Residential state"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
  </div>
</template>
