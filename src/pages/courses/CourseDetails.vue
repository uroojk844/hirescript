<script setup lang="ts">
import { courses } from '@/assets/courses';
import Loader from '@/components/Loader.vue';
import MaxWidth from '@/components/MaxWidth.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import Tag from '@/components/Tag.vue';
import { useSalary } from '@/composables/use-salary';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const tabs = ["Overview", "Course content", "Instructor", "Reviews"];

const courseDetails = computed(() => {
    return courses.find((course) => course.id == route.params.id);
});
</script>

<template>
    <AppHeader text="All Courses" />

    <Loader v-if="false" />
    <MaxWidth v-else-if="courseDetails">
        <section class="grid items-start sm:grid-cols-[auto_400px] gap-4">
            <div class="border border-light-gray rounded-2xl overflow-hidden">
                <div class="p-4 grid gap-4">
                    <div class="text-3xl font-bold">{{ courseDetails.title }}</div>
                    <div class="flex gap-2 items-center">
                        <Tag class="flex items-center gap-1 bg-orange-100/70">
                            <Icon icon="mdi:star" class="text-orange-400" /> <span class="font-semibold text-primary">{{
                                courseDetails.rating }}</span>
                        </Tag>
                        <span class="text-gray text-sm">21,344 students</span>
                    </div>
                    <div class="text-gray text-sm mt-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et
                        veritatis quod? Odio quisquam, minus nihil ullam praesentium deserunt eveniet laudantium nostrum
                        iste, facilis corrupti, possimus voluptatibus? Rerum eius corrupti cum dicta quisquam dolorum,
                        animi
                        quaerat ab neque ullam velit.
                    </div>
                </div>
            </div>

            <div class="border border-light-gray rounded-2xl overflow-hidden p-2">
                <div class="bg-light-gray p-2 flex rounded-xl">
                    <div v-for="tab in tabs" :key="tab" class="py-2 flex-1 text-center">{{ tab }}</div>
                </div>
            </div>

            <div class="col-start-2 row-start-1 row-span-2 group p-4 border border-light-gray rounded-2xl grid gap-4">
                <div class="w-full aspect-video rounded-lg overflow-hidden">
                    <img :src="courseDetails.poster" :alt="courseDetails.title"
                        class="object-cover object-center size-full group-hover:scale-110 duration-500 transition-transform" />
                </div>
                <PrimaryButton variant="primary">Start course</PrimaryButton>
                <div class="text-2xl font-bold">{{ useSalary(courseDetails.price, "standard") }}</div>
                <div class="font-semibold -mt-2">This course includes:</div>
                <ul class="grid gap-2 text-gray">
                    <li class="flex items-center gap-2">
                        <Icon icon="mdi:web" /> {{ courseDetails.language }}
                    </li>
                    <li class="flex items-center gap-2">
                        <Icon icon="mdi:clock-outline" /> {{ courseDetails.duration }}
                    </li>
                    <li class="flex items-center gap-2">
                        <Icon icon="mdi:certificate-outline" /> Certificate on completion
                    </li>
                    <li class="flex items-center gap-2">
                        <Icon icon="fluent:clipboard-text-edit-20-regular" /> 4 practice tests
                    </li>
                    <li class="flex items-center gap-2">
                        <Icon icon="mdi:square-edit-outline" /> Assignments
                    </li>
                    <li class="flex items-center gap-2">
                        <Icon icon="material-symbols:article-person-outline" /> 24 articles
                    </li>
                    <li class="flex items-center gap-2">
                        <Icon icon="mdi:link-variant" /> 20 downloadable resources
                    </li>
                </ul>
            </div>
        </section>
    </MaxWidth>
    <p v-else>Course not found!</p>
</template>