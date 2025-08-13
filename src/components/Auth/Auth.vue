<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Login from './Login.vue';
import Signup from './Signup.vue';
import { onMounted, watch } from 'vue';
import ForgotPassword from './ForgotPassword.vue';
import { useAuthStore } from '@/stores/authShow.store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { getSelectedForm } = storeToRefs(authStore);

function updateBodyOverflow(value: string) {
    document.body.style.overflow = value !== "null" ? "hidden" : "auto";
}

watch(getSelectedForm, (value) => {
    updateBodyOverflow(value);
});

onMounted(() => {
    updateBodyOverflow(getSelectedForm.value);
});

function closeAuth() {
    authStore.hideAuth();
}
</script>

<template>
    <div v-if="authStore.isAuthVisible" @click.self="authStore.hideAuth"
        class="inset-0 fixed bg-black/50 grid place-items-center z-50 p-4" title="Click here to close this pop-up">
        <div class="cursor-pointer absolute right-12 top-12 text-white text-4xl">
            <Icon @click="closeAuth" icon="iconamoon:sign-times-bold" />
        </div>

        <div class="max-w-md w-full p-12 rounded-4xl bg-white relative">
            <Login v-if="getSelectedForm === 'Login'" />
            <Signup v-else-if="getSelectedForm === 'Signup'" />
            <ForgotPassword v-else />
        </div>
    </div>
</template>