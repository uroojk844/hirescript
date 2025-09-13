<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Icon } from "@iconify/vue";

const showWhatsAppPrompt = ref(true);
watch(showWhatsAppPrompt, (val) => {
  if (val) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
}, { immediate: true });

onMounted(() => {
  window.scrollTo(0, 0);
  if (localStorage.getItem("whatsappPromptShown")) {
    showWhatsAppPrompt.value = false;
  }
});

const handleJoinWhatsApp = () => {
  window.open(
    "https://chat.whatsapp.com/JhXYXasBWB2FJailZ6JFqH?mode=ac_t",
    "_blank"
  );
  showWhatsAppPrompt.value = false;
  localStorage.setItem("whatsappPromptShown", "true");
};

const hideWhatsAppPrompt = () => {
  showWhatsAppPrompt.value = false;
};
</script>
<template>
    <div
    v-if="showWhatsAppPrompt"
    class="inset-0 fixed bg-black/50 grid place-items-center z-999 "
  >
    <div
      class="bg-white p-8 rounded-lg flex w-[50%] max-sm:w-[95%] gap-5 items-center relative"
    >
      <Icon
        @click="hideWhatsAppPrompt"
        icon="mdi:close"
        class="absolute top-4 right-4 cursor-pointer"
      />
      <Icon
        icon="logos:whatsapp-icon"
        class="size-22 max-sm:hidden"
      />
      <div>
        <div class="font-bold text-lg text-primary">
          Join our Whatsapp group for latest job updates!
        </div>
        <div class="text-sm mt-2 max-sm:mt-4">
          Join our WhatsApp group to receive the latest job opportunities,
          internships, campus drives, and career resources directly on your
          phone.
        </div>
        <div class="flex gap-4 mt-4">
          <button
            @click="handleJoinWhatsApp"
            class="bg-primary text-white text-sm px-6 py-2 rounded-full cursor-pointer"
          >
            Join now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>