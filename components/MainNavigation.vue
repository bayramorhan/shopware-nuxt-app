<script setup>
const navigation = useState('navigationData');
const navigationErr = useState('navigationError');
</script>

<template>
  <header class="bg-white shadow-sm py-6 px-6 2xl:px-0">
    <div class="max-w-7xl mx-auto">
      <span
        class="text-xs uppercase tracking-widest text-gray-500 block text-center lg:text-left mb-2.5 lg:mb-0">product
        categories</span>
    </div>
    <client-only>
      <div v-if="navigationErr" class="max-w-7xl mx-auto text-red-600 text-sm pt-4">
        <code class="bg-gray-200 px-4 py-2">{{ navigationErr }}</code>
      </div>
      <nav v-else role="navigation" class="max-w-7xl mx-auto flex justify-center text-center lg:block lg:text-left">
        <ul class="block lg:flex items-center justify-between max-w-3xl text-sm font-medium space-y-2.5 lg:space-y-0">
          <li v-for="navigationItem in navigation">
            <nuxt-link :to="'/category/' + navigationItem?.seoUrls[0]?.seoPathInfo || navigationItem.id"
              class="uppercase tracking-widest hover:underline select-none">{{
  navigationItem.translated.name
              }}</nuxt-link>
          </li>
        </ul>
      </nav>
    </client-only>
  </header>
</template>
