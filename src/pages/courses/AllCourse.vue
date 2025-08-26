<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import Card from '@/components/Course/Card.vue';
import { useCourseStore } from '@/stores/course.store';
import Loader from '@/components/Loader.vue';

import { onMounted, ref } from 'vue';

const courseStore = useCourseStore();
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  await courseStore.fetchCourses();
  window.scrollTo(0, 0);
  loading.value = false;
});

</script>

<template>
    <Loader v-if="loading" />
    <div class="flex justify-center items-center font-bold" v-else-if="!courseStore.courses?.length">
    No course Found
  </div>
    <div v-else>
    <AppHeader text="All Courses" />

    <section class="grid-res">
        <Card v-for="course in courseStore.courses" :key="course.id" :course="course" />
    </section>
    </div>
</template>

<style scoped>
.grid-res {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>