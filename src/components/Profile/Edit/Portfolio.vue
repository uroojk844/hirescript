<script setup lang="ts">
import { ref } from "vue";

interface PortfolioLink {
  id?: number;
  platform: string; // e.g., GitHub, Dribbble
  url: string;
}

const portfolioLinks = ref<PortfolioLink[]>([]);
const currentLink = ref<PortfolioLink>({
  platform: "",
  url: "",
});
const isAdding = ref(false);

// Show form
const handleAddLink = () => {
  isAdding.value = true;
};

// Save link
const handleSave = () => {
  if (currentLink.value.platform && currentLink.value.url) {
    const newLink = { ...currentLink.value, id: Date.now() };
    portfolioLinks.value.push(newLink);

    Object.assign(currentLink.value, {
      platform: "",
      url: "",
    });

    isAdding.value = false;
    console.log("Portfolio Links array:", portfolioLinks.value);
    return portfolioLinks.value;
  }
};

// Cancel adding
const handleCancel = () => {
  Object.assign(currentLink.value, {
    platform: "",
    url: "",
  });
  isAdding.value = false;
};

// Delete link
const handleDelete = (id: number) => {
  const index = portfolioLinks.value.findIndex((link) => link.id === id);
  if (index > -1) {
    portfolioLinks.value.splice(index, 1);
  }
};
</script>

<template>
  <div>
    <div class="text-primary font-semibold">Portfolio Links</div>
    <div class="mt-4">
      <div
        v-for="link in portfolioLinks"
        :key="link.id"
        class="border border-gray-200 rounded-lg p-3 bg-gray-50 mb-2"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="font-medium text-sm">{{ link.platform }}</div>
            <a
              :href="link.url"
              target="_blank"
              class="text-sm text-blue-500 hover:underline break-all"
            >
              {{ link.url }}
            </a>
          </div>
          <button
            @click="handleDelete(link.id!)"
            class="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="isAdding"
      class="grid gap-y-4 mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
    >
      <input
        type="text"
        placeholder="Platform Name (e.g., GitHub, Behance)"
        v-model="currentLink.platform"
        class="w-full border border-gray-300 rounded-lg p-2 text-sm"
      />
      <input
        type="url"
        placeholder="Portfolio URL"
        v-model="currentLink.url"
        class="w-full border border-gray-300 rounded-lg p-2 text-sm"
      />

      <div class="flex gap-2">
        <button
          @click="handleSave"
          :disabled="!currentLink.platform || !currentLink.url"
          class="px-4 py-2 bg-primary text-white rounded-lg text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Save
        </button>
        <button
          @click="handleCancel"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>

    <button
      v-if="!isAdding"
      @click="handleAddLink"
      class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-400 hover:text-blue-500 text-sm"
    >
      + Add Portfolio Link
    </button>
    <button class="mt-4 bg-primary text-white text-sm px-4 py-2 rounded-md">
      Save
    </button>
  </div>
</template>
