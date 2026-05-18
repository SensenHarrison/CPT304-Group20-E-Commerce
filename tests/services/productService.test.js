import {
    fetchAllProducts,
    getProductById,
    getCategories,
    getProductImageUrl,
    getAllProductImages,
    getProductStock,
    resetProductsCache
} from '../../javascript/services/productService';

global.fetch = jest.fn();

describe('productService', () => {
    const mockProducts = [
        {
            title: 'Test Product 1',
            price: 100,
            category: 'electronics',
            images: ['image1.jpg', 'image2.jpg'],
            stock: 10,
            discountPercentage: 10,
            description: 'Test description 1'
        },
        {
            title: 'Test Product 2',
            price: 200,
            category: 'Jackets',
            images: 'single-image.jpg',
            stock: 5,
            description: 'Test description 2'
        },
        {
            title: 'Test Product 3',
            price: 150,
            category: 'Pants',
            images: ['pants1.jpg', 'pants2.jpg'],
            stock: 0,
            description: 'Test description 3'
        }
    ];

    beforeEach(() => {
        resetProductsCache();
        fetch.mockClear();
    });

    describe('fetchAllProducts', () => {
        test('fetches and processes products', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => [...mockProducts]
            });

            const products = await fetchAllProducts();

            expect(fetch).toHaveBeenCalledWith('/all_products.json');
            expect(products).toHaveLength(3);
            expect(products[0]).toHaveProperty('id', 0);
            expect(products[1].category).toBe("men's products");
        });

        test('throws error on fetch failure', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 404
            });

            await expect(fetchAllProducts()).rejects.toThrow('Failed to fetch products: 404');
        });

        test('throws error on network error', async () => {
            fetch.mockRejectedValueOnce(new Error('Network error'));

            await expect(fetchAllProducts()).rejects.toThrow('Network error');
        });

        test('caches products on subsequent calls', async () => {
            fetch.mockResolvedValue({
                ok: true,
                json: async () => [...mockProducts]
            });

            const firstCall = await fetchAllProducts();
            const secondCall = await fetchAllProducts();

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(firstCall).toBe(secondCall);
        });
    });

    describe('getProductById', () => {
        test('returns product by id', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => [...mockProducts]
            });

            const product = await getProductById(0);
            expect(product.title).toBe('Test Product 1');
        });

        test('returns undefined for invalid id', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => [...mockProducts]
            });

            const product = await getProductById(999);
            expect(product).toBeUndefined();
        });
    });

    describe('getCategories', () => {
        test('returns unique categories', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => [...mockProducts]
            });

            const categories = await getCategories();

            expect(categories).toContain('electronics');
            expect(categories).toContain("men's products");
            expect(categories).toHaveLength(2);
        });

        test('handles products with missing category', async () => {
            const productsWithNoCategory = [
                { title: 'No Category', price: 100 }
            ];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => productsWithNoCategory
            });

            const categories = await getCategories();
            expect(categories).toEqual([]);
        });
    });

    describe('getProductImageUrl', () => {
        test('returns first image when images is array', () => {
            const product = { images: ['img1.jpg', 'img2.jpg'] };
            expect(getProductImageUrl(product)).toBe('img1.jpg');
        });

        test('returns single image when images is string', () => {
            const product = { images: 'single.jpg' };
            expect(getProductImageUrl(product)).toBe('single.jpg');
        });

        test('returns empty string when product has no images', () => {
            const product = {};
            expect(getProductImageUrl(product)).toBe('');
        });

        test('returns empty string when product is null', () => {
            expect(getProductImageUrl(null)).toBe('');
        });
    });

    describe('getAllProductImages', () => {
        test('returns array when images is array', () => {
            const product = { images: ['img1.jpg', 'img2.jpg'] };
            expect(getAllProductImages(product)).toEqual(['img1.jpg', 'img2.jpg']);
        });

        test('returns array with single image when images is string', () => {
            const product = { images: 'single.jpg' };
            expect(getAllProductImages(product)).toEqual(['single.jpg']);
        });

        test('returns empty array when product has no images', () => {
            const product = {};
            expect(getAllProductImages(product)).toEqual([]);
        });

        test('returns empty array when product is null', () => {
            expect(getAllProductImages(null)).toEqual([]);
        });
    });

    describe('getProductStock', () => {
        test('returns stock number when available', () => {
            const product = { stock: 10 };
            expect(getProductStock(product)).toBe(10);
        });

        test('returns default message when stock is 0', () => {
            const product = { stock: 0 };
            expect(getProductStock(product)).toBe('Many In Stock');
        });

        test('returns default message when no stock property', () => {
            const product = {};
            expect(getProductStock(product)).toBe('Many In Stock');
        });

        test('returns default message when product is null', () => {
            expect(getProductStock(null)).toBe('Many In Stock');
        });
    });
});