<script setup>
import { UserIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="bg-gray-800">
    <div
      class="max-w-7xl mx-auto py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 px-4 lg:px-0"
    >
      <h1 class="text-white text-center lg:text-left">
        Shopware 6 Javascript Store-Front Demo 0.2.2 - NGSI
      </h1>
      <div class="flex items-center space-x-2.5">
        <button
          type="button"
          role="button"
          class="text-white p-1 border border-gray-600 bg-gray-700"
        >
          <UserIcon class="w-8" />
        </button>
        <div>
          <p class="text-white text-xs uppercase">Current Role</p>
          <div class="text-sm flex space-x-2">
            <span class="text-gray-300">Guest</span>
            <nuxt-link to="/" class="text-blue-400">Sign In</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
