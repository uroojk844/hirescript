<script setup lang="ts">
import { inject } from 'vue';
import GoogleLogin from './GoogleLogin.vue';

const current = inject('authCurrent');

</script>

<template>
    <div class="grid gap-y-5">
        <div class="text-2xl font-bold text-primary">Create your account</div>

        <input type="text" class="border border-gray-300 w-full p-3 rounded-full text-sm"
            placeholder="Enter your Full name" />
        <input type="text" class="border border-gray-300 w-full p-3 rounded-full text-sm"
            placeholder="Enter your email" />
        <input type="password" class="border border-gray-300 w-full p-3 rounded-full text-sm"
            placeholder="Create a password" />

        <button class="w-full p-3 text-sm bg-primary text-white rounded-full">
            Continue
        </button>

        <div class="flex items-center justify-center gap-4">
            <div class="flex-1 h-px bg-gray-300"></div>
            <div class="text-gray-500 text-sm">or</div>
            <div class="flex-1 h-px bg-gray-300"></div>
        </div>

        <GoogleLogin />

        <div @click="current = 'Login'" class="text-sm text-gray-500 text-center cursor-pointer">Already registered?
            Login!</div>

    </div>
</template>