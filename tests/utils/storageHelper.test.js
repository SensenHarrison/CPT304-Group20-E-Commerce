import { storage, currencyStorage, cartStorage } from '../../javascript/utils/storageHelper';

describe('storageHelper', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('storage.get returns defaultValue when key not found', () => {
        const result = storage.get('nonexistent', 'default');
        expect(result).toBe('default');
    });

    test('storage.set and storage.get work correctly', () => {
        const testData = { name: 'test', value: 123 };
        storage.set('testKey', testData);
        const retrieved = storage.get('testKey');
        expect(retrieved).toEqual(testData);
    });

    test('currencyStorage returns default when empty', () => {
        const currency = currencyStorage.get();
        expect(currency).toEqual({ name: 'USD', rate: 1.0 });
    });

    test('currencyStorage saves and retrieves currency', () => {
        const testCurrency = { name: 'EUR', rate: 0.85 };
        currencyStorage.set(testCurrency);
        const retrieved = currencyStorage.get();
        expect(retrieved).toEqual(testCurrency);
    });

    test('cartStorage manages Set operations', () => {
        expect(cartStorage.getCount()).toBe(0);

        cartStorage.add(1);
        cartStorage.add(2);
        expect(cartStorage.getCount()).toBe(2);

        cartStorage.remove(1);
        expect(cartStorage.getCount()).toBe(1);

        const items = cartStorage.get();
        expect(items.has(2)).toBe(true);
    });
});