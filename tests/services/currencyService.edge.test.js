import {
    fetchExchangeRates,
    prepareCurrencyList,
    updateProductPrices
} from '../../javascript/services/currencyService';

describe('currencyService edge branches', () => {
    beforeEach(() => {
        fetch.mockReset();
        localStorage.clear();
    });

    test('fetchExchangeRates rejects when response has no rates object', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ base: 'USD' })
        });

        await expect(fetchExchangeRates()).rejects.toThrow('Invalid response format');
    });

    test('prepareCurrencyList filters unsupported currencies', () => {
        const result = prepareCurrencyList({
            USD: 1,
            JPY: 155,
            EUR: 0.9,
            AUD: 1.5
        });

        expect(result.map(currency => currency.name)).toEqual(['USD', 'EUR']);
    });

    test('updateProductPrices skips missing and invalid price values', () => {
        const missing = document.createElement('span');
        const invalid = document.createElement('span');
        const valid = document.createElement('span');
        invalid.setAttribute('price-USD', 'not-a-number');
        valid.setAttribute('price-USD', '10');

        updateProductPrices([missing, invalid, valid], { name: 'EUR', rate: 0.5 });

        expect(missing.textContent).toBe('');
        expect(invalid.textContent).toBe('');
        expect(valid.textContent).toBe('5.00 EUR');
    });
});
