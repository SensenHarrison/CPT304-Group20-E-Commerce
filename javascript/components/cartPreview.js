import { cartService } from '../services/cartService';
import { getCurrentCurrency } from '../services/currencyService';
import { formatPrice } from '../utils/priceCalculator';
import { getProductImageUrl } from '../services/productService';
import { toast } from './toast';
import { showLoadingSpinner, hideLoadingSpinner, createElement } from '../utils/domHelpers';

export class CartPreview {
    constructor(options = {}) {
        this.container = options.container || document.querySelector('.cart__items__preview');
        this.triggerElement = options.triggerElement || document.querySelector('.cart__ico');
        this.onOrderClick = options.onOrderClick || null;
        this.onProductClick = options.onProductClick || null;
        this.isVisible = false;
    }

    async init() {
        await cartService.init();
        this.updateCartCount();
        this.bindEvents();
    }

    bindEvents() {
        if (this.triggerElement) {
            this.triggerElement.onclick = () => this.toggle();
        }

        document.addEventListener('click', (e) => {
            if (this.isVisible &&
                !this.container?.contains(e.target) &&
                !this.triggerElement?.contains(e.target)) {
                this.hide();
            }
        });
    }

    async toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            await this.show();
        }
    }

    async show() {
        if (cartService.isEmpty()) {
            toast.info('Your cart is empty');
            return;
        }

        this.isVisible = true;
        await this.render();
        this.container?.classList.add('listed__cart');
    }

    hide() {
        this.isVisible = false;
        this.container?.classList.remove('listed__cart');
    }

    updateCartCount() {
        const countElement = document.querySelector('.cart__items__num');
        if (countElement) {
            const count = cartService.getCartCount();
            countElement.textContent = count;
        }
    }

    async render() {
        if (!this.container) return;

        showLoadingSpinner(this.container);

        const items = cartService.getAllItems();
        const currency = getCurrentCurrency();

        this.container.innerHTML = `
            <div class="cart__items position-relative pb-3"></div>
            <div class="cart__summary position-relative pt-2">
                <div class="cart__summary__total pb-3">
                    Cart Total : <span class="mx-2"></span>
                </div>
                <button class="view__cart__btn py-2 px-3">
                    <i class="fa-solid fa-cart-shopping mx-2 text-decoration-none"></i>
                    Order Now
                </button>
            </div>
        `;

        const cartItemsContainer = this.container.querySelector('.cart__items');

        for (const item of items) {
            const itemElement = this.createCartItemElement(item, currency);
            cartItemsContainer.appendChild(itemElement);
        }

        this.updateTotalPrice();
        this.bindCartEvents();

        hideLoadingSpinner(this.container);
    }

    createCartItemElement(item, currency) {
        const product = item.product;
        const priceUSD = product.price * item.quantity;
        const priceFormatted = formatPrice(priceUSD, currency);

        const element = createElement('div', {
            className: 'cart__item position-relative my-3 pb-3',
            'product-id': item.id
        });

        element.innerHTML = `
            <i class="fa-solid fa-xmark"></i>
            <div class="cart__item__img__container p-2">
                <img alt="${this.escapeHtml(product.title)}">
            </div>
            <div class="cart__item__info">
                <h2>${this.escapeHtml(product.title)}</h2>
                <div class="cart__item__sale d-flex justify-content-between align-items-center mt-4">
                    <div class="cart__item__price">${priceFormatted.amount} ${priceFormatted.currency}</div>
                    <div class="product__count d-flex justify-content-between" max-quantity="10">
                        <div class="increase__btn d-flex justify-content-center align-items-center py-1">
                            <i class="fa-solid fa-chevron-up"></i>
                        </div>
                        <span data-product-id="${item.id}" data-price-usd="${product.price}">${item.quantity}</span>
                        <div class="decrease__btn d-flex justify-content-center align-items-center py-1">
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 设置图片
        const img = element.querySelector('.cart__item__img__container img');
        if (img) {
            img.src = getProductImageUrl(product);
            img.alt = product.title;
        }

        return element;
    }

    bindCartEvents() {
        const deleteBtns = this.container.querySelectorAll('.cart__item .fa-xmark');
        deleteBtns.forEach(btn => {
            btn.onclick = async (e) => {
                const item = btn.closest('.cart__item');
                const productId = parseInt(item.getAttribute('product-id'));

                cartService.removeItem(productId);
                item.remove();

                this.updateTotalPrice();
                this.updateCartCount();

                if (cartService.isEmpty()) {
                    this.hide();
                }

                toast.success('Item removed from cart');
            };
        });

        const increaseBtns = this.container.querySelectorAll('.increase__btn');
        const decreaseBtns = this.container.querySelectorAll('.decrease__btn');

        increaseBtns.forEach(btn => {
            btn.onclick = async () => {
                const quantitySpan = btn.nextElementSibling;
                const productId = parseInt(quantitySpan.getAttribute('data-product-id'));
                const currentQty = parseInt(quantitySpan.textContent);
                const maxQty = parseInt(btn.parentElement.getAttribute('max-quantity'));

                if (currentQty < maxQty) {
                    cartService.updateQuantity(productId, currentQty + 1);
                    quantitySpan.textContent = currentQty + 1;
                    this.updateItemPrice(quantitySpan);
                    this.updateTotalPrice();
                    this.updateCartCount();
                }
            };
        });

        decreaseBtns.forEach(btn => {
            btn.onclick = async () => {
                const quantitySpan = btn.previousElementSibling;
                const productId = parseInt(quantitySpan.getAttribute('data-product-id'));
                const currentQty = parseInt(quantitySpan.textContent);

                if (currentQty > 1) {
                    cartService.updateQuantity(productId, currentQty - 1);
                    quantitySpan.textContent = currentQty - 1;
                    this.updateItemPrice(quantitySpan);
                    this.updateTotalPrice();
                    this.updateCartCount();
                }
            };
        });

        const orderBtn = this.container.querySelector('.view__cart__btn');
        if (orderBtn && this.onOrderClick) {
            orderBtn.onclick = () => this.onOrderClick();
        }

        const productImages = this.container.querySelectorAll('.cart__item__img__container img');
        productImages.forEach(img => {
            img.onclick = () => {
                if (this.onProductClick) {
                    const item = img.closest('.cart__item');
                    const productId = item.getAttribute('product-id');
                    this.onProductClick(productId);
                    this.hide();
                }
            };
        });
    }

    updateItemPrice(quantitySpan) {
        const productId = parseInt(quantitySpan.getAttribute('data-product-id'));
        const priceUSD = parseFloat(quantitySpan.getAttribute('data-price-usd'));
        const quantity = parseInt(quantitySpan.textContent);
        const currency = getCurrentCurrency();

        const totalPrice = formatPrice(priceUSD * quantity, currency);

        const priceElement = quantitySpan.closest('.cart__item__sale').querySelector('.cart__item__price');
        if (priceElement) {
            priceElement.textContent = `${totalPrice.amount} ${totalPrice.currency}`;
        }
    }

    updateTotalPrice() {
        const totalElement = this.container.querySelector('.cart__summary__total span');
        if (totalElement) {
            const total = cartService.getTotalFormatted();
            totalElement.textContent = `${total.amount} ${total.currency}`;
        }
    }

    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    destroy() {
        if (this.triggerElement) {
            this.triggerElement.onclick = null;
        }
    }
}

export const cartPreview = new CartPreview();