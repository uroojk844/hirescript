<script setup lang="ts">
import { ref } from 'vue';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {doc, collection, getDoc, setDoc } from 'firebase/firestore';
import { auth, fireDB } from '@/firebase/config';
import { useUserStore } from '@/stores/user.store';
import { useAuthStore } from '@/stores/authShow.store';

const userStore = useUserStore();
const authStore = useAuthStore();
const loading = ref(false);

const handleGoogleLogin = async () => {
    loading.value = true;
    const provider = new GoogleAuthProvider();

    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Google login successful", user);
        const userRef = doc(collection(fireDB, 'users'), user.uid);
        const userSnap = await getDoc(userRef);
        let userData;
       if (userSnap.exists()) {
      
      userData = userSnap.data();
    } else {
      // Create new user document
      userData = {
        name: user.displayName || "",
        email: user.email,
        password: "",
        photoUrl: user.photoURL || "",
        phoneNumber: user.phoneNumber || "",
        bio: "",
        designation: "",
        skills: "",
        college: {
          collegeName: "",
          collegeEmail: "",
        },
        saved: [],
        visited: [],
        applied: [],
        uid: user.uid,
      };

      await setDoc(userRef, userData);
      console.log("Account created successfully");
    }
    userStore.setUser(userData);
    authStore.hideAuth();
    console.log("Signed in successfully");
  } catch (error:any) {
    console.error("Google sign-in failed:", error.message);
  }
};



</script>
<template>
    <button
        class="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition cursor-pointer"
        @click="handleGoogleLogin" :disabled="loading">
        <svg class="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4"
                d="M533.5 278.4c0-18.5-1.6-36.4-4.6-53.6H272v101.4h146.9c-6.4 34.8-25.4 64.3-54 84.2v69.9h87.2c51-47 81.4-116.2 81.4-201.9z" />
            <path fill="#34A853"
                d="M272 544.3c73.5 0 135.3-24.4 180.3-66.1l-87.2-69.9c-24.2 16.2-55.1 25.8-93.1 25.8-71.6 0-132.3-48.3-154.1-113.2H29.2v71.1c44.8 88.6 136.2 152.3 242.8 152.3z" />
            <path fill="#FBBC05"
                d="M117.9 320.9c-10.5-31.3-10.5-64.9 0-96.2v-71.1H29.2c-43.7 85-43.7 184.2 0 269.2l88.7-71.9z" />
            <path fill="#EA4335"
                d="M272 107.7c39.9-.6 77.5 14 106.7 40.4l80.1-80.1C407.3 24.4 345.5 0 272 0 165.4 0 74 63.7 29.2 152.3l88.7 71.1C139.7 156 200.4 107.7 272 107.7z" />
        </svg>
        <span class="text-xs">Continue with Google</span>
    </button>
</template>