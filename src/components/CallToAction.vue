<script setup>
import PrimaryButton from './PrimaryButton.vue';
import AppHeader from './AppHeader.vue';

const props = defineProps({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    buttonText: {
        type: String,
    }
});

</script>

<template>
    <div class="w-full bg-[#E2F5CD] overflow-hidden rounded-lg mt-24 mb-8">
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 p-6">
            
            <!-- Left Side -->
            <div class="flex-1 flex justify-center lg:justify-start">
                <img src="../assets/images/CTA.png" alt="Illustration"
                    class="w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-80 sm:max-h-96 lg:max-h-[420px] object-contain" />
            </div>

            <!-- Right Side -->
            <div class="flex-1 max-w-2xl text-center lg:text-left ">
                <h1 class="text-4xl sm:text-5xl font-bold text-primary mb-6">{{ title }}</h1>
                <p class="text-base sm:text-lg text-gray-600 mb-6 pr-12 leading-relaxed">
                    {{ description }}
                </p>
                <div class="flex justify-center lg:justify-start">
                    <a target="_blank" href="https://hirescript-academy.vercel.app/">
                        <PrimaryButton>{{ buttonText }}</PrimaryButton>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
