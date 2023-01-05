<script setup>
const { data: navigation, error } = await useAsyncData(() =>
  $fetch("/api/navigation")
);
</script>

<template>
  <header class="bg-white shadow-sm py-6">
    <div class="max-w-7xl mx-auto">
      <span
        class="text-xs uppercase tracking-widest text-gray-500 block text-center lg:text-left mb-2.5 lg:mb-0"
        >product categories</span
      >
    </div>
    <div v-if="error" class="max-w-7xl mx-auto text-red-600 text-sm pt-4">
      <code class="bg-gray-200 px-4 py-2">{{ error }}</code>
    </div>
    <nav
      v-else
      role="navigation"
      class="max-w-7xl mx-auto flex justify-center text-center lg:block lg:text-left"
    >
      <ul
        class="block lg:flex items-center justify-between max-w-3xl text-sm font-medium space-y-2.5 lg:space-y-0"
      >
        <li v-for="navigationItem in navigation">
          <nuxt-link to="/" class="uppercase tracking-widest hover:underline">{{
            navigationItem.translated.name
          }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
