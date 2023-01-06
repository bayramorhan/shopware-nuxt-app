<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'

definePageMeta({
    layout: 'main'
})
const route = useRoute();
const productId = route.params.uid;
const { data, error } = await useAsyncData('product', () => $fetch('/api/product', { body: { id: productId }, method: 'POST' }))

console.log(data.value.product)
</script>

<template>
    <NuxtLayout>
        <div>
            <div v-if="error" class="max-w-7xl mx-auto px-6 2xl:px-0">
                <code class="text-red-600 px-4 py-2 bg-gray-200 text-sm">{{ error }}</code>
            </div>
            <div v-else class="bg-white shadow-sm py-8 px-6 2xl:px-0">
                <div class="max-w-7xl mx-auto grid grid-cols-12 gap-10">
                    <div class="col-span-5">
                        <div v-if="data.product?.media?.length > 0">
                            <swiper>
                                <swiper-slide
                                    v-for="media in data.product.media.sort((a, b) => a.position - b.position)"
                                    :key="media.id">
                                    <div class="w-full h-[40rem] 2xl:h-[44rem] bg-cover bg-center"
                                        :style="{ backgroundImage: `url(${media.media.thumbnails[2].url})` }">
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div v-else class="w-full h-[40rem] 2xl:h-[44rem] bg-gray-300">

                        </div>
                    </div>
                    <div class="col-span-7">
                        <div>
                            <span class="text-sm uppercase text-gray-500 tracking-widest">{{
                                data.product.categories[0].translated.name
                            }}</span>
                            <h1 class="text-xl font-bold mb-1">{{ data.product.translated.name }}</h1>
                            <div class="bg-amber-600 text-white inline-block px-4 py-1 font-medium mb-2.5">
                                {{
                                    data.product.calculatedPrice.totalPrice.toLocaleString('de-DE', {
                                        style:
                                            'currency', currency: 'EUR', currencyDisplay: 'symbol'
                                    })
                                }}
                            </div>
                            <p v-html="data.product.translated?.customFields?.custom_product_detail_common_short_description || data.product.translated.description"
                                class="text-sm leading-snug mt-2">
                            </p>

                            <div class="text-xs font-medium space-x-2.5 mt-4" v-if="data.product?.options?.length > 0">
                                <span v-for="option in data.product.options" :key="option.id"
                                    class="px-2 border border-black py-1">
                                    {{ option.translated.name }}
                                </span>
                            </div>
                        </div>

                        <!-- Configurator -->
                        <div v-if="data?.configurator?.length > 0" class="mt-6">
                            <div class="mb-2.5 border-b pb-2.5 flex justify-between items-center">
                                <h2 class="text-xs uppercase tracking-widest ">Configurator</h2>
                            </div>
                            <div class="space-y-6">
                                <template v-for="configurator in data.configurator" :key="configurator.id">
                                    <div v-if="configurator.displayType === 'color'">
                                        <h3 class="text-xs uppercase tracking-widest mb-2.5">{{
                                            configurator.translated.name
                                        }}</h3>
                                        <div class="w-[260px] gap-2 flex flex-wrap">
                                            <div v-for="option in configurator.options" :key="option.id"
                                                class="w-5 h-5 rounded-full border relative group cursor-pointer flex items-center justify-center"
                                                :class="{ 'border-2 border-black': data.product.options.findIndex(item => item.id === option.id) !== -1 }"
                                                :style="{ backgroundColor: option.colorHexCode }">
                                                <CheckIcon class="w-2.5"
                                                    v-if="data.product.options.findIndex(item => item.id === option.id) !== -1" />
                                                <span
                                                    class="absolute top-full left-0 mt-1 bg-black text-xs text-white px-2 py-1 hidden group-hover:block z-20 whitespace-nowrap">{{
                                                        option.translated.name
                                                    }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <h3 class="text-xs uppercase tracking-widest mb-2.5">{{
                                            configurator.translated.name
                                        }}</h3>
                                        <div class="grid grid-cols-2 max-w-sm gap-2.5">
                                            <div v-for="option in configurator.options" :key="option.id"
                                                class="border px-4 py-2 cursor-pointer hover:bg-gray-100 hover:shadow-sm text-sm"
                                                :class="{ 'border-2 border-black': data.product.options.findIndex(item => item.id === option.id) !== -1 }">
                                                {{ option.translated.name }}
                                            </div>
                                        </div>
                                    </div>
                                </template>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </NuxtLayout>
</template>