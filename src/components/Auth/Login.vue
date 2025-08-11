<script setup lang="ts">
import { ref, inject } from 'vue';
import GoogleLogin from './GoogleLogin.vue';
import { loginUser } from '@/api/user.api';
import { useAuthStore } from '@/stores/authShow.store';
import { useUserStore } from '@/stores/user.store';
import type { IUser } from '@/interface/user.interface';

const current = inject('authCurrent');
const userStore = useUserStore();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);

async function handlelogin() {
    if (!email.value || !password.value) {
        alert("Please fill all fields");
        return;
    }
    loading.value = true;

    const res = await loginUser({
        email: email.value,
        password: password.value,
    });
    if (res.success) {
        userStore.setUser(res.user as IUser);
        console.log("Login successful", res.user);
        authStore.hideAuth();
    }
    else {
        alert(res.message || "Login failed");
    }
    loading.value = false;
}


</script>

<template>
    <div class="grid gap-y-5">
        <div class="text-2xl font-bold text-primary">Sign in to continue</div>

        <input v-model="email" type="text" class="border border-gray-300 w-full py-3 px-4 rounded-full text-sm"
            placeholder="Enter your email" />
        <input v-model="password" type="password" class="border border-gray-300 w-full py-3 px-4 rounded-full text-sm"
            placeholder="Enter password" />

        <button class="w-full p-3 text-sm bg-primary text-white rounded-full" :disabled="loading" @click="handlelogin">
            {{ loading ? "Signing in..." : "Continue" }}
        </button>

        <div class="text-sm text-gray-500 cursor-pointer" @click="current = 'Forgot'">Forgot password?</div>

        <div class="flex items-center justify-center gap-4">
            <div class="flex-1 h-px bg-gray-300"></div>
            <div class="text-gray-500 text-sm">or</div>
            <div class="flex-1 h-px bg-gray-300"></div>
        </div>

        <GoogleLogin />

        <div @click="current = 'Signup'" class="text-sm text-gray-500 text-center cursor-pointer">New to HireScript?
            Signup!</div>

    </div>
</template>