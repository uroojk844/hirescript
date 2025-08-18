<script setup lang="ts">
import { useOverflowToggle } from '@/composables/use-overflow-toggle';
import { watch } from 'vue';

const emit = defineEmits(['confirm', 'cancel']);

const isActive = defineModel();

function handleCancel() {
    isActive.value = false;
    useOverflowToggle();
    emit('cancel');
}

watch(isActive, (newValue) => {
    if (newValue) useOverflowToggle();
});
</script>

<template>
    <section @click.stop="" v-if="isActive" class="fixed z-[99] inset-0 grid place-items-center bg-black/25">
        <div class="bg-white p-12 rounded-2xl">
            <div class="text-xl font-semibold mb-4">Have you applied for this job?</div>
            <div class="flex gap-4 items-center justify-center">
                <button @click="$emit('confirm')">Yes</button>
                <button @click="handleCancel" class="outlined">No</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
button {
    padding: 8px 24px;
    border-radius: 100vmax;
    cursor: pointer;

    &:not(.outlined) {
        background-color: var(--color-primary);
        color: white;
    }

    &.outlined {
        background-color: var(--color-light-gray);
    }
}
</style>