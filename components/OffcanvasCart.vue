<script setup>
import { useCartStore } from '~~/stores/cartStore'

const emits = defineEmits(['hide-cart'])
const cartIsVisible = inject('cartVisibility')

const cartStore = useCartStore();

</script>

<template>
    <div>
        <div v-if="cartIsVisible" @click="$emit('hide-cart')"
            class="fixed w-full h-full bg-black bg-opacity-30 top-0 left-0 z-40 cursor-pointer backdrop-blur">
        </div>
        <transition enter-active-class="transition duration-200 transform" enter-from-class="opacity-0 translate-x-1/2"
            enter-to-class="opacity-100 translate-x-0" leave-active-class="transition duration-200 transform"
            leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 translate-x-1/2">
            <div v-if="cartIsVisible" class="bg-white p-4 w-80 fixed top-0 right-0 h-full shadow-lg z-50 flex flex-col">
                <h4 class="uppercase text-xs tracking-widest border-b pb-2.5 mb-4">shopping cart</h4>
                <div class="flex-1">
                    <p class="text-center text-sm mt-6 select-none">Your cart is empty</p>
                </div>
            </div>
        </transition>
    </div>
</template>