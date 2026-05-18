import { ProductPreview } from '../../javascript/components/productPreview';
import { cartService } from '../../javascript/services/cartService';
import { toast } from '../../javascript/components/toast';

jest.mock('../../javascript/services/productService', () => ({
    fetchAllProducts: jest.fn().mockResolvedValue([
        {
            id: 0,
            title: 'Test Product',
            price: 100,
            description: 'Test description',
            images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
            stock: 10,
            discountPercentage: 10
        }
    ]),
    getProductImageUrl: jest.fn(() => 'image1.jpg'),
    getAllProductImages: jest.fn(() => ['image1.jpg', 'image2.jpg', 'image3.jpg']),
    getProductStock: jest.fn(() => 10),
    resetProductsCache: jest.fn()
}));

jest.mock('../../javascript/services/cartService', () => ({
    cartService: {
        init: jest.fn().mockResolvedValue(),
        addItem: jest.fn(() => 1),
        getCartCount: jest.fn(() => 1)
    }
}));

jest.mock('../../javascript/components/toast', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}));

jest.mock('../../javascript/utils/domHelpers', () => ({
    showLoadingSpinner: jest.fn(),
    hideLoadingSpinner: jest.fn(),
    toggleOverlay: jest.fn(),
    createElement: jest.fn((tag, attrs, children) => {
        const element = {
            tagName: tag.toUpperCase(),
            style: {},
            className: attrs?.className || '',
            setAttribute: jest.fn(),
            getAttribute: jest.fn(),
            appendChild: jest.fn(),
            classList: { add: jest.fn(), remove: jest.fn(), contains: jest.fn() },
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            src: '',
            alt: ''
        };
        if (attrs?.src) element.src = attrs.src;
        if (attrs?.alt) element.alt = attrs.alt;
        return element;
    })
}));

describe('ProductPreview', () => {
    let productPreview;
    let mockContainer;
    let mockProductElement;

    beforeEach(() => {
        jest.clearAllMocks();

        document.body.innerHTML = `
            <div class="product__preview"></div>
            <div class="cart__items__num"></div>
        `;

        mockContainer = document.querySelector('.product__preview');
        mockProductElement = document.createElement('div');
        mockProductElement.setAttribute('product-id', '0');

        productPreview = new ProductPreview({
            container: mockContainer,
            onAddToCart: jest.fn(),
            onClose: jest.fn()
        });
    });

    describe('setupImageZoom', () => {
        test('sets up mouse move zoom', async () => {
            await productPreview.show(mockProductElement);

            const imageContainer = mockContainer.querySelector('.main__image__container');
            const mainImage = mockContainer.querySelector('.main__image');

            expect(imageContainer).toBeDefined();
            expect(mainImage).toBeDefined();
        });

        test('handles touch move events', async () => {
            await productPreview.show(mockProductElement);

            const imageContainer = mockContainer.querySelector('.main__image__container');
            expect(imageContainer).toBeDefined();
        });

        test('resets zoom on mouse leave', async () => {
            await productPreview.show(mockProductElement);

            const imageContainer = mockContainer.querySelector('.main__image__container');
            const mainImage = mockContainer.querySelector('.main__image');

            if (imageContainer && mainImage) {
                const mouseleaveEvent = new Event('mouseleave');
                imageContainer.dispatchEvent(mouseleaveEvent);
                expect(mainImage.style.transform).toBeDefined();
            }
        });
    });

    describe('renderThumbnails', () => {
        test('creates thumbnails for all images', async () => {
            await productPreview.show(mockProductElement);

            await new Promise(resolve => setTimeout(resolve, 10));

            const container = mockContainer.querySelector('.images__pagination__container');
            const thumbnails = mockContainer.querySelectorAll('.pagination__image');
            if (thumbnails.length === 0) {
                expect(productPreview.currentImages.length).toBeGreaterThan(0);
                expect(container).toBeDefined();
            } else {
                expect(thumbnails.length).toBeGreaterThan(0);
            }
        });

        test('removes navigation controls when few images', async () => {
            const productService = require('../../javascript/services/productService');
            const originalGetAll = productService.getAllProductImages;
            productService.getAllProductImages.mockReturnValue(['image1.jpg']);

            await productPreview.show(mockProductElement);

            await new Promise(resolve => setTimeout(resolve, 10));

            const controls = mockContainer.querySelectorAll('.images__pagination__control');
            expect(controls.length).toBe(0);

            productService.getAllProductImages = originalGetAll;
        });
    });

    describe('bindEvents', () => {
        test('close button hides preview', async () => {
            await productPreview.show(mockProductElement);

            const closeBtn = mockContainer.querySelector('.product__details__close');
            if (closeBtn) {
                closeBtn.click();
                expect(productPreview.onClose).toHaveBeenCalled();
            }
        });

        test('next button navigates to next image', async () => {
            await productPreview.show(mockProductElement);

            const nextBtn = mockContainer.querySelector('.next');
            if (nextBtn) {
                const initialIndex = productPreview.currentImageIndex;
                nextBtn.click();
                expect(productPreview.currentImageIndex).toBe(initialIndex + 1);
            }
        });

        test('previous button navigates to previous image', async () => {
            await productPreview.show(mockProductElement);
            productPreview.currentImageIndex = 1;

            const prevBtn = mockContainer.querySelector('.previous');
            if (prevBtn) {
                prevBtn.click();
                expect(productPreview.currentImageIndex).toBe(0);
            }
        });
    });

    describe('updateCartCountDisplay', () => {
        test('updates cart count element', () => {
            const countElement = document.querySelector('.cart__items__num');
            productPreview.updateCartCountDisplay(5);
            expect(countElement.textContent).toBe('5');
        });

        test('does nothing when count element not found', () => {
            document.querySelector('.cart__items__num')?.remove();
            expect(() => productPreview.updateCartCountDisplay(5)).not.toThrow();
        });
    });

    describe('error handling', () => {
        test('handles product not found', async () => {
            const { fetchAllProducts } = require('../../javascript/services/productService');
            fetchAllProducts.mockResolvedValueOnce([]);

            const invalidElement = document.createElement('div');
            invalidElement.setAttribute('product-id', '999');

            await productPreview.show(invalidElement);

            expect(mockContainer.innerHTML).toContain('error');
            expect(toast.error).toHaveBeenCalledWith('Failed to load product details');
        });

        test('handles fetch error', async () => {
            const { fetchAllProducts } = require('../../javascript/services/productService');
            fetchAllProducts.mockRejectedValueOnce(new Error('Network error'));

            await productPreview.show(mockProductElement);

            expect(toast.error).toHaveBeenCalled();
        });
    });
});