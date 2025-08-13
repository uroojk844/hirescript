<script setup lang="ts">
import type { IUser } from "@/interface/user.interface";

const data = defineModel<IUser>();

</script>

<template>
  <div class="text-primary font-semibold">Linked accounts</div>
  <div class="grid gap-y-4 mt-4" v-if="data">
    <input v-model="data.socialLinks.facebook" type="url" placeholder="Facebook URL"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
    <input v-model="data.socialLinks.linkedin" type="url" placeholder="LinkedIn URL"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
    <input v-model="data.socialLinks.twitter" type="url" placeholder="Twitter URL"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
    <input v-model="data.socialLinks.dribble" type="url" placeholder="Dribbble URL"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
    <input v-model="data.socialLinks.whatsapp" type="url" placeholder="Whatsapp number"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
  </div>
</template>
