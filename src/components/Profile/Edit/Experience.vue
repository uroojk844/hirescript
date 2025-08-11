<script setup lang="ts">
import { ref } from "vue";

interface Experience {
  id?: number;
  companyName: string;
  designation: string;
  duration: string;
}

const experiences = ref<Experience[]>([]);
const currentExperience = ref<Experience>({
  companyName: "",
  designation: "",
  duration: "",
});
const isAdding = ref(false);

const handleAddExperience = () => {
  isAdding.value = true;
};

const handleSave = () => {
  if (
    currentExperience.value.companyName &&
    currentExperience.value.designation &&
    currentExperience.value.duration
  ) {
    const newExperience = { ...currentExperience.value, id: Date.now() };
    experiences.value.push(newExperience);

    Object.assign(currentExperience.value, {
      companyName: "",
      designation: "",
      duration: "",
    });

    isAdding.value = false;
    console.log("Experiences array:", experiences.value);
    return experiences.value;
  }
};

const handleCancel = () => {
  Object.assign(currentExperience.value, {
    companyName: "",
    designation: "",
    duration: "",
  });
  isAdding.value = false;
};

const handleDelete = (id: number) => {
  const index = experiences.value.findIndex((exp) => exp.id === id);
  if (index > -1) {
    experiences.value.splice(index, 1);
  }
};
</script>

<template>
  <div>
    <div class="text-primary font-semibold">Experience</div>
    <div class="mt-4">
      <div
        v-for="exp in experiences"
        :key="exp.id"
        class="border border-gray-200 rounded-lg p-3 bg-gray-50 mb-2"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="font-medium text-sm">{{ exp.designation }}</div>
            <div class="text-sm text-gray-600">{{ exp.companyName }}</div>
            <div class="text-xs text-gray-500">{{ exp.duration }}</div>
          </div>
          <button
            @click="handleDelete(exp.id!)"
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
        placeholder="Company Name"
        v-model="currentExperience.companyName"
        class="w-full border border-gray-300 rounded-lg p-2 text-sm"
      />
      <input
        type="text"
        placeholder="Designation"
        v-model="currentExperience.designation"
        class="w-full border border-gray-300 rounded-lg p-2 text-sm"
      />
      <input
        type="text"
        placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
        v-model="currentExperience.duration"
        class="w-full border border-gray-300 rounded-lg p-2 text-sm"
      />

      <div class="flex gap-2">
        <button
          @click="handleSave"
          :disabled="
            !currentExperience.companyName ||
            !currentExperience.designation ||
            !currentExperience.duration
          "
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
      @click="handleAddExperience"
      class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-400 hover:text-blue-500 text-sm"
    >
      + Add Experience
    </button>
    <button class="mt-4 bg-primary text-white text-sm px-4 py-2 rounded-md">Save</button>
  </div>
</template>
