<script setup lang="ts">
import { type ICourseDetails } from '@/interface/course.interface';

defineProps<{ courseDetails: ICourseDetails }>();
</script>

<template>
    <div  class="p-2">
        <div class="flex gap-2 text-2xl font-semibold my-4">
            <Icon icon="noto:bookmark-tabs" class="text-3xl" /> Course content
        </div>
        <ul  class="bg-gray-100 p-4 rounded-xl grid gap-4 list-inside overview">
            <li v-for="(item, index) in (courseDetails?.courseContent ? courseDetails?.courseContent.split(',') : [])"
                :key="index">
                {{ item.trim() }}
            </li>
        </ul>
    </div>
</template>