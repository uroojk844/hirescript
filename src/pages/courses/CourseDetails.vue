<script setup lang="ts">
import { courses } from '@/assets/courses';
import AppHeader from '@/components/AppHeader.vue';
import Loader from '@/components/Loader.vue';
import MaxWidth from '@/components/MaxWidth.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import Tag from '@/components/Tag.vue';
import { useSalary } from '@/composables/use-salary';
import { computed, defineAsyncComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const selectedTab = ref("overview")

const NotFound = defineAsyncComponent(() => import("@/components/NotFound.vue"))

const tabs = [
    {
        name: "Overview",
        key: "overview",
        component: defineAsyncComponent(() => import("@/components/Course/OverviewTab.vue")),
    },
    {
        name: "Course content",
        key: "courseContent",
        component: defineAsyncComponent(() => import("@/components/Course/CourseOutline.vue")),
    },
    {
        name: "Reviews",
        key: "reviews"
    }
];

const selectedTabView = computed(() => {
    return tabs.find((t) => t.key === selectedTab.value)?.component || NotFound;
});

const courseDetails = computed(() => {
    return courses.find((course) => course.id == route.params.id);
});

</script>

<template>
    <AppHeader text="All Courses" />

    <Loader v-if="false" />

    <MaxWidth v-else-if="courseDetails">
        <section class="grid gap-4 grid-cols-[1fr_400px] items-start">
            <div class="border border-gray-200 rounded-2xl overflow-hidden">
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

            <div class="group p-4 border border-gray-200 rounded-2xl grid gap-4 sm:max-w-md col-start-2 row-[1/3]">
                <div class="w-full aspect-video rounded-lg overflow-hidden">
                    <img :src="courseDetails.poster" :alt="courseDetails.title"
                        class="object-cover object-center size-full group-hover:scale-110 duration-500 transition-transform" />
                </div>
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
                <PrimaryButton variant="primary">Start course</PrimaryButton>
            </div>

            <div class="border border-gray-200 rounded-2xl overflow-hidden p-2 card">
                <div class="bg-gray-100 p-2 flex gap-2 rounded-xl">
                    <button v-for="tab in tabs" :key="tab.key" @click="selectedTab = tab.key"
                        class="py-2 flex-1 text-center rounded-lg cursor-pointer"
                        :class="{ 'bg-gray-200': selectedTab == tab.key }">
                        {{ tab.name }}
                    </button>
                </div>

                <component :is="selectedTabView" :courseDetails />
            </div>
        </section>
    </MaxWidth>
    <p v-else>Course not found!</p>
</template>

<style>
.overview {
    li {
        list-style: none;
        position: relative;
        padding-left: 24px;
    }

    li::before {
        position: absolute;
        color: seagreen;
        content: "✓";
        left: 0;
    }
}

.card {
    grid-row: span 2;
}
</style>