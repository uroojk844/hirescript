<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import Card from '@/components/Course/Card.vue';
import { useCourseStore } from '@/stores/course.store';
import { onMounted } from 'vue';

const courseStore = useCourseStore();

onMounted(() => {
  courseStore.fetchCourses()  
  window.scrollTo(0, 0);
});
</script>

<template>
    <AppHeader text="All Courses" />

    <section class="grid-res">
        <Card v-for="course in courseStore.courses" :key="course.id" :course="course" />
    </section>
</template>

<style scoped>
.grid-res {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>