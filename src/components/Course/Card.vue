<script setup lang="ts">
import { useSalary } from '@/composables/use-salary';
import PrimaryButton from '../PrimaryButton.vue';
import Tag from '../Tag.vue';
import type { ICourse } from '@/interface/course.interface';

defineProps<{
    course: ICourse;
}>()
</script>

<template>
    <div class="bg-white border border-gray-200 p-2 rounded-2xl group">
        <div class="w-full aspect-video mb-2 rounded-lg overflow-hidden">
            <img :src="course.image" :alt="course.title"
                class="object-cover object-center size-full group-hover:scale-110 duration-500 transition-transform" />
        </div>
        <div class="p-2 grid gap-2">
            <div class="text-lg font-semibold line-clamp-1">{{ course.title }}</div>
            <div class="flex items-center justify-between">
                <div class="font-semibold">{{ useSalary(course.price) }}</div>
                <Tag class="flex items-center gap-1 bg-orange-100/70">
                    <Icon icon="mdi:star" class="text-orange-400" /> <span class="font-semibold text-primary">{{
                        course?.rating || 5 }}</span>
                </Tag>
            </div>
            <hr class="border-dashed border-light-gray my-1">
            <div class="font-semibold">Course Outline</div>
            <ul class="grid gap-2 text-sm">
                <li v-for="(item, index) in (course.courseOutline ? course.courseOutline.split(',') : [])" :key="index"
                    class="flex items-center gap-3">
                    <Icon icon="mdi:book-open-outline" />
                    {{ item.trim() }}
                </li>
            </ul>


            <RouterLink :to="'/courses/' + course.id">
                <PrimaryButton class="mt-2 bg-primary text-white">See Details</PrimaryButton>
            </RouterLink>
        </div>
    </div>
</template>
