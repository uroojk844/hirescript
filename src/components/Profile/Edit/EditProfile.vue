<script setup lang="ts">
import { inject, ref } from "vue";
import BasicDetails from "./BasicDetails.vue";
import LinkedAccounts from "./LinkedAccounts.vue";
import Experience from "./Experience.vue";
import Portfolio from "./Portfolio.vue";
import { Icon } from "@iconify/vue";

const current = ref("Basic");
const editblock = inject("edit");
</script>
<template>
  <div class="inset-0 fixed bg-black/50 z-50 grid place-items-center">
    <div class="w-[50%] max-sm:w-[90%] bg-white rounded-lg">
      <div
        class="text-primary p-4 border-b border-gray-300 flex items-center justify-between"
      >
        Edit profile
        <Icon
          @click="editblock = 'false'"
          icon="stash:times-light"
          class="text-2xl cursor-pointer"
        />
      </div>
      <div class="border-b border-gray-300 md:hidden max-sm:flex">
        <div
          @click="current = 'Basic'"
          class="py-2 px-4 text-sm cursor-pointer"
        >
          Basic
        </div>
        <div
          @click="current = 'Portfolio'"
          class="py-2 px-4 text-sm cursor-pointer"
        >
          Portfolio
        </div>
        <div
          @click="current = 'Experience'"
          class="py-2 px-4 text-sm cursor-pointer"
        >
          Experience
        </div>
        <div
          @click="current = 'Linked'"
          class="py-2 px-4 text-sm cursor-pointer"
        >
          Linked accounts
        </div>
      </div>
      <div class="grid grid-cols-4 items-start max-sm:grid-cols-1">
        <div class="col-span-1 grid max-sm:hidden">
          <div
            @click="current = 'Basic'"
            class="text-sm py-3 px-5 hover:bg-gray-100 cursor-pointer"
          >
            Basic details
          </div>
          <div
            @click="current = 'Experience'"
            class="text-sm py-3 px-5 hover:bg-gray-100 cursor-pointer"
          >
            Experience
          </div>
          <div
            @click="current = 'Portfolio'"
            class="text-sm py-3 px-5 hover:bg-gray-100 cursor-pointer"
          >
            Portfolio
          </div>
          <div
            @click="current = 'Linked'"
            class="text-sm py-3 px-5 hover:bg-gray-100 cursor-pointer"
          >
            Linked accounts
          </div>
        </div>
        <div class="col-span-3 p-4 border-l border-gray-300 h-[500px]">
          <BasicDetails v-if="current == 'Basic'" />
          <LinkedAccounts v-else-if="current == 'Linked'" />
          <Experience v-else-if="current == 'Experience'" />
          <Portfolio v-else />
        </div>
      </div>
    </div>
  </div>
</template>
