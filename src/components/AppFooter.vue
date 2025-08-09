<script setup lang="ts">
import MaxWidth from "./MaxWidth.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
  <MaxWidth class="py-18">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
      <div class="text-primary font-bold text-2xl">HireScript</div>
      <div class="text-sm text-gray flex flex-col gap-y-3">
        <div>About</div>
        <div>Press</div>
        <div>Blog</div>
        <div>Relationships</div>
      </div>
      <div class="text-sm text-gray flex flex-col gap-y-3">
        <div>Jobs</div>
        <div>Jobs Referrals</div>
        <div>Help</div>
        <div>Contact Us</div>
      </div>
      <div class="text-sm text-gray flex flex-col gap-y-3">
        <div>Careers</div>
        <div>Help</div>
        <div>Support</div>
      </div>
      <div class="text-sm text-gray flex flex-col gap-y-3">
        <div>Privacy Policy</div>
        <div>Terms of Service</div>
      </div>
    </div>
    <div class="border-0.5 border-t border-gray-500 mt-6 py-4">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div class="flex items-center justify-center md:justify-start gap-4">
          <a href="https://blogs.hirescript.tech/" target="_blank" rel="noopener">
            <Icon
              icon="mdi:blogger"
              class="text-xl text-gray hover:text-primary transition"
            />
          </a>
          
          <a href="https://www.linkedin.com/company/hirescript-app/" target="_blank" rel="noopener">
            <Icon
              icon="mdi:linkedin"
              class="text-xl text-gray hover:text-primary transition"
            />
          </a>
          <a href="https://instagram.com/hellohirescript" target="_blank" rel="noopener">
            <Icon
              icon="mdi:instagram"
              class="text-xl text-gray hover:text-primary transition"
            />
          </a>
          
        </div>
        <div class="text-sm text-gray flex gap-4 justify-center">
          <div>Privacy Policy</div>
          <div>Terms Of Use</div>
        </div>
        <div class="text-gray text-sm text-center md:text-right mt-2 md:mt-0">
          @2025 HireScript. All rights reserved.
        </div>
      </div>
    </div>
  </MaxWidth>
</template>
