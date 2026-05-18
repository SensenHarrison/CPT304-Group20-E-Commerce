import { ProductPreview } from '../../javascript/components/productPreview';
import {
    fetchAllProducts,
    getProductImageUrl,
    getAllProductImages,
    getProductStock
} from '../../javascript/services/productService';
import { cartService } from '../../javascript/services/cartService';
import { toast } from '../../javascript/components/toast';

jest.mock('../../javascript/services/productService', () => ({
    fetchAllProducts: jest.fn(),
    getProductImageUrl: jest.fn(),
    getAllProductImages: jest.fn(),
    getProductStock: jest.fn()
}));

jest.mock('../../javascript/services/cartService', () => ({
    cartService: {
        init: jest.fn(),
        addItem: jest.fn()
    }
}));

jest.mock('../../javascript/components/toast', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}));

describe('ProductPreview edge branches', () => {
    let container;
    let productElement;

    const baseProduct = {
        id: 0,
        title: 'Edge Product',
        price: 50,
        description: '',
        images: ['one.jpg', 'two.jpg', 'three.jpg'],
        stock: 0
    };

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="product__preview"></div>
            <div class="cart__items__num"></div>
        `;
        localStorage.setItem('currency', JSON.stringify({ name: 'USD', rate: 1 }));

        container = document.querySelector('.product__preview');
        productElement = document.createElement('button');
        productElement.setAttribute('product-id', '0');

        fetchAllProducts.mockResolvedValue([baseProduct]);
        getProductImageUrl.mockReturnValue('one.jpg');
        getAllProductImages.mockReturnValue(['one.jpg', 'two.jpg', 'three.jpg']);
        getProductStock.mockReturnValue('Many In Stock');
        cartService.init.mockResolvedValue();
        cartService.addItem.mockReturnValue(4);
    });

    test('show exits when no usable container exists', async () => {
        document.querySelector('.product__preview').remove();
        const preview = new ProductPreview();

        await preview.show(productElement);

        expect(fetchAllProducts).not.toHaveBeenCalled();
    });

    test('show exits when product id is missing', async () => {
        const preview = new ProductPreview({ container });

        await preview.show(document.createElement('div'));

        expect(fetchAllProducts).not.toHaveBeenCalled();
    });

    test('render handles missing product data as an error state', async () => {
        fetchAllProducts.mockResolvedValueOnce([]);
        const preview = new ProductPreview({ container });

        await preview.render('9');

        expect(container.innerHTML).toContain('Failed to load product');
        expect(toast.error).toHaveBeenCalledWith('Failed to load product details');
    });

    test('renderContent uses fallback description and omits old price when discount is missing', () => {
        const preview = new ProductPreview({ container });
        preview.currentProduct = baseProduct;
        preview.currentImages = ['one.jpg'];

        preview.renderContent(baseProduct);

        expect(container.querySelector('.product__description').textContent).toBe('No description available');
        expect(container.querySelector('.the__old__price')).toBeNull();
        expect(container.querySelectorAll('.images__pagination__control')).toHaveLength(0);
    });

    test('renderThumbnails exits when pagination container is missing', () => {
        const preview = new ProductPreview({ container });
        preview.currentProduct = baseProduct;
        preview.currentImages = ['one.jpg'];

        expect(() => preview.renderThumbnails()).not.toThrow();
    });

    test('selectImage clamps below and above image bounds', () => {
        const preview = new ProductPreview({ container });
        preview.currentProduct = baseProduct;
        preview.currentImages = ['one.jpg', 'two.jpg'];
        preview.renderContent(baseProduct);

        preview.selectImage(-2);
        expect(preview.currentImageIndex).toBe(0);
        expect(container.querySelector('.main__image').getAttribute('src')).toBe('one.jpg');

        preview.selectImage(99);
        expect(preview.currentImageIndex).toBe(1);
        expect(container.querySelector('.main__image').getAttribute('src')).toBe('two.jpg');
    });

    test('setupImageZoom handles mouse, touch, and missing elements branches', () => {
        const preview = new ProductPreview({ container });
        preview.currentProduct = baseProduct;
        preview.currentImages = ['one.jpg'];
        preview.renderContent(baseProduct);

        const imageContainer = container.querySelector('.main__image__container');
        const mainImage = container.querySelector('.main__image');
        imageContainer.getBoundingClientRect = jest.fn(() => ({
            left: 0,
            top: 0,
            width: 100,
            height: 100
        }));

        imageContainer.onmousemove({ clientX: 50, clientY: 25 });
        expect(mainImage.style.transform).toContain('scale(2.4)');

        imageContainer.ontouchmove({ touches: [{ clientX: 20, clientY: 80 }] });
        expect(mainImage.style.transform).toContain('scale(2.4)');

        imageContainer.dispatchEvent(new Event('mouseleave'));
        expect(mainImage.style.transform).toBe('translate(0, 0) scale(1)');

        container.innerHTML = '';
        expect(() => preview.setupImageZoom()).not.toThrow();
    });

    test('bindEvents tolerates missing optional callback when adding to cart', async () => {
        const preview = new ProductPreview({ container });
        await preview.show(productElement);

        container.querySelector('.add__to__cart').click();
        await Promise.resolve();

        expect(cartService.init).toHaveBeenCalled();
        expect(cartService.addItem).toHaveBeenCalledWith(0);
        expect(document.querySelector('.cart__items__num').textContent).toBe('4');
        expect(toast.success).toHaveBeenCalledWith('✓ Added to cart!');
    });

    test('hide and destroy tolerate missing callbacks and containers', () => {
        const preview = new ProductPreview({ container });
        container.innerHTML = '<p>content</p>';

        expect(() => preview.hide()).not.toThrow();
        preview.destroy();
        expect(container.innerHTML).toBe('');

        const missing = new ProductPreview({ container: null });
        expect(() => missing.destroy()).not.toThrow();
    });
});
