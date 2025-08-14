<script setup lang="ts">
import MaxWidth from "./MaxWidth.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
  <MaxWidth class="py-18">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
      <div class="text-primary font-bold text-2xl">HireScript</div>
      <div class="text-sm text-gray flex flex-col gap-y-3">
        <div class="font-bold">Quick Links</div>
        <RouterLink to="/jobs"><div>Jobs</div></RouterLink>
        <a target="_blank" rel="noopener" href="mailto:@hirescript.work@gmail.com"><div>Help</div></a>
        <a target="_blank" rel="noopener" href="https://blogs.hirescript.tech/blog/1gwFMIcPVs2pzQCSaoik"><div>About Us</div></a>
      </div>
      <div class="text-sm text-gray flex flex-col gap-y-3">
        <div class="font-bold">Customer links</div>
        <RouterLink to="/jobs"><div>Find Jobs</div></RouterLink>
        <RouterLink to="/courses"><div>Skill Up</div></RouterLink>
        <a target="_blank" rel="noopener" href="mailto:@hirescript.work@gmail.com"><div>Customer Support</div></a>
      </div>
      <div class="text-sm text-gray flex flex-col gap-y-3">
        <div class="font-bold">Terms and Conditions</div>
        <RouterLink to="/privacy"><div>Privacy Policy</div></RouterLink>
        <RouterLink to="/use"><div>Terms of Use</div></RouterLink>
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
        <div class="text-gray text-sm text-center md:text-right mt-2 md:mt-0">
          @2025 HireScript. All rights reserved.
        </div>
      </div>
    </div>
  </MaxWidth>
</template>
