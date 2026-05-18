// Codes for test only
import { toast } from './components/toast';
import { CurrencySelector } from './components/CurrencySelector';
import { ProductPreview } from './components/productPreview';
import { CartPreview } from './components/cartPreview';
import { fetchAllProducts, getProductImageUrl, getAllProductImages, getProductStock } from './services/productService';
import { getCurrentCurrency, setCurrentCurrency, updateProductPrices, prepareCurrencyList } from './services/currencyService';
import { cartService } from './services/cartService';
import { formatPrice, calculateOriginalPrice, convertPrice } from './utils/priceCalculator';
import { showLoadingSpinner, hideLoadingSpinner, toggleOverlay, createElement, toggleElement, getAttributeAs, scrollToElement } from './utils/domHelpers';
import { storage, currencyStorage, cartStorage } from './utils/storageHelper';

export {
    toast,
    CurrencySelector,
    ProductPreview,
    CartPreview,
    fetchAllProducts,
    getProductImageUrl,
    getAllProductImages,
    getProductStock,
    getCurrentCurrency,
    setCurrentCurrency,
    updateProductPrices,
    prepareCurrencyList,
    cartService,
    formatPrice,
    calculateOriginalPrice,
    convertPrice,
    showLoadingSpinner,
    hideLoadingSpinner,
    toggleOverlay,
    createElement,
    toggleElement,
    getAttributeAs,
    scrollToElement,
    storage,
    currencyStorage,
    cartStorage
};