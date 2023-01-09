import axios from "axios";

export default defineEventHandler(async(event, context) => {
    const runtimeConfig = useRuntimeConfig();
    const body = readBody(event);
    const navigation = body.navigation;
    let categoryList = null;
    let error = false;
    console.log('mapping', navigation.map(item => { return { type: 'equals', field: 'parentId', value: item.id } }))
    const filter = {
        filter: [
            {
                type: 'equals',
                field: 'active',
                value: true
            },
            {
                type: 'multi',
                operator: 'or',
                queries: [
                    navigation.map(item => { return { type: 'equals', field: 'parentId', value: item.id } })
                ]
            }
        ]
    };
    await axios.post(`${runtimeConfig.public.apiBase}/category`, filter, { headers: { 'sw-access-key': runtimeConfig.apiKey, 'sw-include-seo-urls': 1 } })
    .then((response) => {
        categoryList = response.data
    })
    .catch((err) => {
        console.log(err)
        error = err.response.data
    })

    if(error) {
        throw createError({ statusCode: error?.errors[0]?.status || 500, statusMessage: error?.errors[0]?.detail || 'Something went wrong' })
    } else {
        return categoryList
    }
    
});