<script setup lang="ts">
import { type ICourseDetails } from '@/interface/course.interface';

defineProps<{ courseDetails: ICourseDetails }>();
</script>

<template>
    <div class="p-2">
        <div class="flex gap-2 text-2xl font-semibold my-4 max-sm:text-xl">
            <Icon icon="noto:bookmark-tabs" class="text-3xl max-sm:text-2xl" /> Course content
        </div>
         <div v-html="courseDetails.courseContent" class="bg-gray-100 p-4 rounded-xl max-sm:text-sm"></div>
    </div>
</template>