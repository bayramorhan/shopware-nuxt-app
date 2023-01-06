<script setup>
definePageMeta({
  layout: "main",
});
</script>

<template>
  <NuxtLayout>
    <HowItWorks />

    <section class="max-w-7xl mx-auto text-center space-y-2.5 py-10 border-gray-400 bg-white shadow-sm">
      <h2 class="text-lg font-medium">What's next?</h2>
      <p class="px-4 lg:px-0">
        Go ahead and select a category to browse the products
        <i>faster and smoother</i>
      </p>
    </section>

    <MainNavigation />
  </NuxtLayout>
</template>
