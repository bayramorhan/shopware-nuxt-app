import axios from "axios";

export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    const variantIds = body.ids;
    const runtimeConfig = useRuntimeConfig();
    let productData = null;
        let error = false;

    const filter = {
        limit: 1,
        associations:{
            options: {}
        },
        filter: [
            {
                type: 'equals',
                field: 'parentId',
                value: body.parentId
            },
            ...variantIds.map(item => { return { type: 'equals', field: 'options.id', value: item } })
        ]
    };

    await axios.post(`${runtimeConfig.public.apiBase}/product`, filter, { headers: { 'sw-access-key': runtimeConfig.apiKey, 'sw-include-seo-urls': 1, 'sw-include-options': 1 } })
    .then((response) => {
        productData = response.data.elements[0].id;
    }).catch((err) => {
        error = err.response.data;
    })

    if(error) {
        throw createError({ statusCode: error?.errors[0]?.status || 500, statusMessage: error?.errors[0]?.detail || 'Something went wrong' })
    } else {
        return productData
    }
});