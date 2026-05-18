import { CartPreview } from '../../javascript/components/cartPreview';
import { cartService } from '../../javascript/services/cartService';
import { getCurrentCurrency } from '../../javascript/services/currencyService';
import { getProductImageUrl } from '../../javascript/services/productService';
import { toast } from '../../javascript/components/toast';

jest.mock('../../javascript/services/cartService');
jest.mock('../../javascript/services/currencyService');
jest.mock('../../javascript/services/productService');
jest.mock('../../javascript/components/toast');

describe('CartPreview edge branches', () => {
    let container;
    let trigger;

    const cartItem = {
        id: 3,
        product: {
            title: 'Cart Edge',
            price: 25,
            images: []
        },
        quantity: 1
    };

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="cart__items__preview"></div>
            <button class="cart__ico"></button>
            <span class="cart__items__num"></span>
        `;
        container = document.querySelector('.cart__items__preview');
        trigger = document.querySelector('.cart__ico');

        cartService.init.mockResolvedValue();
        cartService.isEmpty.mockReturnValue(false);
        cartService.getCartCount.mockReturnValue(1);
        cartService.getAllItems.mockReturnValue([cartItem]);
        cartService.getTotalFormatted.mockReturnValue({ amount: '25.00', currency: 'USD' });
        cartService.removeItem.mockReturnValue(true);
        cartService.updateQuantity.mockReturnValue(true);
        getCurrentCurrency.mockReturnValue({ name: 'USD', rate: 1 });
        getProductImageUrl.mockReturnValue('fallback.jpg');
    });

    test('show displays empty cart toast and does not render when cart is empty', async () => {
        cartService.isEmpty.mockReturnValueOnce(true);
        const preview = new CartPreview({ container, triggerElement: trigger });

        await preview.show();

        expect(toast.info).toHaveBeenCalledWith('Your cart is empty');
        expect(preview.isVisible).toBe(false);
        expect(container.innerHTML).toBe('');
    });

    test('render exits safely when container is missing', async () => {
        const preview = new CartPreview({ container: null });

        await expect(preview.render()).resolves.toBeUndefined();
    });

    test('bindEvents tolerates missing trigger and hides on outside click', async () => {
        const preview = new CartPreview({ container, triggerElement: null });
        preview.bindEvents();
        preview.isVisible = true;

        document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(preview.isVisible).toBe(false);
    });

    test('updateCartCount does nothing when count element is missing', () => {
        document.querySelector('.cart__items__num').remove();
        const preview = new CartPreview({ container, triggerElement: trigger });

        expect(() => preview.updateCartCount()).not.toThrow();
    });

    test('quantity buttons respect max and minimum boundaries', async () => {
        const preview = new CartPreview({ container, triggerElement: trigger });
        cartItem.quantity = 10;

        await preview.render();
        container.querySelector('.increase__btn').click();
        expect(cartService.updateQuantity).not.toHaveBeenCalled();

        container.querySelector('.product__count span').textContent = '1';
        container.querySelector('.decrease__btn').click();
        expect(cartService.updateQuantity).not.toHaveBeenCalled();
    });

    test('order and product image clicks tolerate missing callbacks', async () => {
        const preview = new CartPreview({ container, triggerElement: trigger });

        await preview.render();

        expect(() => container.querySelector('.view__cart__btn').click()).not.toThrow();
        expect(() => container.querySelector('.cart__item__img__container img').click()).not.toThrow();
    });

    test('delete hides preview when cart becomes empty after removal', async () => {
        cartService.isEmpty.mockReturnValueOnce(true);
        const preview = new CartPreview({ container, triggerElement: trigger });
        preview.isVisible = true;

        await preview.render();
        container.querySelector('.fa-xmark').click();

        expect(cartService.removeItem).toHaveBeenCalledWith(3);
        expect(preview.isVisible).toBe(false);
    });

    test('updateItemPrice tolerates a missing price element', () => {
        const preview = new CartPreview({ container, triggerElement: trigger });
        container.innerHTML = `
            <div class="cart__item__sale">
                <span data-product-id="3" data-price-usd="25">2</span>
            </div>
        `;

        expect(() => preview.updateItemPrice(container.querySelector('span'))).not.toThrow();
    });

    test('destroy tolerates missing trigger element', () => {
        const preview = new CartPreview({ container, triggerElement: null });

        expect(() => preview.destroy()).not.toThrow();
    });
});
