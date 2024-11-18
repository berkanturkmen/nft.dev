<script setup>
    import { ref, watch, onMounted } from 'vue'
    import axios from 'axios'
    import Select from '@/components/Form/Select.vue'
    import Input from '@/components/Form/Input.vue'
    import List from '@/components/Assets/List.vue'

    const assets = ref([])
    const filters = ref({
        currency: null,
        maxPrice: null,
        minPrice: null,
        order: 'asc',
        sort: 'price',
        type: [],
    })

    const fetchAssets = async () => {
        try {
            const params = new URLSearchParams()
            const search = []

            if (filters.value.currency) {
                search.push(filters.value.currency)
            }

            if (filters.value.maxPrice) {
                params.append('max_price', filters.value.maxPrice)
            }

            if (filters.value.minPrice) {
                params.append('min_price', filters.value.minPrice)
            }

            if (filters.value.sort) {
                params.append('order', filters.value.order || 'asc')
                params.append('sort', filters.value.sort)
            }

            if (filters.value.type.length) {
                search.push(...filters.value.type)
            }

            if (search.length > 0) {
                params.append('search', search.join(','))
            }

            const response = await axios.get(`assets?${params.toString()}`)

            assets.value = response.data.data || []
        } catch (error) {
            console.error(error)
        }
    }

    onMounted(() => {
        fetchAssets()
    })

    watch(filters, () => {
        fetchAssets()
    }, {
        deep: true,
    })
</script>

<template>
    <section class="py-16">
        <div class="md:container md:mx-auto px-4 md:px-0">
            <div class="md:grid md:grid-cols-12 md:gap-4">
                <div class="md:col-span-3">
                    <div class="font-bold text-[1.5rem] mb-4">Filtreler</div>
                    <div class="mb-4">
                        <div class="font-bold text-[1.25rem]">Tür</div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" value="image" id="image" v-model="filters.type" />
                            <label for="image">Görsel</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" value="video" id="video" v-model="filters.type" />
                            <label for="video">Video</label>
                        </div>
                    </div>
                    <div>
                        <div class="font-bold text-[1.25rem]">Fiyat Aralığı</div>
                        <div class="mb-4">
                            <label>Para Birimi</label>
                            <Select v-model="filters.currency" @change="fetchAssets">
                                <option value="ETH">ETH</option>
                                <option value="USDT">USDT</option>
                            </Select>
                        </div>
                        <div class="flex gap-4">
                            <div>
                                <label>Min. Fiyat</label>
                                <Input type="text" v-model="filters.minPrice" @keyup="fetchAssets" />
                            </div>
                            <div>
                                <label>Max. Fiyat</label>
                                <Input type="text" v-model="filters.maxPrice" @keyup="fetchAssets" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:col-span-9">
                    <div class="md:flex md:items-center md:justify-between mb-4">
                        <div class="font-bold text-[1.5rem]">Varlıklar</div>
                        <div class="flex gap-4">
                            <Select v-model="filters.sort" @change="fetchAssets" class="min-w-32">
                                <option value="price">Fiyata Göre</option>
                                <option value="created_at">Tarihe Göre</option>
                            </Select>
                            <Select v-model="filters.order" @change="fetchAssets" class="min-w-32">
                                <option value="asc">Artan</option>
                                <option value="desc">Azalan</option>
                            </Select>
                        </div>
                    </div>
                    <div class="md:grid md:grid-cols-4 md:gap-4">
                        <List :assets="assets" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
