<script setup>
    import { defineProps, defineEmits } from 'vue'

    const props = defineProps({
        modelValue: [String, Number],
    })

    const emit = defineEmits(['update:modelValue'])

    function handleChange(event) {
        emit('update:modelValue', event.target.value)
    }
</script>

<template>
    <select :value="modelValue" @change="handleChange" class="w-full py-2 px-4 border border-black/10 rounded outline-none appearance-none">
        <slot />
    </select>
</template>
