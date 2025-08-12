<script setup lang="ts">
import { ref } from 'vue';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/config';

const email = ref('');
const loading = ref(false);
const message = ref("");

const handleReset = async () => {
    message.value = "";
    if (!email.value) {
        message.value = "Please enter your email.";
        return;
    }

    loading.value = true;
    try {
        await sendPasswordResetEmail(auth, email.value);
        message.value = "Reset link sent! Check your email.";
    } catch (error: any) {
        message.value = error.message || "Failed to send reset email.";
    } finally {
        loading.value = false;
    }
};


</script>
<template>
  <div class="grid gap-y-5">
    <div class="text-2xl font-bold text-primary">Reset your password</div>
    <div class="text-sm">
      Enter your email address registered with HireScript below and we will send you a link to reset your password.  
    </div>

    <input
      type="text"
      class="border border-gray-300 w-full py-3 px-4 rounded-full text-sm"
      placeholder="Enter your email"
      v-model="email"
    />

    <button
      class="w-full p-3 text-sm bg-primary text-white rounded-full"
      :disabled="loading"
      @click="handleReset"
    >
      {{ loading ? "Sending reset link..." : "Continue" }}
    </button>

    <div v-if="message" class="text-sm text-center text-blue-500">
      {{ message }}
    </div>
  </div>
</template>