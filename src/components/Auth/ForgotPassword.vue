<script setup lang="ts">
import { ref } from 'vue';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/config';
import PrimaryButton from '../PrimaryButton.vue';
import InputField from '../InputField.vue';
import OutlineButton from '../OutlineButton.vue';
import { useAuthStore } from '@/stores/authShow.store';

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
    message.value = error.message || "Failed to send reset email!";
  } finally {
    loading.value = false;
  }
};


</script>
<template>
  <form @submit.prevent="handleReset" method="post" class="grid gap-6">
    <div>
      <div class="text-2xl font-bold text-primary mb-1">Reset your password</div>
      <p class="text-sm">Enter your registered email address.</p>
    </div>

    <div class="grid gap-4">
      <InputField type="email" name="email" placeholder="Enter your email" v-model="email" />
      <PrimaryButton :disabled="loading">
        {{ loading ? "Sending reset link..." : "Continue" }}
      </PrimaryButton>
    </div>

    <OutlineButton @click="useAuthStore().setSeletedForm('Login')">Back</OutlineButton>

    <div v-if="message" class="text-sm text-center text-blue-500">
      {{ message }}
    </div>
  </form>
</template>