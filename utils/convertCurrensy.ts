export const convertCurrensy = (amount: number|string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    })
}