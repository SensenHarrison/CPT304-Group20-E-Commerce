import { toast } from './toast';
import {
    fetchExchangeRates,
    getCurrentCurrency,
    setCurrentCurrency,
    updateProductPrices,
    prepareCurrencyList
} from '../services/currencyService';

export class CurrencySelector {
    constructor(options = {}) {
        this.container = options.container || document.querySelector('.currency__container');
        this.onCurrencyChange = options.onCurrencyChange || null;
        this.currencies = [];
        this.currentCurrency = null;
        this.optionsList = null;
    }

    async init() {
        if (!this.container) {
            console.error('Currency selector container not found');
            return;
        }

        await this.loadCurrencies();
        this.render();
        this.bindEvents();
    }

    async loadCurrencies() {
        try {
            const rates = await fetchExchangeRates();
            this.currencies = prepareCurrencyList(rates);
            this.currentCurrency = getCurrentCurrency();
        } catch (error) {
            console.error('Failed to load currencies:', error);
            toast.error('Failed to load currency rates');
            throw error;
        }
    }

    render() {
        this.renderCurrentDisplay();
        this.renderOptionsList();
    }

    renderCurrentDisplay() {
        const currencyNameEl = this.container.querySelector('.currency__name');
        const currencyLogoEl = this.container.querySelector('.currency__logo');

        if (currencyNameEl) {
            currencyNameEl.textContent = this.currentCurrency.name;
            currencyNameEl.setAttribute('the-rate', this.currentCurrency.rate);
            currencyNameEl.setAttribute('the-currency', this.currentCurrency.name);
        }

        if (currencyLogoEl && this.currentCurrency.name) {
            const currencyCode = this.currentCurrency.name.slice(0, -1).toLowerCase();
            currencyLogoEl.src = `https://flagcdn.com/w40/${currencyCode}.png`;
            currencyLogoEl.alt = this.currentCurrency.name;
        }
    }

    renderOptionsList() {
        const oldList = this.container.querySelector('.currency__options');
        if (oldList) {
            oldList.remove();
        }

        this.optionsList = document.createElement('ul');
        this.optionsList.className = 'currency__options list-unstyled p-1';

        this.currencies.forEach(currency => {
            const option = this.createOptionElement(currency);
            this.optionsList.appendChild(option);
        });

        this.container.appendChild(this.optionsList);
    }

    createOptionElement(currency) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const span = document.createElement('span');

        img.src = currency.logoUrl;
        img.alt = currency.name;
        span.textContent = currency.name;
        span.setAttribute('the-currency', currency.name);
        span.setAttribute('the-rate', currency.rate);

        li.appendChild(img);
        li.appendChild(span);

        li.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleCurrencyChange(currency);
        });

        return li;
    }

    async handleCurrencyChange(currency) {
        this.currentCurrency = setCurrentCurrency(currency.name, currency.rate);

        this.renderCurrentDisplay();

        const productPrices = document.querySelectorAll('.product__price');
        updateProductPrices(productPrices);

        if (this.onCurrencyChange) {
            this.onCurrencyChange(this.currentCurrency);
        }

        toast.info(`Currency changed to ${currency.name}`);

        this.hideOptions();
    }

    showOptions() {
        if (this.optionsList) {
            this.optionsList.classList.add('listed');
        }
        this.updateToggleIcon(true);
    }

    hideOptions() {
        if (this.optionsList) {
            this.optionsList.classList.remove('listed');
        }
        this.updateToggleIcon(false);
    }

    toggleOptions() {
        if (this.optionsList?.classList.contains('listed')) {
            this.hideOptions();
        } else {
            this.showOptions();
        }
    }

    updateToggleIcon(isOpen) {
        const icon = this.container.querySelector('.currency__container i');
        if (icon) {
            icon.className = isOpen
                ? 'fa-solid fa-chevron-up mx-1'
                : 'fa-solid fa-chevron-down mx-1';
        }
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            if (e.target.closest('.currency__options li')) {
                return;
            }
            this.toggleOptions();
        });

        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.hideOptions();
            }
        });
    }

    getCurrentCurrency() {
        return this.currentCurrency;
    }

    destroy() {
        this.container.removeEventListener('click', this.toggleOptions);
        if (this.optionsList) {
            this.optionsList.remove();
        }
    }
}