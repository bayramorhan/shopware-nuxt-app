export const useCategories = () => {
    const categoryList = useState('categoryList', () => [])
    const categoryMapping = useState('categoryMapping', () => [])

    return { categoryList, categoryMapping}
}