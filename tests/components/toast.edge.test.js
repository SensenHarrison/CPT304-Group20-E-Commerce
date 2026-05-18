import { ToastManager } from '../../javascript/components/toast';

describe('ToastManager edge branches', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('createContainer reuses an existing toast container', () => {
        const existing = document.createElement('div');
        existing.className = 'toast-container';
        document.body.appendChild(existing);

        const manager = new ToastManager();

        expect(manager.createContainer()).toBe(existing);
        expect(document.querySelectorAll('.toast-container')).toHaveLength(1);
    });

    test('show uses default info type and a custom duration', () => {
        const manager = new ToastManager();
        const toast = manager.show('Default type', undefined, 25);

        expect(toast.textContent).toBe('Default type');
        expect(toast.style.background).toBe('rgb(23, 162, 184)');

        jest.advanceTimersByTime(24);
        expect(document.querySelector('.toast-container').children).toHaveLength(1);

        jest.advanceTimersByTime(1);
        expect(document.querySelector('.toast-container').children).toHaveLength(0);
    });
});
