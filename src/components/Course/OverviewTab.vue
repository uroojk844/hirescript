<script setup lang="ts">
import type { ICourseDetails } from '@/interface/course.interface'

defineProps<{
  courseDetails: ICourseDetails | null
}>()
</script>
<template>
    <div class="p-2">
        <div class="flex gap-2 text-2xl font-semibold my-4 max-sm:text-xl ">
            <Icon icon="noto:books" class="text-3xl max-sm:text-2xl " /> What you'll learn
        </div>
         <div v-html="courseDetails?.overview" class="bg-gray-100 p-4 max-sm:p-2 rounded-xl max-sm:text-sm"></div>
    </div>
</template>