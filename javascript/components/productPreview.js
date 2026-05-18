import { toast } from './toast';
import { fetchAllProducts, getProductImageUrl, getAllProductImages, getProductStock } from '../services/productService';
import { cartService } from '../services/cartService';
import { getCurrentCurrency } from '../services/currencyService';
import { formatPrice, calculateOriginalPrice } from '../utils/priceCalculator';
import { showLoadingSpinner, hideLoadingSpinner, toggleOverlay, createElement } from '../utils/domHelpers';

export class ProductPreview {
    constructor(options = {}) {
        this.container = options.container || document.querySelector('.product__preview');
        this.onAddToCart = options.onAddToCart || null;
        this.onClose = options.onClose || null;
        this.currentProduct = null;
        this.currentImages = [];
        this.currentImageIndex = 0;
    }

    async show(productElement) {
        if (!this.container) return;

        const productId = productElement.getAttribute('product-id');
        if (!productId) return;

        toggleOverlay(true);
        await this.render(productId);
    }

    hide() {
        toggleOverlay(false);
        if (this.onClose) {
            this.onClose();
        }
    }

    async render(productId) {
        showLoadingSpinner(this.container);

        try {
            const products = await fetchAllProducts();
            const product = products[productId];

            if (!product) {
                throw new Error(`Product ${productId} not found`);
            }

            this.currentProduct = product;
            this.currentImages = getAllProductImages(product);
            this.currentImageIndex = 0;

            this.renderContent(product);
            this.bindEvents();
            hideLoadingSpinner(this.container);

        } catch (error) {
            console.error('Failed to render product:', error);
            this.container.innerHTML = '<div class="error">Failed to load product</div>';
            toast.error('Failed to load product details');
        }
    }

    renderContent(product) {
        const currency = getCurrentCurrency();
        const currentPrice = formatPrice(product.price, currency);
        const originalPrice = calculateOriginalPrice(product.price, product.discountPercentage);

        this.container.innerHTML = `
            <i class="product__details__close fa-solid fa-xmark p-2"></i>
            
            <div class="product__images">
                <div class="main__image__container p-3">
                    <img class="main__image" alt="${product.title} - main product photo">
                </div>
                
                <div class="product__images__pagination mt-3">
                    <div class="images__pagination__container px-2"></div>
                    <div class="images__pagination__control next d-flex justify-content-center align-items-center">
                        <i class="fa-solid fa-angle-right"></i>
                    </div>
                    <div class="images__pagination__control previous d-flex justify-content-center align-items-center">
                        <i class="fa-solid fa-angle-left"></i>
                    </div>
                </div>
            </div>
            
            <div class="product__details p-2">
                <h2 class="py-1">${this.escapeHtml(product.title)}</h2>
                <hr class="m-0">
                <div class="product__description mb-4 mt-3">${this.escapeHtml(product.description || 'No description available')}</div>
                
                <div>
                    <div class="product__details__price">
                        <span class="the__current__price">
                            <span class="currency__value">${currentPrice.amount}</span>
                            <span class="currency__name">${currentPrice.currency}</span>
                        </span>
                        ${originalPrice ? `<del class="the__old__price mx-2">${originalPrice} ${currency.name}</del>` : ''}
                    </div>
                    
                    <p class="availability mb-4">
                        Availability : <span>${getProductStock(product)}</span>
                    </p>
                </div>
                
                <div class="product__sale mt-5">
                    <button class="add__to__cart py-2 px-3" data-product-id="${product.id}">
                        <i class="fa-solid fa-cart-shopping mx-2 text-decoration-none"></i>
                        Add To Cart
                    </button>
                </div>
            </div>
        `;

        const mainImage = this.container.querySelector('.main__image');
        if (mainImage) {
            mainImage.src = getProductImageUrl(product);
        }

        this.renderThumbnails();

        this.setupImageZoom();
    }

    renderThumbnails() {
        const container = this.container.querySelector('.images__pagination__container');
        if (!container) return;

        container.innerHTML = '';

        this.currentImages.forEach((imageUrl, index) => {
            const thumb = createElement('img', {
                className: `p-2 pagination__image ${index === 0 ? 'active__image' : ''}`,
                src: imageUrl,
                alt: `${this.currentProduct.title} - thumbnail ${index + 1}`,
                'image-id': index
            });

            thumb.addEventListener('click', () => {
                this.selectImage(index);
            });

            container.appendChild(thumb);
        });

        const controls = this.container.querySelectorAll('.images__pagination__control');
        if (this.currentImages.length <= 2) {
            controls.forEach(control => control.remove());
        }
    }

    selectImage(index) {
        if (index < 0) index = 0;
        if (index >= this.currentImages.length) index = this.currentImages.length - 1;

        this.currentImageIndex = index;

        const thumbs = this.container.querySelectorAll('.pagination__image');
        thumbs.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active__image');
            } else {
                thumb.classList.remove('active__image');
            }
        });

        const mainImage = this.container.querySelector('.main__image');
        if (mainImage) {
            mainImage.src = this.currentImages[index];
        }
    }

    nextImage() {
        this.selectImage(this.currentImageIndex + 1);
    }

    prevImage() {
        this.selectImage(this.currentImageIndex - 1);
    }

    setupImageZoom() {
        const container = this.container.querySelector('.main__image__container');
        const mainImage = this.container.querySelector('.main__image');

        if (!container || !mainImage) return;

        const handleMove = (e) => {
            const rect = container.getBoundingClientRect();
            let clientX, clientY;

            if (e.touches) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            const x = (clientX - rect.left) / rect.width * 100;
            const y = (clientY - rect.top) / rect.height * 100;

            mainImage.style.transform = `translate(${-x}%, ${-y}%) scale(2.4)`;
        };

        container.onmousemove = handleMove;
        container.ontouchmove = handleMove;
        container.addEventListener('mouseleave', () => {
            mainImage.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    bindEvents() {
        const closeBtn = this.container.querySelector('.product__details__close');
        if (closeBtn) {
            closeBtn.onclick = () => this.hide();
        }

        const nextBtn = this.container.querySelector('.next');
        const prevBtn = this.container.querySelector('.previous');

        if (nextBtn) {
            nextBtn.onclick = () => this.nextImage();
        }
        if (prevBtn) {
            prevBtn.onclick = () => this.prevImage();
        }

        const addToCartBtn = this.container.querySelector('.add__to__cart');
        if (addToCartBtn) {
            addToCartBtn.onclick = async (e) => {
                const productId = parseInt(e.currentTarget.getAttribute('data-product-id'));
                await cartService.init();
                const count = cartService.addItem(productId);

                this.updateCartCountDisplay(count);

                toast.success('✓ Added to cart!');

                if (this.onAddToCart) {
                    this.onAddToCart(productId);
                }
            };
        }
    }

    updateCartCountDisplay(count) {
        const cartCountEl = document.querySelector('.cart__items__num');
        if (cartCountEl) {
            cartCountEl.textContent = count;
        }
    }

    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export const productPreview = new ProductPreview();