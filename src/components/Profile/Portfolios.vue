<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';


const userStore = useUserStore();
const { getUser } = storeToRefs(userStore);

const icons = {
    "dribble": "logos:dribbble-icon",
    "behance": "devicon:behance",
    "canva": "devicon:canva",
    "github": "logos:github-icon",
}

</script>
<template>
    <div v-if="getUser?.portfolioLinks" class="flex gap-2 flex-wrap">
        <a v-for="(item, key) in getUser.portfolioLinks" :key="key" :href="item" target="_blank"
            class="rounded-full border border-gray-300 p-1 cursor-pointer hover:bg-gray-100" :class="{ hidden: !item }">
            <Icon :icon="icons[key]" class="text-sm size-5" />
        </a>
    </div>
    <div v-else class="text-xs text-gray">
        No portfolios added yet.
    </div>
</template>