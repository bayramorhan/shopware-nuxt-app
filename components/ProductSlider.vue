<script setup>
import { Lazy, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid'
import "swiper/css"

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});


// Swiper Settings
const swiperRef = ref();
const modules = [Lazy, Navigation];
const onSwiper = (swiper) => {
  swiperRef.value = swiper;
}
</script>

<template>
  <div class="relative">
    <button type="button" @click="swiperRef.slidePrev()"
      class="absolute top-1/2 left-2 transform -translate-y-1/2 p-2.5 bg-white bg-opacity-90 rounded-full z-10 hover:bg-opacity-100 hover:shadow-lg">
      <ArrowLeftIcon class="w-6 text-gray-800" />
    </button>
    <button type="button" @click="swiperRef.slideNext()"
      class="absolute top-1/2 right-2 transform -translate-y-1/2 p-2.5 bg-white bg-opacity-90 rounded-full z-10 hover:bg-opacity-100 hover:shadow-lg">
      <ArrowRightIcon class="w-6 text-gray-800" />
    </button>
    <swiper :slides-per-view="1" :loop="false" :modules="modules" :watch-slides-progress="true" :lazy="true"
      @swiper="onSwiper">
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
