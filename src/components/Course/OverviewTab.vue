<script setup lang="ts">
import type { ICourseDetails } from '@/interface/course.interface'

defineProps<{
  courseDetails: ICourseDetails | null
}>()
</script>
<template>
    <div class="p-2">
        <div class="flex gap-2 text-2xl font-semibold my-4">
            <Icon icon="noto:books" class="text-3xl" /> What you'll learn
        </div>
         <ul class="bg-gray-100 p-4 rounded-xl flex flex-col gap-3 list-inside overview">
            <li v-for="(item, index) in (courseDetails?.overview ? courseDetails?.overview.split(',') : [])"
                :key="index" v-html="item.trim()"
                class="break-words leading-relaxed text-sm sm:text-base">
            </li>
        </ul>
    </div>
</template>