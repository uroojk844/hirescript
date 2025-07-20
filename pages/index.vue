<script setup lang="ts">
const users: string[] = ["Urooj", "Belal"];
</script>
<template>
  <main class="grid gap-4 p-4">
    <h1 class="text-primary font-bold text-4xl">Users</h1>
    <ol class="">
      <li v-for="(user, index) in users" :key="index">
        {{ index+1 }}. {{ user }}
      </li>
    </ol>
  </main>
</template>
