export const useNavigation = () => {
    const navigationData = useState('navigationData', () => [])
    const navigationMapping = useState('navigationMapping', () => [])

    return { navigationData, navigationMapping}
}