import axios from "axios";

export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    const categoryId = body.id;
    if(!categoryId) {
        throw createError({ fatal: true, statusCode: 500, statusMessage: 'Category ID is required' })
    } else {
        const runtimeConfig = useRuntimeConfig();
        let categoryData = null;
        let error = false;
        await axios.post(`${runtimeConfig.public.apiBase}/category/${categoryId}`, {}, { headers: { 'sw-access-key': runtimeConfig.apiKey, 'sw-include-seo-urls': 1, 'sw-include-options': 1 } })
        .then((response) => {
            categoryData = response.data
        })
        .catch((err) => {
            error = err.response.data
        })

        if(error) {
            throw createError({ statusCode: error?.errors[0]?.status || 500, statusMessage: error?.errors[0]?.detail || 'Something went wrong' })
        } else {
            return categoryData
        }
    }
    
});