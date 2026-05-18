import { ToastManager, toast } from '../../javascript/components/toast';

describe('ToastManager', () => {
    let toastManager;

    beforeEach(() => {
        document.body.innerHTML = '';
        toastManager = new ToastManager();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('getColorByType returns correct colors', () => {
        expect(toastManager.getColorByType('success')).toBe('#28a745');
        expect(toastManager.getColorByType('error')).toBe('#dc3545');
        expect(toastManager.getColorByType('info')).toBe('#17a2b8');
        expect(toastManager.getColorByType('warning')).toBe('#ffc107');
        expect(toastManager.getColorByType('unknown')).toBe('#17a2b8');
    });

    test('createContainer creates container if not exists', () => {
        const container = toastManager.getContainer();
        expect(document.querySelector('.toast-container')).toBe(container);
    });

    test('show creates and removes toast after duration', () => {
        toastManager.show('Test message', 'success');

        const container = document.querySelector('.toast-container');
        expect(container.children.length).toBe(1);
        expect(container.children[0].textContent).toBe('Test message');

        jest.advanceTimersByTime(3000);

        expect(container.children.length).toBe(0);
    });

    test('success, error, info methods work correctly', () => {
        toastManager.success('Success!');
        toastManager.error('Error!');
        toastManager.info('Info!');

        const container = document.querySelector('.toast-container');
        expect(container.children.length).toBe(3);
    });
});