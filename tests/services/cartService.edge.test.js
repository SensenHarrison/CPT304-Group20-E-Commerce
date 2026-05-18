import { CartItem, CartService } from '../../javascript/services/cartService';
import { fetchAllProducts } from '../../javascript/services/productService';
import { cartStorage } from '../../javascript/utils/storageHelper';

jest.mock('../../javascript/services/productService', () => ({
    fetchAllProducts: jest.fn()
}));

jest.mock('../../javascript/utils/storageHelper', () => ({
    cartStorage: {
        get: jest.fn(),
        set: jest.fn()
    }
}));

jest.mock('../../javascript/services/currencyService', () => ({
    getCurrentCurrency: jest.fn(() => ({ name: 'USD', rate: 1 }))
}));

describe('CartService edge branches', () => {
    beforeEach(() => {
        fetchAllProducts.mockResolvedValue([
            { id: 0, title: 'Saved', price: 10 },
            null,
            { id: 2, title: 'Other', price: 20 }
        ]);
        cartStorage.get.mockReturnValue(new Set());
        cartStorage.set.mockClear();
    });

    test('CartItem calculates subtotal and formatted total for custom quantity', () => {
        const item = new CartItem(1, { price: 12 }, 3);

        expect(item.getSubtotalUSD()).toBe(36);
        expect(item.getTotalPrice({ name: 'USD', rate: 1 })).toBe('36.00 USD');
    });

    test('init skips missing saved products and returns early on second call', async () => {
        cartStorage.get.mockReturnValue(new Set([0, 1, 99]));
        const service = new CartService();

        await service.init();
        await service.init();

        expect(fetchAllProducts).toHaveBeenCalledTimes(1);
        expect(service.getItemCount()).toBe(1);
        expect(service.getQuantity(1)).toBe(0);
    });

    test('mutating methods throw before initialization', () => {
        const service = new CartService();

        expect(() => service.addItem(0)).toThrow('CartService not initialized');
        expect(() => service.removeItem(0)).toThrow('CartService not initialized');
        expect(() => service.updateQuantity(0, 2)).toThrow('CartService not initialized');
    });

    test('removeItem only saves when an item was actually removed', async () => {
        const service = new CartService();
        await service.init();

        expect(service.removeItem(999)).toBe(false);
        expect(cartStorage.set).not.toHaveBeenCalled();

        service.addItem(0);
        cartStorage.set.mockClear();
        expect(service.removeItem(0)).toBe(true);
        expect(cartStorage.set).toHaveBeenCalledTimes(1);
    });

    test('getTotalFormatted formats an empty cart total', async () => {
        const service = new CartService();
        await service.init();

        expect(service.getTotalFormatted()).toBe('0.00 USD');
    });
});
