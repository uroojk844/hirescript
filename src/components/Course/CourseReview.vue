<script setup lang="ts">
import type { ICourseDetails } from '@/interface/course.interface'

defineProps<{
  courseDetails: ICourseDetails | null
}>()
</script>

<template>
    <div class="p-2">
        <div class="flex gap-2 text-2xl font-semibold my-4">
            <Icon icon="mdi:comment-text-multiple-outline" class="text-3xl" /> Customer Reviews
        </div>
         <ul class="bg-gray-100 p-4 rounded-xl grid gap-4 overview">
      <li
        v-for="(point, index) in courseDetails?.reviews"
        :key="index"
      >
        {{ point }}
      </li>
    </ul>
    </div>
</template>
