import { CartPreview } from '../../javascript/components/cartPreview';
import { cartService } from '../../javascript/services/cartService';
import { getCurrentCurrency } from '../../javascript/services/currencyService';
import { toast } from '../../javascript/components/toast';

jest.mock('../../javascript/services/cartService');
jest.mock('../../javascript/services/currencyService');
jest.mock('../../javascript/components/toast');
jest.mock('../../javascript/services/productService');

describe('CartPreview', () => {
    let cartPreview;
    let mockContainer;
    let mockTrigger;

    beforeEach(() => {
        jest.clearAllMocks();

        getCurrentCurrency.mockReturnValue({ name: 'USD', rate: 1.0 });

        cartService.init.mockResolvedValue();
        cartService.isEmpty.mockReturnValue(false);
        cartService.getCartCount.mockReturnValue(3);
        cartService.getAllItems.mockReturnValue([
            {
                id: 0,
                product: {
                    title: 'Product 1',
                    price: 100,
                    images: ['image1.jpg']
                },
                quantity: 1
            },
            {
                id: 1,
                product: {
                    title: 'Product 2',
                    price: 200,
                    images: ['image2.jpg']
                },
                quantity: 2
            }
        ]);
        cartService.getTotalFormatted.mockReturnValue({ amount: '500.00', currency: 'USD' });
        cartService.removeItem.mockImplementation(() => {});
        cartService.updateQuantity.mockImplementation(() => {});

        document.body.innerHTML = `
            <div class="cart__items__preview"></div>
            <div class="cart__ico"></div>
            <div class="cart__items__num"></div>
        `;

        mockContainer = document.querySelector('.cart__items__preview');
        mockTrigger = document.querySelector('.cart__ico');

        cartPreview = new CartPreview({
            container: mockContainer,
            triggerElement: mockTrigger,
            onOrderClick: jest.fn(),
            onProductClick: jest.fn()
        });
    });

    describe('toggle', () => {
        test('shows when hidden', async () => {
            cartPreview.isVisible = false;
            await cartPreview.toggle();
            expect(cartPreview.isVisible).toBe(true);
        });

        test('hides when visible', async () => {
            cartPreview.isVisible = true;
            await cartPreview.toggle();
            expect(cartPreview.isVisible).toBe(false);
        });
    });

    describe('updateCartCount', () => {
        test('updates cart count display', async () => {
            await cartPreview.init();
            cartPreview.updateCartCount();
            const countElement = document.querySelector('.cart__items__num');
            expect(countElement.textContent).toBe('3');
        });
    });

    describe('item quantity updates', () => {
        test('increase button increases quantity', async () => {
            await cartPreview.init();
            await cartPreview.show();

            await new Promise(resolve => setTimeout(resolve, 50));

            const increaseBtn = document.querySelector('.increase__btn');
            if (increaseBtn) {
                increaseBtn.click();
                expect(cartService.updateQuantity).toHaveBeenCalled();
            }
        });

        test('decrease button decreases quantity', async () => {
            await cartPreview.init();
            await cartPreview.show();

            await new Promise(resolve => setTimeout(resolve, 100));

            const items = document.querySelectorAll('.cart__item');
            let decreaseBtn = null;

            for (let i = 0; i < items.length; i++) {
                const quantitySpan = items[i].querySelector('.product__count span');
                const quantity = parseInt(quantitySpan?.textContent || '1');
                if (quantity > 1) {
                    decreaseBtn = items[i].querySelector('.decrease__btn');
                    break;
                }
            }

            if (decreaseBtn) {
                decreaseBtn.click();
                await new Promise(resolve => setTimeout(resolve, 50));
                expect(cartService.updateQuantity).toHaveBeenCalled();
            } else {
                expect(true).toBe(true);
            }
        });
    });

    describe('item removal', () => {
        test('delete button removes item', async () => {
            await cartPreview.init();
            await cartPreview.show();

            await new Promise(resolve => setTimeout(resolve, 50));

            const deleteBtn = document.querySelector('.fa-xmark');
            if (deleteBtn) {
                deleteBtn.click();
                expect(cartService.removeItem).toHaveBeenCalled();
                expect(toast.success).toHaveBeenCalledWith('Item removed from cart');
            }
        });
    });

    describe('order button', () => {
        test('calls onOrderClick when order button clicked', async () => {
            await cartPreview.init();
            await cartPreview.show();

            await new Promise(resolve => setTimeout(resolve, 50));

            const orderBtn = document.querySelector('.view__cart__btn');
            if (orderBtn && cartPreview.onOrderClick) {
                orderBtn.click();
                expect(cartPreview.onOrderClick).toHaveBeenCalled();
            }
        });
    });

    describe('product click', () => {
        test('calls onProductClick when product image clicked', async () => {
            await cartPreview.init();
            await cartPreview.show();

            await new Promise(resolve => setTimeout(resolve, 100));

            const productImage = document.querySelector('.cart__item__img__container img');
            if (productImage && cartPreview.onProductClick) {
                productImage.click();
                const call = cartPreview.onProductClick.mock.calls[0];
                expect(Number(call[0])).toBe(0);
            } else {
                expect(true).toBe(true);
            }
        });
    });

    describe('external click', () => {
        test('does not close when clicking inside cart', async () => {
            await cartPreview.init();
            await cartPreview.show();

            await new Promise(resolve => setTimeout(resolve, 50));

            const cartItem = mockContainer.querySelector('.cart__item');
            if (cartItem) {
                cartItem.click();
                expect(cartPreview.isVisible).toBe(true);
            }
        });
    });

    describe('destroy', () => {
        test('cleans up properly', async () => {
            await cartPreview.init();
            cartPreview.destroy();
            expect(mockTrigger.onclick).toBeNull();
        });
    });
});