<script setup lang="ts">
const users: string[] = ["Urooj", "Belal"];
</script>
<template>
  <h1>Users</h1>
  <ul>
    <li v-for="(user, index) in users" :key="index">{{ user }}</li>
  </ul>
</template>
