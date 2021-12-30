export const replacer = (key: any, value: any) => {
    if (value instanceof Map) {
        return Array.from(value.entries()) // or with spread: value: [...value]
    } else {
        return value;
    }
}
