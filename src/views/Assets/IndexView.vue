<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import Select from '@/components/Form/Select.vue'
    import Input from '@/components/Form/Input.vue'
    import List from '@/components/Assets/List.vue'

    const assets = ref([])

    const fetchAssets = async () => {
        try {
            const response = await axios.get('assets')

            assets.value = response.data.data || []
        } catch (error) {
            console.error(error)
        }
    }

    onMounted(() => {
        fetchAssets()
    })
</script>

<template>
    <section class="py-16">
        <div class="container mx-auto">
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-3">
                    <div class="font-bold text-[1.5rem] mb-4">Filtreler</div>
                    <div class="mb-4">
                        <div class="font-bold text-[1.25rem]">Tür</div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" name="search" value="image" id="image" />
                            <label for="image">Görsel</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" name="search" value="video" id="video" />
                            <label for="video">Video</label>
                        </div>
                    </div>
                    <div>
                        <div class="font-bold text-[1.25rem]">Fiyat Aralığı</div>
                        <div class="mb-4">
                            <label>Para Birimi</label>
                            <Select name="currency">
                                <option value="ETH">ETH</option>
                                <option value="USDT">USDT</option>
                            </Select>
                        </div>
                        <div class="flex gap-4">
                            <div>
                                <label>Min. Fiyat</label>
                                <Input type="text" name="min_price" />
                            </div>
                            <div>
                                <label>Max. Fiyat</label>
                                <Input type="text" name="max_price" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-9">
                    <div class="flex items-center justify-between mb-4">
                        <div class="font-bold text-[1.5rem]">Varlıklar</div>
                        <div class="flex gap-4">
                            <Select class="min-w-32">
                                <option>Fiyata Göre</option>
                                <option>Tarihe Göre</option>
                            </Select>
                            <Select class="min-w-32">
                                <option>Artan</option>
                                <option>Azalan</option>
                            </Select>
                        </div>
                    </div>
                    <div class="grid grid-cols-4 gap-4">
                        <List :assets="assets" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
