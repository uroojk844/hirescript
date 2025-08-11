<script setup lang="ts">
import { ref } from "vue";
import MaxWidth from "./MaxWidth.vue";
import PrimaryButton from "./PrimaryButton.vue";
import { useHandleClickOutside } from "@/composables/use-handle-click-outside";
import Logo from "./Logo.vue";


const mobileNav = ref<HTMLElement | null>(null);
const isOpen = ref(false);
useHandleClickOutside(mobileNav, isOpen);
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
          <RouterLink to="/Courses">Courses</RouterLink>
        </div>

        <PrimaryButton>Register Now</PrimaryButton>
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
    display: block;
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
