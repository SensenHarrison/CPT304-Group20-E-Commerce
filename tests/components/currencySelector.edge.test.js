import { CurrencySelector } from '../../javascript/components/currencySelector';
import {
    fetchExchangeRates,
    getCurrentCurrency,
    setCurrentCurrency,
    updateProductPrices,
    prepareCurrencyList
} from '../../javascript/services/currencyService';
import { toast } from '../../javascript/components/toast';

jest.mock('../../javascript/services/currencyService', () => ({
    fetchExchangeRates: jest.fn(),
    getCurrentCurrency: jest.fn(),
    setCurrentCurrency: jest.fn(),
    updateProductPrices: jest.fn(),
    prepareCurrencyList: jest.fn()
}));

jest.mock('../../javascript/components/toast', () => ({
    toast: {
        error: jest.fn(),
        info: jest.fn()
    }
}));

describe('CurrencySelector edge branches', () => {
    let container;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="currency__container">
                <span class="currency__name"></span>
                <img class="currency__logo" alt="">
                <i></i>
            </div>
            <span class="product__price" price-USD="10"></span>
        `;
        container = document.querySelector('.currency__container');

        fetchExchangeRates.mockResolvedValue({ USD: 1, EUR: 0.9 });
        prepareCurrencyList.mockReturnValue([
            { name: 'USD', rate: 1, logoUrl: 'usd.png' },
            { name: 'EUR', rate: 0.9, logoUrl: 'eur.png' }
        ]);
        getCurrentCurrency.mockReturnValue({ name: 'USD', rate: 1 });
        setCurrentCurrency.mockImplementation((name, rate) => ({ name, rate }));
    });

    test('init returns early when no default container exists', async () => {
        document.body.innerHTML = '';
        const selector = new CurrencySelector();

        await selector.init();

        expect(fetchExchangeRates).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith('Currency selector container not found');
    });

    test('loadCurrencies reports and rethrows API failures', async () => {
        fetchExchangeRates.mockRejectedValueOnce(new Error('API down'));
        const selector = new CurrencySelector({ container });

        await expect(selector.loadCurrencies()).rejects.toThrow('API down');
        expect(toast.error).toHaveBeenCalledWith('Failed to load currency rates');
    });

    test('renderCurrentDisplay tolerates missing optional DOM elements and currency name', () => {
        container.innerHTML = '';
        const selector = new CurrencySelector({ container });
        selector.currentCurrency = { name: '', rate: 1 };

        expect(() => selector.renderCurrentDisplay()).not.toThrow();
    });

    test('renderOptionsList removes an existing list before rendering', () => {
        container.insertAdjacentHTML('beforeend', '<ul class="currency__options"><li>old</li></ul>');
        const selector = new CurrencySelector({ container });
        selector.currencies = [{ name: 'USD', rate: 1, logoUrl: 'usd.png' }];

        selector.renderOptionsList();

        expect(container.querySelectorAll('.currency__options')).toHaveLength(1);
        expect(container.querySelector('.currency__options li span').textContent).toBe('USD');
    });

    test('handleCurrencyChange works without optional callback', async () => {
        const selector = new CurrencySelector({ container });
        selector.currentCurrency = { name: 'USD', rate: 1 };
        selector.currencies = [{ name: 'EUR', rate: 0.9, logoUrl: 'eur.png' }];
        selector.render();

        await selector.handleCurrencyChange({ name: 'EUR', rate: 0.9, logoUrl: 'eur.png' });

        expect(setCurrentCurrency).toHaveBeenCalledWith('EUR', 0.9);
        expect(updateProductPrices).toHaveBeenCalledWith(document.querySelectorAll('.product__price'));
        expect(toast.info).toHaveBeenCalledWith('Currency changed to EUR');
    });

    test('toggleOptions covers listed and not-listed branches', () => {
        const selector = new CurrencySelector({ container });
        selector.optionsList = document.createElement('ul');
        selector.optionsList.className = 'currency__options';
        container.appendChild(selector.optionsList);

        selector.toggleOptions();
        expect(selector.optionsList.classList.contains('listed')).toBe(true);

        selector.toggleOptions();
        expect(selector.optionsList.classList.contains('listed')).toBe(false);
    });

    test('updateToggleIcon tolerates missing icon', () => {
        container.querySelector('i').remove();
        const selector = new CurrencySelector({ container });

        expect(() => selector.updateToggleIcon(true)).not.toThrow();
    });

    test('destroy removes options list even when click listener reference differs', () => {
        const selector = new CurrencySelector({ container });
        selector.optionsList = document.createElement('ul');
        selector.optionsList.className = 'currency__options';
        container.appendChild(selector.optionsList);

        selector.destroy();

        expect(container.querySelector('.currency__options')).toBeNull();
    });
});
