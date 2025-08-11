<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Login from './Login.vue';
import Signup from './Signup.vue';
import { onMounted, provide, ref, watch } from 'vue';
import ForgotPassword from './ForgotPassword.vue';
import { useAuthStore } from '@/stores/authShow.store';
const current = ref<"Login" | "Signup" | "Forgot" | "null">("Login");
provide('authCurrent', current);
function updateBodyOverflow(value: string) {
    document.body.style.overflow = value !== "null" ? "hidden" : "auto";
}

watch(current, (value) => {
    updateBodyOverflow(value);
});

onMounted(() => {
    updateBodyOverflow(current.value);
});

const authStore = useAuthStore();
function closeAuth() {
    authStore.hideAuth();
}
</script>

<template>
    <div v-if="authStore.isAuthVisible" class="inset-0 fixed bg-black/50 grid place-items-center z-50">
        <div
            class="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[26%] p-6 sm:p-8 md:p-10 lg:p-12 rounded-4xl bg-white relative">
            <Icon @click="closeAuth" icon="clarity:times-line"
                class="text-2xl absolute right-4 top-4 sm:right-5 sm:top-5 md:right-6 md:top-6 cursor-pointer" />
            <Login v-if="current === 'Login'" />
            <Signup v-else-if="current === 'Signup'" />
            <ForgotPassword v-else />
        </div>
    </div>
</template>