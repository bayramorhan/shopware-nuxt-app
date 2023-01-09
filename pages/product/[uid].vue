<script setup>
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid'

definePageMeta({
  layout: "main",
});
const route = useRoute();
const productId = route.params.uid;
const { data, error } = await useAsyncData("product", () =>
  $fetch("/api/product", { body: { id: productId }, method: "POST" })
);

const { data: crossSelling, error: crossSellingError } = await useAsyncData("crossSelling", () =>
  $fetch("/api/cross-selling", { body: { id: productId }, method: "POST" })
);

console.log(crossSelling.value)

const item = reactive({
  id: data.value.product.id,
  quantity: 1
})

const increaseQuantity = () => {
  item.quantity++;
}

const decreaseQuantity = () => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

</script>

<template>
  <NuxtLayout>
    <div>
      <div v-if="error" class="max-w-7xl mx-auto px-6 2xl:px-0">
        <client-only>
          <code class="text-red-600 px-4 py-2 bg-gray-200 text-sm">{{
            error
          }}</code>
        </client-only>
      </div>
      <div v-else class="bg-white shadow-sm py-8 px-6 2xl:px-0">
        <ul v-if="data.product.categories[1]" class="flex items-center breadcrumb text-sm max-w-7xl mx-auto mb-2.5">
          <li>
            <nuxt-link :to="`/category/${data.product.categories[1].id}`">{{
              data.product.categories[1].translated.name
            }}</nuxt-link>
          </li>
          <li class="text-gray-500">
            <nuxt-link :to="`/category/${data.product.categories[0].id}`">{{
              data.product.categories[0].translated.name
            }}</nuxt-link>
          </li>
        </ul>
        <div class="max-w-7xl mx-auto grid grid-cols-12 gap-10">

          <div class="col-span-5">
            <ProductSlider v-if="data.product?.media?.length > 0" :data="data" />
            <div v-else class="w-full h-[40rem] 2xl:h-[44rem] bg-gray-300"></div>
          </div>
          <div class="col-span-7">
            <ProductDescription :data="data" />

            <Configurator v-if="data?.configurator?.length > 0" :data="data" />

            <!-- Cart Actions -->
            <div class="py-6 flex items-center space-x-4">
              <div class="relative w-28">
                <button type="button"
                  class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-50 hover:bg-black rounded-full text-black hover:text-white"
                  @click="decreaseQuantity">
                  <MinusIcon class="w-5 p-1 border border-gray-600 rounded-full" />
                </button>
                <button type="button"
                  class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-50 hover:bg-black rounded-full text-black hover:text-white"
                  @click="increaseQuantity">
                  <PlusIcon class="w-5 p-1 border border-gray-600 rounded-full" />
                </button>
                <input type="text" class="border border-gray-600 px-4 py-2  w-full text-center focus:outline-none"
                  readonly v-model="item.quantity">
              </div>

              <div>
                <button type="button" class="uppercase bg-black px-8 py-2 text-white hover:shadow-lg">
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Cross Selling -->
      <CrossSelling v-if="crossSelling && crossSelling[0]?.products?.length > 0" :cross-selling="crossSelling" />
      <div class="mt-10">
        <MainNavigation />
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
ul {
  &.breadcrumb {
    li {
      &:not(:last-child) {
        &:after {
          content: "/";
          display: inline-block;
          @apply mx-1.5 text-gray-500;
        }
      }
    }
  }
}
</style>