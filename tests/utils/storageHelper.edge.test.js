import { storage, currencyStorage, cartStorage } from '../../javascript/utils/storageHelper';

describe('storageHelper edge branches', () => {
    const storageSpies = [];

    function spyOnStorage(method, implementation) {
        const target = localStorage instanceof Storage ? Storage.prototype : localStorage;
        const spy = jest.spyOn(target, method);
        if (implementation) {
            spy.mockImplementationOnce(implementation);
        }
        storageSpies.push(spy);
        return spy;
    }

    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    afterEach(() => {
        while (storageSpies.length) {
            storageSpies.pop().mockRestore();
        }
    });

    test('storage.get returns default and logs when JSON is invalid', () => {
        spyOnStorage('getItem', () => '{bad json');

        expect(storage.get('broken', 'fallback')).toBe('fallback');
        expect(console.error).toHaveBeenCalledWith(
            'Failed to get broken from localStorage:',
            expect.any(SyntaxError)
        );
    });

    test('storage.set returns false when localStorage throws', () => {
        spyOnStorage('setItem', () => {
            throw new Error('quota exceeded');
        });

        expect(storage.set('key', { value: 1 })).toBe(false);
        expect(console.error).toHaveBeenCalledWith(
            'Failed to set key to localStorage:',
            expect.any(Error)
        );
    });

    test('storage.remove returns false when localStorage throws', () => {
        spyOnStorage('removeItem', () => {
            throw new Error('blocked');
        });

        expect(storage.remove('key')).toBe(false);
        expect(console.error).toHaveBeenCalledWith(
            'Failed to remove key from localStorage:',
            expect.any(Error)
        );
    });

    test('currencyStorage rejects incomplete currency data', () => {
        expect(() => currencyStorage.set({ name: 'EUR' })).toThrow('Invalid currency data');
        expect(() => currencyStorage.set({ rate: 0.9 })).toThrow('Invalid currency data');
    });

    test('currencyStorage.updateRate mutates the saved currency', () => {
        currencyStorage.set({ name: 'USD', rate: 1 });

        expect(currencyStorage.updateRate('GBP', 0.75)).toEqual({ name: 'GBP', rate: 0.75 });
        expect(currencyStorage.get()).toEqual({ name: 'GBP', rate: 0.75 });
    });

    test('cartStorage clear removes saved cart data', () => {
        const removeSpy = spyOnStorage('removeItem');

        cartStorage.add(2);

        cartStorage.clear();

        expect(removeSpy).toHaveBeenCalledWith('cart-items');
        expect(cartStorage.getCount()).toBe(0);
    });
});
