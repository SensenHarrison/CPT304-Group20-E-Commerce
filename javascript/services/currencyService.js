import { currencyStorage } from '../utils/storageHelper';
import { convertPrice } from '../utils/priceCalculator';

// Allowed currencies
const ALLOWED_CURRENCIES = ['EUR', 'USD', 'GBP', 'EGP'];

/**
 * Fetch Exchange Rates
 */
export async function fetchExchangeRates() {
    try {
        const response = await fetch('/api/currency');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.rates) {
            throw new Error('Invalid response format');
        }

        return data.rates;
    } catch (error) {
        console.error('Failed to fetch currency rates:', error);
        throw error;
    }
}

/**
 * Get currency from localStorage
 */
export function getCurrentCurrency() {
    return currencyStorage.get();
}

/**
 * Update
 */
export function setCurrentCurrency(currencyName, rate) {
    if (!ALLOWED_CURRENCIES.includes(currencyName)) {
        throw new Error(`Currency ${currencyName} is not supported`);
    }

    const updated = currencyStorage.updateRate(currencyName, rate);
    return updated;
}

/**
 * Update all product prices
 */
export function updateProductPrices(productElements, currency = null) {
    const currentCurrency = currency || getCurrentCurrency();

    productElements.forEach(element => {
        const priceUSD = element.getAttribute('price-USD');

        if (priceUSD) {
            const priceNum = parseFloat(priceUSD);
            if (!isNaN(priceNum)) {
                const { amount, currency: currName } = convertPrice(
                    priceNum,
                    currentCurrency.rate,
                    currentCurrency.name
                );
                element.textContent = `${amount} ${currName}`;
            }
        }
    });
}

/**
 * Prepare currency data
 */
export function prepareCurrencyList(rates) {
    const currencies = [];

    for (const [name, rate] of Object.entries(rates)) {
        if (ALLOWED_CURRENCIES.includes(name)) {
            currencies.push({
                name,
                rate,
                logoUrl: `https://flagcdn.com/w40/${name.slice(0, -1).toLowerCase()}.png`
            });
        }
    }

    return currencies;
}