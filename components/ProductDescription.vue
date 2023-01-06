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
    <span class="text-sm uppercase text-gray-500 tracking-widest">{{
      data.product.categories[0].translated.name
    }}</span>
    <h1 class="text-xl font-bold mb-1">
      {{ data.product.translated.name }}
    </h1>
    <div
      class="bg-amber-600 text-white inline-block px-4 py-1 font-medium mb-2.5"
    >
      {{
        data.product.calculatedPrice.totalPrice.toLocaleString("de-DE", {
          style: "currency",
          currency: "EUR",
          currencyDisplay: "symbol",
        })
      }}
    </div>
    <p
      v-html="
        data.product.translated?.customFields
          ?.custom_product_detail_common_short_description ||
        data.product.translated.description
      "
      class="text-sm leading-snug mt-2"
    ></p>

    <div
      class="text-xs font-medium space-x-2.5 mt-4"
      v-if="data.product?.options?.length > 0"
    >
      <span
        v-for="option in data.product.options"
        :key="option.id"
        class="px-2 border border-black py-1"
      >
        {{ option.translated.name }}
      </span>
    </div>
  </div>
</template>
