<script setup>

definePageMeta({
    layout: 'main'
})
const route = useRoute();
const mapping = useState('navigationMapping')
let categoryId = null;
const uid = route.params.uid;
const seoUrl = mapping.value.find(item => item.seoUrl === uid);
categoryId = seoUrl ? seoUrl.id : uid;

const { data: products, error } = await useAsyncData('products', () => $fetch('/api/product-listing', { body: { id: categoryId }, method: 'POST' }))

</script>

<template>
    <NuxtLayout>
        <div>
            <section class="bg-white py-6 mb-8" v-if="products">
                <div class="max-w-7xl mx-auto px-6 2xl:px-0 flex flex-col items-center justify-center">
                    <h1 class="text-lg">{{
                        products.elements[0].categories[products.elements[0].categories.length -
                            1].translated.name
                    }} <span class="text-gray-400">Category</span>
                    </h1>
                    <ul class="flex items-center space-x-2.5 text-sm text-gray-400">
                        <li>Level#{{
                            products.elements[0].categories[products.elements[0].categories.length - 1].level
                        }}</li>
                        <li>
                            in {{
                                products.elements[0].categories[products.elements[0].categories.length -
                                    1].breadcrumb.join(' > ')
                            }}
                        </li>
                    </ul>
                </div>
            </section>
            <div class="max-w-7xl mx-auto px-6 2xl:px-0">
                <div v-if="error">
                    <code class="text-red-600 px-4 py-2 bg-gray-200 text-sm">{{ error }}</code>
                </div>
                <div v-else-if="products">
                    <section>
                        <div class="grid grid-cols-4 gap-6">
                            <div v-for="product in products.elements" :key="product.id" class="bg-white">
                                <div class="h-80 w-full bg-gray-400 bg-cover bg-center bg-no-repeat relative cursor-pointer"
                                    @click="$router.push(`/product/${product.id}`)"
                                    :style="{ backgroundImage: `url(${product.cover.media.thumbnails[2].url})` }">
                                    <span
                                        class="absolute bottom-2.5 right-2.5 bg-black text-gray-50 px-4 py-1 font-medium shadow-lg">{{
                                            product.calculatedPrice.totalPrice.toLocaleString('de-DE', {
                                                style: 'currency',
                                                currency: 'EUR', currencyDisplay: 'symbol'
                                            })
                                        }}</span>
                                </div>
                                <div class="p-4 min-h-[5rem] text-center">
                                    <p class="text-xs uppercase text-gray-400 tracking-widest">{{
                                        products.elements[0].categories[products.elements[0].categories.length -
                                            1].translated.name
                                    }}</p>
                                    <nuxt-link :to="`/product/${product.id}`" class="block px-8">{{
                                        product.translated.name
                                    }}</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="mt-10">
                <MainNavigation />
            </div>
        </div>
    </NuxtLayout>
</template>