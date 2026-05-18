/**
 * @param {number} priceUSD
 * @param {number} rate
 * @param {string} currencyName
 * @returns {object} { amount: string, currency: string }
 */
export function convertPrice(priceUSD, rate, currencyName) {
    if (typeof priceUSD !== 'number' || isNaN(priceUSD)) {
        throw new Error('priceUSD must be a valid number');
    }
    if (typeof rate !== 'number' || isNaN(rate)) {
        throw new Error('rate must be a valid number');
    }

    const amount = (priceUSD * rate).toFixed(2);
    return {
        amount,
        currency: currencyName
    };
}

/**
 * @param {number} currentPrice
 * @param {number} discountPercentage
 * @returns {string}
 */
export function calculateOriginalPrice(currentPrice, discountPercentage) {
    if (!discountPercentage) return '';
    const originalPrice = (currentPrice / ((100 - discountPercentage) / 100));
    return originalPrice.toFixed(2);
}

/**
 * @param {number} priceUSD
 * @param {object} currency
 * @returns {string}
 */
export function formatPrice(priceUSD, currency) {
    const { amount, currency: currName } = convertPrice(priceUSD, currency.rate, currency.name);
    return `${amount} ${currName}`;
}