<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import Loader from '@/components/Loader.vue';
import MaxWidth from '@/components/MaxWidth.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import Tag from '@/components/Tag.vue';
import { useSalary } from '@/composables/use-salary';
import { fireDB } from '@/firebase/config';
import type { ICourseDetails } from '@/interface/course.interface';
import { useAuthStore } from '@/stores/authShow.store';
import { useCourseStore } from '@/stores/course.store';
import { useUserStore } from '@/stores/user.store';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const authStore = useAuthStore();

const buttonLoading = ref(false);
const disabled = ref(false);



const courseStore = useCourseStore();
const course = ref<ICourseDetails | null>(null);

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
        key: "reviews",
        component: defineAsyncComponent(() => import("@/components/Course/CourseReview.vue")),
    }
];

const selectedTabView = computed(() => {
    return tabs.find((t) => t.key === selectedTab.value)?.component || NotFound;
});



//Course Registration Logic


const openCourseLink = (link: string) => {
    window.open(link, "_blank");
};

const hasCourseStarted = (startDate: string | undefined | null) => {
    if (!startDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year,month,day] = startDate.split("-").map(Number);
    const courseDate = new Date(year, month - 1, day);
    return today >= courseDate;
}

const handleRegister = async (courseId: string) => {
    if (!userStore.getUser?.email) {
        authStore.showAuth();
    }
    buttonLoading.value = true;
    try {
        const courseRef = doc(fireDB, "courses", courseId);
        const courseSnap = await getDoc(courseRef);
        const data = courseSnap.data();
        const registered = data?.registeredStudents || [];

        if (registered.includes(userStore.getUser?.email)) {
            buttonLoading.value = false;
            return;
        }

        await updateDoc(courseRef, {
            registeredStudents: arrayUnion(userStore.getUser?.email),
        });

        window.location.reload();
        disabled.value = true;
    } catch (error) {
        console.error("Error registering user:", error);
    } finally {
        buttonLoading.value = false;
    }
};

const isRegistered = computed(() => {
    return course.value?.registeredStudents?.includes(userStore.getUser?.email) || false;
});

const buttonText = computed(() => {
    if (!isRegistered.value) return "Register Now";
    if (!hasCourseStarted(course.value?.startDate)) return "Course starts on " + course.value?.startDate;
    return "Start Now";
});

const isButtonDisabled = computed(() => {
    return buttonLoading.value || disabled.value || (isRegistered.value && !hasCourseStarted(course.value?.startDate));
});

const handleButtonClick = () => {
    if (!isRegistered.value) {
        handleRegister(route.params.id as string);
    } else if (hasCourseStarted(course.value?.startDate)) {
        openCourseLink(course.value?.link as string);
    }
};



onMounted(async () => {
    window.scrollTo(0, 0);
    const id = route.params.id as string;
    const result = await courseStore.fetchCourseById(id);
    if (result) {
        course.value = result;
    }
})

</script>

<template>
    <AppHeader text="All Courses" />
    <MaxWidth >
        <section class="grid gap-4 md:grid-cols-[1fr_400px] grid-cols-1 items-start">
            <div class="border border-gray-200 rounded-2xl overflow-hidden">
                <div class="p-4 grid gap-4">
                    <div class="text-3xl font-bold">{{ course?.title }}</div>
                    <div class="flex gap-2 items-center">
                        <Tag class="flex items-center gap-1 bg-orange-100/70">
                            <Icon icon="mdi:star" class="text-orange-400" /> <span class="font-semibold text-primary">{{
                                course?.rating }}</span>
                        </Tag>
                        <span class="text-gray text-sm">{{ course?.registeredStudents.length }} students</span>
                    </div>
                    <div class="text-gray text-sm mt-2">
                        {{ course?.description }}
                    </div>
                </div>
            </div>

            <div class="group p-4 border border-gray-200 rounded-2xl grid gap-4 sm:max-w-md md:col-start-2 md:row-span-2">
                <div class="w-full aspect-video rounded-lg overflow-hidden">
                    <img :src="course?.image" :alt="course?.title"
                        class="object-cover object-center size-full group-hover:scale-110 duration-500 transition-transform" />
                </div>
                <div class="text-2xl font-bold">{{ useSalary(course?.price ?? 0, 'standard') }}</div>
                <div class="font-semibold -mt-2">This course includes:</div>
                <ul class="grid gap-2 text-gray">
                    <li class="flex items-center gap-2">
                        <Icon icon="mdi:web" /> {{ course?.language }}
                    </li>
                    <li class="flex items-center gap-2">
                        <Icon icon="mdi:clock-outline" /> {{ course?.duration }}
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
                <PrimaryButton :disabled="isButtonDisabled" @click="handleButtonClick">
                    {{ buttonText }}
                </PrimaryButton>





            </div>

            <div class="border border-gray-200 rounded-2xl overflow-hidden p-2 card">
                <div class="bg-gray-100 p-2 flex gap-2 rounded-xl flex-wrap">
                    <button v-for="tab in tabs" :key="tab.key" @click="selectedTab = tab.key"
                        class="py-2 flex-1 text-center rounded-lg cursor-pointer max-sm:text-sm"
                        :class="{ 'bg-gray-200': selectedTab == tab.key }">
                        {{ tab.name }}
                    </button>
                </div>

                <component :is="selectedTabView" :courseDetails="course" />
            </div>
        </section>
    </MaxWidth>
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