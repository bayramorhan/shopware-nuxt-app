<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <nuxt-link :to="`/category/${data.product.categories[0].id}`"
      class="text-sm uppercase text-gray-500 tracking-widest">{{
        data.product.categories[0].translated.name
      }}</nuxt-link>
    <h1 class="text-xl font-bold mb-1">
      {{ data.product.translated.name }}
    </h1>
    <div class="bg-black text-white inline-block px-4 py-1 font-medium mb-2.5">
      {{
        data.product.calculatedPrice.totalPrice.toLocaleString("de-DE", {
          style: "currency",
          currency: "EUR",
          currencyDisplay: "symbol",
        })
      }}
    </div>
    <client-only>
      <p v-html="
        data.product.translated?.customFields
          ?.custom_product_detail_common_short_description ||
        data.product.translated.description
      " class="text-sm leading-snug mt-2"></p>
    </client-only>

    <div class="text-xs font-medium space-x-2.5 mt-4" v-if="data.product?.options?.length > 0">
      <span v-for="option in data.product.options" :key="option.id" class="px-2 border border-black py-1">
        {{ option.translated.name }}
      </span>
    </div>
  </div>
</template>
