import axios from "axios";

export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    const parentId = body.id;
    if(!parentId) {
        throw createError({ fatal: true, statusCode: 500, statusMessage: 'Product ID is required' })
    } else {
        const siblingsFilter = {
            "includes": {
                "product": ["id", "cover", "productNumber", "options"],
                "property_group_option": ["name", "group", "colorHexCode"],
                "property_group": ["name"]
            },
            "associations": {
                "options": {
                    "associations": {
                        "group": []
                    }
                }
            },
            "filter": [
                { "type": "equals", "field": "parentId", "value": parentId },
            ]
        }
        const runtimeConfig = useRuntimeConfig();
        let siblingsData = null;
        let error = false;
        await axios.post(`${runtimeConfig.public.apiBase}/product`, siblingsFilter, { headers: { 'sw-access-key': runtimeConfig.apiKey, 'sw-include-seo-urls': 1 } })
        .then((response) => {
            siblingsData = response.data
        })
        .catch((err) => {
            error = err.response.data
        })

        if(error) {
            throw createError({ statusCode: error?.errors[0]?.status || 500, statusMessage: error?.errors[0]?.detail || 'Something went wrong' })
        } else {
            return siblingsData
        }
    }
    
});