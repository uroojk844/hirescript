<script setup lang="ts">
import { ref } from "vue";
import MaxWidth from "./MaxWidth.vue";
import PrimaryButton from "./PrimaryButton.vue";
import { useHandleClickOutside } from "@/composables/use-handle-click-outside";
import Logo from "./Logo.vue";
import { useUserStore } from "@/stores/user.store";
import { useAuthStore } from "@/stores/authShow.store";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const mobileNav = ref<HTMLElement | null>(null);
const isOpen = ref(false);
useHandleClickOutside(mobileNav, isOpen);

const userStore = useUserStore();
const { getUser } = storeToRefs(userStore);
const authStore = useAuthStore();

function handleAuthClick() {
  if (userStore.user) {
    return;
  }
  authStore.showAuth();
  isOpen.value = false;
}
const router = useRouter();
const isModalOpen = ref(false);

function toggleModal() {
  isModalOpen.value = !isModalOpen.value;
}

function goToProfile() {
  isModalOpen.value = false;
  router.push("/profile");
  isOpen.value = false;
}

function logout() {
  userStore.handleLogout();
  isModalOpen.value = false;
  isOpen.value = false;
  router.push("/");
}

const userBtn = ref<HTMLElement | null>(null);
useHandleClickOutside(userBtn, isModalOpen);
</script>

<template>
  <nav class="py-6 xl:py-8">
    <MaxWidth class="flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2 text-2xl font-bold text-primary">
        <Logo /> HireScript
      </RouterLink>
      <div ref="mobileNav" class="mobile-nav sm:contents" :class="{ open: isOpen }">
        <RouterLink to="/" class="flex items-center gap-2 text-2xl font-bold text-primary mb-8 mobile-title">
          <Logo /> HireScript
        </RouterLink>

        <div class="flex gap-8 links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/jobs">Find Jobs</RouterLink>
          <RouterLink to="/courses">Master Classes</RouterLink>
        </div>

        <template v-if="userStore.user">
          <div class="relative hidden  sm:inline-block">
            <span ref="userBtn" class="flex items-center gap-2 cursor-pointer group" @click="toggleModal">
              <PrimaryButton variant="accent" class=" px-4 py-2">
                <div class="flex gap-2 items-center">
                  {{ getUser?.name }}
                  <svg :class="{ 'rotate-180': isModalOpen }" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24"
                    class="text-gray-500 group-hover:text-gray-700 transition-transform duration-200">
                    <path fill="currentColor" d="m5.84 9.59l5.66 5.66l5.66-5.66l-.71-.7l-4.95 4.95l-4.95-4.95z" />
                  </svg>
                </div>
              </PrimaryButton>
            </span>

            <div v-if="isModalOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 transition-all duration-200">
              <div class="flex flex-col py-2">
                <button
                  class="bg-white text-left px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-primary  transition-colors duration-150"
                  @click="goToProfile">
                  My Profile
                </button>
                <div class="border-gray-300 border-t my-1"></div>
                <button class="text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-150"
                  @click="logout">
                  Logout
                </button>
              </div>
            </div>

          </div>
          <div class="sm:hidden w-full flex flex-col gap-2">
            <PrimaryButton variant="accent" class="w-full px-4 py-2" @click="goToProfile">
              My Profile
            </PrimaryButton>
            <button class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-150 mt-2"
              @click="logout">
              Logout
            </button>
          </div>
        </template>
        <template v-else>
          <PrimaryButton variant="accent" class="w-full sm:w-auto" @click="handleAuthClick">
            Register now
          </PrimaryButton>
        </template>

      </div>

      <Icon @click.stop="isOpen = !isOpen" :icon="!isOpen ? 'uil:bars' : 'uil:times'"
        class="text-3xl text-primary toggle-sidebar" />
    </MaxWidth>
  </nav>
</template>

<style scoped>
@reference "@/style.css";

a {
  @apply text-primary;

  &.router-link-exact-active {
    @apply text-primary font-medium;
  }
}

.toggle-sidebar,
.mobile-title {
  display: none;
}

@media screen and (width <=768px) {

  .toggle-sidebar,
  .mobile-title {
    display: flex;
  }

  .mobile-nav {
    background-color: white;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    width: 280px;
    padding: 24px;
    display: flex;
    flex-flow: column;
    transition: 150ms ease;
    transform: translateX(-100%);
    z-index: 99;

    &.open {
      transform: translateX(0);
    }
  }

  .links {
    display: flex;
    flex-flow: column;
    margin-bottom: auto;
  }
}
</style>
