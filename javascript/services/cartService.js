import { cartStorage } from '../utils/storageHelper';
import { fetchAllProducts, getProductImageUrl } from './productService';
import { getCurrentCurrency } from './currencyService';
import { formatPrice } from '../utils/priceCalculator';

export class CartItem {
    constructor(productId, product, quantity = 1) {
        this.id = productId;
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice(currency) {
        const priceUSD = this.product.price * this.quantity;
        return formatPrice(priceUSD, currency);
    }

    getSubtotalUSD() {
        return this.product.price * this.quantity;
    }
}

export class CartService {
    constructor() {
        this.items = new Map(); // productId -> CartItem
        this.products = null;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;

        this.products = await fetchAllProducts();
        const savedIds = cartStorage.get();

        for (const productId of savedIds) {
            const product = this.products[productId];
            if (product) {
                this.items.set(productId, new CartItem(productId, product, 1));
            }
        }

        this.initialized = true;
    }

    addItem(productId, quantity = 1) {
        if (!this.initialized) throw new Error('CartService not initialized');

        if (this.items.has(productId)) {
            const existing = this.items.get(productId);
            existing.quantity += quantity;
        } else {
            const product = this.products[productId];
            if (!product) throw new Error(`Product ${productId} not found`);
            this.items.set(productId, new CartItem(productId, product, quantity));
        }

        this.saveToLocalStorage();
        return this.getCartCount();
    }

    removeItem(productId) {
        if (!this.initialized) throw new Error('CartService not initialized');

        const removed = this.items.delete(productId);
        if (removed) {
            this.saveToLocalStorage();
        }
        return removed;
    }

    updateQuantity(productId, quantity) {
        if (!this.initialized) throw new Error('CartService not initialized');

        const item = this.items.get(productId);
        if (!item) return false;

        if (quantity <= 0) {
            return this.removeItem(productId);
        }

        item.quantity = quantity;
        this.saveToLocalStorage();
        return true;
    }

    getQuantity(productId) {
        return this.items.get(productId)?.quantity || 0;
    }

    getCartCount() {
        let count = 0;
        for (const item of this.items.values()) {
            count += item.quantity;
        }
        return count;
    }

    getAllItems() {
        return Array.from(this.items.values());
    }

    getTotalUSD() {
        let total = 0;
        for (const item of this.items.values()) {
            total += item.getSubtotalUSD();
        }
        return total;
    }

    getTotalFormatted() {
        const currency = getCurrentCurrency();
        const totalUSD = this.getTotalUSD();
        return formatPrice(totalUSD, currency);
    }

    clear() {
        this.items.clear();
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        const ids = Array.from(this.items.keys());
        cartStorage.set(new Set(ids));
    }

    getItemCount() {
        return this.items.size;
    }

    isEmpty() {
        return this.items.size === 0;
    }
}

// 创建单例
export const cartService = new CartService();