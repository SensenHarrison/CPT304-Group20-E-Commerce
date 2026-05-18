import { CartService } from '../../javascript/services/cartService';
import { cartStorage } from '../../javascript/utils/storageHelper';

jest.mock('../../javascript/services/productService', () => ({
    fetchAllProducts: jest.fn().mockResolvedValue([
        { id: 0, title: 'Product 1', price: 100 },
        { id: 1, title: 'Product 2', price: 200 },
        { id: 2, title: 'Product 3', price: 150 }
    ])
}));

jest.mock('../../javascript/utils/storageHelper', () => ({
    cartStorage: {
        get: jest.fn(() => new Set()),
        set: jest.fn(),
        add: jest.fn(),
        remove: jest.fn(),
        getCount: jest.fn(() => 0)
    }
}));

jest.mock('../../javascript/services/currencyService', () => ({
    getCurrentCurrency: jest.fn(() => ({ name: 'USD', rate: 1.0 }))
}));

describe('CartService', () => {
    let cartService;

    beforeEach(async () => {
        jest.clearAllMocks();
        cartService = new CartService();
        await cartService.init();
    });

    describe('initialization', () => {
        test('initializes with empty cart', () => {
            expect(cartService.getCartCount()).toBe(0);
            expect(cartService.isEmpty()).toBe(true);
        });

        test('initializes with saved items from localStorage', async () => {
            cartStorage.get.mockReturnValueOnce(new Set([0, 2]));

            const newCart = new CartService();
            await newCart.init();

            expect(newCart.getCartCount()).toBe(2);
            expect(newCart.getItemCount()).toBe(2);
        });
    });

    describe('addItem', () => {
        test('adds new item to cart', () => {
            const count = cartService.addItem(0);

            expect(count).toBe(1);
            expect(cartService.getCartCount()).toBe(1);
            expect(cartService.getItemCount()).toBe(1);
        });

        test('increases quantity when adding same item again', () => {
            cartService.addItem(0);
            cartService.addItem(0);

            expect(cartService.getCartCount()).toBe(2);
            expect(cartService.getItemCount()).toBe(1);
            expect(cartService.getQuantity(0)).toBe(2);
        });

        test('adds item with custom quantity', () => {
            cartService.addItem(0, 3);

            expect(cartService.getCartCount()).toBe(3);
            expect(cartService.getQuantity(0)).toBe(3);
        });

        test('saves to localStorage on add', () => {
            cartService.addItem(0);

            expect(cartStorage.set).toHaveBeenCalled();
        });

        test('throws error for invalid product', () => {
            expect(() => cartService.addItem(999)).toThrow('Product 999 not found');
        });
    });

    describe('removeItem', () => {
        test('removes existing item', () => {
            cartService.addItem(0);
            expect(cartService.getCartCount()).toBe(1);

            const removed = cartService.removeItem(0);
            expect(removed).toBe(true);
            expect(cartService.getCartCount()).toBe(0);
        });

        test('returns false when removing non-existent item', () => {
            const removed = cartService.removeItem(999);
            expect(removed).toBe(false);
        });
    });

    describe('updateQuantity', () => {
        beforeEach(() => {
            cartService.addItem(0);
        });

        test('updates quantity to valid number', () => {
            const result = cartService.updateQuantity(0, 5);

            expect(result).toBe(true);
            expect(cartService.getQuantity(0)).toBe(5);
            expect(cartService.getCartCount()).toBe(5);
        });

        test('removes item when quantity set to 0', () => {
            const result = cartService.updateQuantity(0, 0);

            expect(result).toBe(true);
            expect(cartService.getCartCount()).toBe(0);
            expect(cartService.getItemCount()).toBe(0);
        });

        test('removes item when quantity set to negative', () => {
            const result = cartService.updateQuantity(0, -5);

            expect(result).toBe(true);
            expect(cartService.getCartCount()).toBe(0);
        });

        test('returns false for non-existent item', () => {
            const result = cartService.updateQuantity(999, 5);
            expect(result).toBe(false);
        });
    });

    describe('getTotalUSD', () => {
        test('calculates total for multiple items', () => {
            cartService.addItem(0); // $100
            cartService.addItem(1); // $200
            cartService.addItem(2, 2); // $300 (150 * 2)

            const total = cartService.getTotalUSD();
            expect(total).toBe(600); // 100 + 200 + 300
        });

        test('returns 0 for empty cart', () => {
            expect(cartService.getTotalUSD()).toBe(0);
        });
    });

    describe('clear', () => {
        test('removes all items', () => {
            cartService.addItem(0);
            cartService.addItem(1);
            cartService.addItem(2);

            expect(cartService.getCartCount()).toBe(3);

            cartService.clear();

            expect(cartService.getCartCount()).toBe(0);
            expect(cartService.isEmpty()).toBe(true);
        });

        test('saves empty cart to localStorage', () => {
            cartService.addItem(0);
            cartService.clear();

            expect(cartStorage.set).toHaveBeenCalled();
            const savedSet = cartStorage.set.mock.calls[1][0];
            expect(savedSet.size).toBe(0);
        });
    });

    describe('getAllItems', () => {
        test('returns array of CartItem objects', () => {
            cartService.addItem(0);
            cartService.addItem(1, 2);

            const items = cartService.getAllItems();

            expect(items).toHaveLength(2);
            expect(items[0]).toHaveProperty('id', 0);
            expect(items[0]).toHaveProperty('quantity', 1);
            expect(items[1]).toHaveProperty('id', 1);
            expect(items[1]).toHaveProperty('quantity', 2);
        });

        test('returns empty array when cart is empty', () => {
            expect(cartService.getAllItems()).toEqual([]);
        });
    });
});