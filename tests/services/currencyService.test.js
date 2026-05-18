import {
    fetchExchangeRates,
    getCurrentCurrency,
    setCurrentCurrency,
    prepareCurrencyList
} from '../../javascript/services/currencyService';
import { currencyStorage } from '../../javascript/utils/storageHelper';

// Mock fetch
global.fetch = jest.fn();

describe('currencyService', () => {
    beforeEach(() => {
        localStorage.clear();
        fetch.mockClear();
    });

    test('fetchExchangeRates successfully returns rates', async () => {
        const mockRates = {
            base: 'USD',
            rates: { EUR: 0.85, USD: 1, GBP: 0.75, EGP: 30.5 }
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockRates
        });

        const rates = await fetchExchangeRates();
        expect(rates).toEqual(mockRates.rates);
        expect(fetch).toHaveBeenCalledWith('/api/currency');
    });

    test('fetchExchangeRates throws on network error', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        await expect(fetchExchangeRates()).rejects.toThrow('Network error');
    });

    test('fetchExchangeRates throws on HTTP error', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Server Error'
        });

        await expect(fetchExchangeRates()).rejects.toThrow('HTTP 500');
    });

    test('getCurrentCurrency returns default when empty', () => {
        const currency = getCurrentCurrency();
        expect(currency).toEqual({ name: 'USD', rate: 1.0 });
    });

    test('setCurrentCurrency updates and returns currency', () => {
        const updated = setCurrentCurrency('EUR', 0.85);
        expect(updated).toEqual({ name: 'EUR', rate: 0.85 });

        const saved = currencyStorage.get();
        expect(saved).toEqual({ name: 'EUR', rate: 0.85 });
    });

    test('setCurrentCurrency throws for invalid currency', () => {
        expect(() => setCurrentCurrency('INVALID', 1)).toThrow('not supported');
    });

    test('prepareCurrencyList filters and formats currencies', () => {
        const mockRates = {
            EUR: 0.85,
            USD: 1,
            GBP: 0.75,
            EGP: 30.5
        };

        const result = prepareCurrencyList(mockRates);

        expect(result).toHaveLength(4);
        expect(result[0]).toMatchObject({
            name: 'EUR',
            rate: 0.85,
            logoUrl: expect.stringContaining('flagcdn')
        });
    });

    test('updateProductPrices updates product elements', () => {
        const mockElement = document.createElement('div');
        mockElement.setAttribute('price-USD', '100');

        const { updateProductPrices } = require('../../javascript/services/currencyService');
        updateProductPrices([mockElement]);

        expect(mockElement.textContent).toContain('USD');
    });

    test('setCurrentCurrency throws for invalid currency', () => {
        expect(() => setCurrentCurrency('INVALID', 1)).toThrow('not supported');
    });
});