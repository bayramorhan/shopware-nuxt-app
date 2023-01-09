<script setup>
import { Lazy, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid'
import "swiper/css"

const props = defineProps({
    crossSelling: {
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

const breakpoints = {
    '640': {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    '768': {
        slidesPerView: 3,
        spaceBetween: 40,
    },
    '1024': {
        slidesPerView: 4,
        spaceBetween: 20,
    },
}
</script>

<template>
    <div class="mt-10 px-6 2xl:px-0 bg-white py-6">
        <h4 class="font-medium mb-4">{{ crossSelling[0].crossSelling.translated.name }}</h4>
        <div class="relative">
            <button type="button" @click="swiperRef.slidePrev()"
                class="absolute top-1/2 left-2 transform -translate-y-1/2 p-2.5 bg-white bg-opacity-90 rounded-full z-10 hover:bg-opacity-100 hover:shadow-lg">
                <ArrowLeftIcon class="w-6 text-gray-800" />
            </button>
            <button type="button" @click="swiperRef.slideNext()"
                class="absolute top-1/2 right-2 transform -translate-y-1/2 p-2.5 bg-white bg-opacity-90 rounded-full z-10 hover:bg-opacity-100 hover:shadow-lg">
                <ArrowRightIcon class="w-6 text-gray-800" />
            </button>
            <swiper :slides-per-view="4" :loop="false" :modules="modules" :watch-slides-progress="true" :lazy="true"
                @swiper="onSwiper" :breakpoints="breakpoints">
                <swiper-slide v-for="crossItem in crossSelling[0].products" :key="crossItem.id">
                    <div class="h-80 w-full bg-gray-400 bg-cover bg-center bg-no-repeat relative cursor-pointer"
                        @click="$router.push(`/product/${crossItem.id}`)"
                        :style="{ backgroundImage: `url(${crossItem.cover.media.thumbnails[2].url})` }">
                        <span
                            class="absolute bottom-2.5 right-2.5 bg-black text-gray-50 px-4 py-1 font-medium shadow-lg">{{
                                crossItem.calculatedPrice.totalPrice.toLocaleString('de-DE', {
                                    style: 'currency',
                                    currency: 'EUR', currencyDisplay: 'symbol'
                                })
                            }}</span>
                    </div>
                    <div class="p-4 min-h-[5rem] text-center">
                        <p class="text-xs uppercase text-gray-400 tracking-widest">{{
                            crossItem.categories[0].translated.name
                        }}</p>
                        <nuxt-link :to="`/product/${crossItem.id}`" class="block px-8">{{
                            crossItem.translated.name
                        }}</nuxt-link>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>