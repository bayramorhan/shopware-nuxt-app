<script setup>
definePageMeta({
  layout: "main",
});
const route = useRoute();
const productId = route.params.uid;
const { data, error } = await useAsyncData("product", () =>
  $fetch("/api/product", { body: { id: productId }, method: "POST" })
);
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
        <div class="max-w-7xl mx-auto grid grid-cols-12 gap-10">
          <div class="col-span-5">
            <ProductSlider
              v-if="data.product?.media?.length > 0"
              :data="data"
            />
            <div
              v-else
              class="w-full h-[40rem] 2xl:h-[44rem] bg-gray-300"
            ></div>
          </div>
          <div class="col-span-7">
            <ProductDescription :data="data" />

            <Configurator v-if="data?.configurator?.length > 0" :data="data" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
