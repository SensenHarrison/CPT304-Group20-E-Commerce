const STORAGE_KEYS = {
    CURRENCY: 'currency',
    CART_ITEMS: 'cart-items'
};

/**
 * The localStorage operation
 */
export const storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Failed to get ${key} from localStorage:`, error);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Failed to set ${key} to localStorage:`, error);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Failed to remove ${key} from localStorage:`, error);
            return false;
        }
    }
};

/**
 * Related currency operations
 */
export const currencyStorage = {
    get() {
        const defaultCurrency = { name: 'USD', rate: 1.0 };
        const saved = storage.get(STORAGE_KEYS.CURRENCY);
        return saved || defaultCurrency;
    },

    set(currencyData) {
        if (!currencyData.name || !currencyData.rate) {
            throw new Error('Invalid currency data');
        }
        storage.set(STORAGE_KEYS.CURRENCY, currencyData);
    },

    updateRate(currencyName, rate) {
        const current = this.get();
        current.name = currencyName;
        current.rate = rate;
        this.set(current);
        return current;
    }
};

/**
 * Related cart operations
 */
export const cartStorage = {
    get() {
        const items = storage.get(STORAGE_KEYS.CART_ITEMS, []);
        return new Set(items);
    },

    set(itemsSet) {
        storage.set(STORAGE_KEYS.CART_ITEMS, [...itemsSet]);
    },

    add(productId) {
        const items = this.get();
        items.add(productId);
        this.set(items);
        return items;
    },

    remove(productId) {
        const items = this.get();
        items.delete(productId);
        this.set(items);
        return items;
    },

    getCount() {
        return this.get().size;
    },

    clear() {
        storage.remove(STORAGE_KEYS.CART_ITEMS);
    }
};