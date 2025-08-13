<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';


const userStore = useUserStore();
const { getUser } = storeToRefs(userStore);
</script>
<template>
    <div class="flex gap-2 flex-wrap"
        v-if="getUser?.portfolioLinks?.behance || getUser?.portfolioLinks?.dribble || getUser?.portfolioLinks?.github || getUser?.portfolioLinks?.canva">
        <div v-if="getUser?.portfolioLinks?.behance"
            class="rounded-full border border-gray-300 p-2 cursor-pointer hover:bg-gray-100">
            <Icon icon="logos:behance" class="text-sm" />
        </div>
        <div v-if="getUser?.portfolioLinks?.dribble"
            class="rounded-full border border-gray-300 p-2 cursor-pointer hover:bg-gray-100">
            <Icon icon="logos:dribbble" class="" />
        </div>
        <div v-if="getUser?.portfolioLinks?.github"
            class="rounded-full border border-gray-300 p-2 cursor-pointer hover:bg-gray-100">
            <Icon icon="logos:github" />
        </div>
        <div v-if="getUser?.portfolioLinks?.canva"
            class="rounded-full border border-gray-300 p-2 cursor-pointer hover:bg-gray-100">
            <img class="w-14"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Canva_Logo.svg/2560px-Canva_Logo.svg.png"
                alt="">
        </div>
    </div>
    <div v-else class="text-xs text-gray">
        No portfolios added yet.
    </div>
</template>