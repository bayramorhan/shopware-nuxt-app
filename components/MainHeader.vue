<script setup>
import { UserIcon, ShoppingBagIcon } from "@heroicons/vue/24/outline";
import { useCartStore } from '~~/stores/cartStore'

const cartStore = useCartStore();

const cartIsVisible = ref(false);
provide('cartVisibility', cartIsVisible)

const toggleCartVisibility = () => {
  cartIsVisible.value = !cartIsVisible.value
}

const onHideCart = () => {
  cartIsVisible.value = false;
}

</script>

<template>
  <div class="bg-gray-800 px-6 2xl:px-0">
    <div
      class="max-w-7xl mx-auto py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 px-4 lg:px-0">
      <nuxt-link to="/">
        <h1 class="text-white text-center lg:text-left font-bold">
          Store-Front Demo 0.2.2 - NGSI
        </h1>
        <p class="text-sm text-gray-400">
          Fully-Managed Javascript App for Shopware 6 Headless API
        </p>
      </nuxt-link>
      <div class="flex items-center space-x-2.5 ">
        <div class="relative">
          <button type="button" role="button"
            class="text-white p-1 border border-gray-600 bg-gray-700 hover:bg-gray-600" @click="toggleCartVisibility">
            <ShoppingBagIcon class="w-8" />
          </button>
          <span
            class="w-5 h-5 rounded-full bg-black absolute top-0 right-0 text-white text-xs flex items-center justify-center"
            v-if="cartStore.cartItems.length > 0">{{
              cartStore.cartItems.length
            }}</span>
        </div>
        <button type="button" role="button" class="text-white p-1 border border-gray-600 bg-gray-700">
          <UserIcon class="w-8" />
        </button>
        <div>
          <p class="text-white text-xs uppercase">Current Role</p>
          <div class="text-sm flex space-x-2">
            <span class="text-gray-300">Guest</span>
            <nuxt-link to="/" class="text-blue-400 hover:underline">Sign In</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <OffcanvasCart @hide-cart="onHideCart" />
  </div>
</template>
