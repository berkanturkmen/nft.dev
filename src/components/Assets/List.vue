<script setup>
    defineProps({
        assets: {
            type: Array,
            required: true,
        },
    })
</script>

<template>
    <div v-for="(asset, index) in assets" :key="index" class="shadow rounded overflow-hidden relative group pb-[40px] mb-4 md:mb-0">
        <div v-if="asset.type === 'image'">
            <img :src="asset.media_url" class="w-full h-full object-cover" />
        </div>
        <div v-else-if="asset.type === 'video'">
            <video :src="asset.media_url" class="w-full h-full aspect-square"></video>
        </div>
        <div class="p-4">
            <div class="font-bold">{{ asset.name }}</div>
            <div class="font-bold text-black/50">{{ asset.price }} {{ asset.currency }}</div>
        </div>
        <button type="button" class="w-full p-2 bg-blue-900/75 text-white font-medium absolute bottom-[-40px] group-hover:bottom-0 transition-all">Satın Al</button>
    </div>
</template>
