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
    <swiper>
      <swiper-slide v-for="media in data.product.media.sort(
        (a, b) => a.position - b.position
      )" :key="media.id">
        <div class="w-full h-[32rem] bg-cover bg-center" :style="{
          backgroundImage: `url(${media.media.thumbnails.find(thumbnail => thumbnail.width === 800).url})`,
        }"></div>
      </swiper-slide>
    </swiper>
  </div>
</template>
