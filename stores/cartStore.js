export const useCartStore = defineStore('cart', () => {
    
    const cartItems = ref([])

    const addToCart = (item) => {
        cartItems.value.push(item);
    }
    
    return { cartItems, addToCart }
},
{
    persist: {
        debug: true,
        storage: persistedState.localStorage
    }
})