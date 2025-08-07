<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import MaxWidth from '@/components/MaxWidth.vue';
</script>

<template>
    <MaxWidth>
        <AppHeader :text="'Jobs in ' + $route.params.category" />
    </MaxWidth>
</template>