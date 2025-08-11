<script setup lang="ts">
import { courses } from '@/assets/courses';
import AppHeader from '@/components/AppHeader.vue';
import Card from '@/components/Course/Card.vue';

</script>

<template>
    <AppHeader text="All Courses" />

    <section class="grid-res">
        <Card v-for="course in courses" :key="course.id" :course />
    </section>
</template>

<style scoped>
.grid-res {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>