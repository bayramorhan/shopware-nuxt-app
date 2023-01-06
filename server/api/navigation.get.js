import axios from "axios";

export default defineEventHandler(async(event, context) => {
    const runtimeConfig = useRuntimeConfig();
    let navigationData = null;
    let error = false;
    await axios.post(`${runtimeConfig.public.apiBase}/navigation/main-navigation/main-navigation`, {}, { headers: { 'sw-access-key': runtimeConfig.apiKey, 'sw-include-seo-urls': 1 } })
    .then((response) => {
        navigationData = response.data
    })
    .catch((err) => {
        console.log(err)
        error = err.response.data
    })

    if(error) {
        throw createError({ statusCode: error?.errors[0]?.status || 500, statusMessage: error?.errors[0]?.detail || 'Something went wrong' })
    } else {
        return navigationData
    }
    
});