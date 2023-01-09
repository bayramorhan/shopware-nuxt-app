import axios from "axios";

export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    const productId = body.id;
    if(!productId) {
        throw createError({ fatal: true, statusCode: 500, statusMessage: 'Product ID is required' })
    } else {
        const filter = {
            associations: {
                categories: {}
            }
        };
        const runtimeConfig = useRuntimeConfig();
        let crossSelling = null;
        let error = false;
        await axios.post(`${runtimeConfig.public.apiBase}/product/${productId}/cross-selling`, filter, { headers: { 'sw-access-key': runtimeConfig.apiKey, 'sw-include-seo-urls': 1, 'sw-include-options': 1 } })
        .then((response) => {
            crossSelling = response.data
        })
        .catch((err) => {
            error = err.response.data
        })

        if(error) {
            throw createError({ statusCode: error?.errors[0]?.status || 500, statusMessage: error?.errors[0]?.detail || 'Something went wrong' })
        } else {
            return crossSelling
        }
    }
    
});