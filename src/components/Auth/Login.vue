<script setup lang="ts">
import { ref } from 'vue';
import GoogleLogin from './GoogleLogin.vue';
import { loginUser } from '@/api/user.api';
import { useAuthStore } from '@/stores/authShow.store';
import { useUserStore } from '@/stores/user.store';
import type { IUser } from '@/interface/user.interface';
import PrimaryButton from '../PrimaryButton.vue';
import Separator from '../Separator.vue';
import InputField from '../InputField.vue';

const userStore = useUserStore();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const message = ref('');

async function handlelogin() {
    message.value = '';
    if (!email.value || !password.value) {
        message.value = "Please enter required field!";
        return;
    }
    loading.value = true;

    const res = await loginUser({
        email: email.value,
        password: password.value,
    });
    if (res.success && res.user) {
        userStore.setUser({
            ...res.user,
            skills: res.user.skills.map((s) => s.trim().toLowerCase())
        } as IUser);
        authStore.hideAuth();
    } else {
        message.value = res.message || "Wrong username or password!";
    }
    loading.value = false;
}
</script>

<template>
    <form @submit.prevent="handlelogin" method="post" class="grid gap-y-5">
        <div class="text-2xl font-bold text-primary">Sign in to continue</div>

        <InputField v-model.trim="email" type="email" name="email" placeholder="Enter your email" />

        <InputField v-model.trim="password" type="password" name="password" placeholder="Enter password" />

        <PrimaryButton :loading>Continue</PrimaryButton>

        <div v-if="message">
            <div class="text-sm text-red-500">{{ message }}</div>
        </div>

        <div class="text-sm text-gray-500 cursor-pointer w-fit" @click="authStore.setSeletedForm('Forgot')">
            Forgot password?
        </div>

        <Separator />

        <GoogleLogin />

        <div @click="authStore.setSeletedForm('Signup')" class="text-sm text-gray-500 text-center cursor-pointer">New to
            HireScript? Signup!
        </div>
    </form>
</template>