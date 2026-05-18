// javascript/services/productService.js

let productsCache = null;

/**
 * Get all products
 */
export async function fetchAllProducts() {
    if (productsCache) {
        return productsCache;
    }

    try {
        const response = await fetch('/all_products.json');

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const products = await response.json();

        const processed = products.map((product, index) => {
            product.id = index;

            if (['Pants', 'Jackets', 'Hoodies', 'T-shirt', 'T-shirts'].includes(product.category)) {
                product.category = "men's products";
            }

            return product;
        });

        productsCache = processed;
        return processed;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
}

/**
 * Get product by ID
 * @param {number} id
 */
export async function getProductById(id) {
    const products = await fetchAllProducts();
    return products[id];
}

/**
 * Get all categories
 */
export async function getCategories() {
    const products = await fetchAllProducts();
    const categories = new Set();

    products.forEach(product => {
        if (product.category) {
            categories.add(product.category.toLowerCase());
        }
    });

    return Array.from(categories);
}

/**
 * Get product image
 * @param {Object} product
 */
export function getProductImageUrl(product) {
    if (!product || !product.images) {
        return '';
    }

    if (Array.isArray(product.images)) {
        return product.images[0];
    }
    return product.images;
}

/**
 * Get all product images
 * @param {Object} product
 */
export function getAllProductImages(product) {
    if (!product || !product.images) {
        return [];
    }

    if (Array.isArray(product.images)) {
        return product.images;
    }
    return [product.images];
}

/**
 * Get product stock
 * @param {Object} product
 */
export function getProductStock(product) {
    if (!product || !product.stock || product.stock === 0) {
        return 'Many In Stock';
    }
    return product.stock;
}

export function resetProductsCache() {
    productsCache = null;
}