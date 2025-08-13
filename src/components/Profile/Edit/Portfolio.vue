<script setup lang="ts">
import type { IUser } from '@/interface/user.interface';


const data = defineModel<IUser>();

</script>

<template>

  <div class="cursor-pointer text-primary font-semibold">Portfolios</div>

  <div class="grid gap-y-4 mt-3" v-if="data">
    <input v-model="data.portfolioLinks.behance" placeholder="Behance URL"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
    <input v-model="data.portfolioLinks.canva" placeholder="Canva URL"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
    <input v-model="data.portfolioLinks.github" placeholder="Github URL"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
    <input v-model="data.portfolioLinks.dribble" placeholder="Dribbble URL"
      class="w-full border border-gray-300 rounded-lg p-2 text-sm" />
  </div>


</template>
