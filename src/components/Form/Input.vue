<script setup>
    import { defineProps, defineEmits } from 'vue'

    const props = defineProps({
        modelValue: String,
    })

    const emit = defineEmits(['update:modelValue'])

    function handleInput(event) {
        emit('update:modelValue', event.target.value)
    }
</script>

<template>
    <input :value="modelValue" @input="handleInput" class="w-full py-2 px-4 border border-black/10 rounded outline-none" />
</template>
