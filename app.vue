<script setup>

const { data: navigation, error } = await useAsyncData(() =>
  $fetch("/api/navigation")
);

const navigationData = useState('navigationData')
const navigationMapping = useState('navigationMapping');
const navigationError = useState('navigationError');

navigationData.value = navigation.value;
navigationMapping.value = navigation.value.map(item => { return { id: item.id, seoUrl: item?.seoUrls[0]?.seoPathInfo?.replace('/', '') || null } })
navigationError.value = error;

</script>

<template>
  <NuxtLoadingBar :duration="1000" />
  <NuxtPage />
</template>
