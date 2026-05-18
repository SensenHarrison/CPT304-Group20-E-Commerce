import { convertPrice, calculateOriginalPrice, formatPrice } from '../../javascript/utils/priceCalculator';

describe('priceCalculator', () => {
    test('convertPrice correctly converts USD to EUR', () => {
        const result = convertPrice(100, 0.85, 'EUR');
        expect(result.amount).toBe('85.00');
        expect(result.currency).toBe('EUR');
    });

    test('convertPrice throws error for invalid inputs', () => {
        expect(() => convertPrice('not a number', 0.85, 'EUR')).toThrow();
        expect(() => convertPrice(100, 'invalid', 'EUR')).toThrow();
    });

    test('calculateOriginalPrice returns correct original price', () => {
        const original = calculateOriginalPrice(85, 15);
        expect(original).toBe('100.00');
    });

    test('calculateOriginalPrice returns empty string when no discount', () => {
        expect(calculateOriginalPrice(100, null)).toBe('');
    });

    test('formatPrice returns formatted string', () => {
        const currency = { name: 'EUR', rate: 0.85 };
        const formatted = formatPrice(100, currency);
        expect(formatted).toBe('85.00 EUR');
    });
});