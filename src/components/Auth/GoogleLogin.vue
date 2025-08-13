<script setup lang="ts">
import { ref } from 'vue';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, collection, getDoc, setDoc } from 'firebase/firestore';
import { auth, fireDB } from '@/firebase/config';
import { useUserStore } from '@/stores/user.store';
import { useAuthStore } from '@/stores/authShow.store';
import type { IUser } from '@/interface/user.interface';
import OutlineButton from '../OutlineButton.vue';


const userStore = useUserStore();
const authStore = useAuthStore();
const loading = ref(false);

const handleGoogleLogin = async () => {
  loading.value = true;
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    const userRef = doc(collection(fireDB, "users"), firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    let userData: IUser;

    if (userSnap.exists()) {
      userData = userSnap.data() as IUser;
    } else {
      userData = {
        name: firebaseUser.displayName || "",
        profilePhotoUrl: firebaseUser.photoURL || "",
        email: firebaseUser.email || "",
        password: "",
        designation: "",
        coverPhotoUrl: "",
        bio: "",
        skills: [],
        education: {
          college: "",
          city: "",
          state: "",
          mail: "",
        },
        location: {
          city: "",
          state: "",
          country: "",
        },
        socialLinks: {
          facebook: "",
          dribble: "",
          twitter: "",
          whatsapp: "",
          linkedin: ""
        },
        jobs: {
          savedJobs: [],
          appliedJobs: []
        },
        portfolioLinks: {
          behance: "",
          dribble: "",
          canva: "",
          github: "",
        },
        experience: [],
        portfolio: [],

        uid: firebaseUser.uid,
      };

      await setDoc(userRef, userData);
    }

    userStore.setUser(userData);
    authStore.hideAuth();
  } catch (error: any) {
    console.error("Google sign-in failed:", error.message);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <OutlineButton @click="handleGoogleLogin" :disabled="loading">
    <Icon icon="logos:google-icon" class="text-lg" />
    <span>Continue with Google</span>
  </OutlineButton>
</template>