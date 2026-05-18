import {
    showLoadingSpinner,
    hideLoadingSpinner,
    createElement,
    toggleElement,
    toggleOverlay,
    getAttributeAs,
    scrollToElement
} from '../../javascript/utils/domHelpers';

describe('domHelpers', () => {
    let container;

    beforeEach(() => {
        document.body.innerHTML = '';
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    describe('showLoadingSpinner', () => {
        test('adds loading spinner to container', () => {
            showLoadingSpinner(container);

            expect(container.classList.contains('loading')).toBe(true);
            expect(container.querySelector('.spinner-border')).toBeDefined();
            expect(container.querySelector('.visually-hidden').textContent).toBe('Loading...');
        });

        test('does nothing if container is null', () => {
            expect(() => showLoadingSpinner(null)).not.toThrow();
        });

        test('clears existing content before showing spinner', () => {
            container.innerHTML = '<div>Existing content</div>';
            showLoadingSpinner(container);

            expect(container.innerHTML).not.toContain('Existing content');
            expect(container.querySelector('.spinner-border')).toBeDefined();
        });
    });

    describe('hideLoadingSpinner', () => {
        test('removes loading class from container', () => {
            container.classList.add('loading');
            hideLoadingSpinner(container);

            expect(container.classList.contains('loading')).toBe(false);
        });

        test('does nothing if container is null', () => {
            expect(() => hideLoadingSpinner(null)).not.toThrow();
        });
    });

    describe('createElement', () => {
        test('creates element with tag name', () => {
            const div = createElement('div');
            expect(div.tagName).toBe('DIV');
        });

        test('sets attributes correctly', () => {
            const img = createElement('img', {
                src: 'test.jpg',
                alt: 'Test image',
                className: 'test-class',
                'data-id': '123'
            });

            expect(img.src).toContain('test.jpg');
            expect(img.alt).toBe('Test image');
            expect(img.className).toBe('test-class');
            expect(img.getAttribute('data-id')).toBe('123');
        });

        test('sets style object correctly', () => {
            const div = createElement('div', {
                style: {
                    color: 'red',
                    fontSize: '16px'
                }
            });

            expect(div.style.color).toBe('red');
            expect(div.style.fontSize).toBe('16px');
        });

        test('appends text children', () => {
            const div = createElement('div', {}, 'Hello World');
            expect(div.textContent).toBe('Hello World');
        });

        test('appends element children', () => {
            const child = document.createElement('span');
            const parent = createElement('div', {}, [child]);

            expect(parent.children[0]).toBe(child);
        });

        test('appends mixed children', () => {
            const child = document.createElement('span');
            const parent = createElement('div', {}, ['Text ', child]);

            expect(parent.childNodes.length).toBe(2);
            expect(parent.childNodes[0].textContent).toBe('Text ');
            expect(parent.childNodes[1]).toBe(child);
        });
    });

    describe('toggleElement', () => {
        test('shows element when show is true', () => {
            container.style.display = 'none';
            toggleElement(container, true);

            expect(container.style.display).toBe('');
        });

        test('hides element when show is false', () => {
            container.style.display = '';
            toggleElement(container, false);

            expect(container.style.display).toBe('none');
        });

        test('does nothing if element is null', () => {
            expect(() => toggleElement(null, true)).not.toThrow();
        });
    });

    describe('toggleOverlay', () => {
        test('adds overlay class when show is true', () => {
            toggleOverlay(true);
            expect(document.body.classList.contains('overlay')).toBe(true);
        });

        test('removes overlay class when show is false', () => {
            document.body.classList.add('overlay');
            toggleOverlay(false);
            expect(document.body.classList.contains('overlay')).toBe(false);
        });
    });

    describe('getAttributeAs', () => {
        beforeEach(() => {
            container.setAttribute('data-number', '123');
            container.setAttribute('data-string', 'hello');
            container.setAttribute('data-boolean', 'true');
        });

        test('returns string by default', () => {
            const result = getAttributeAs(container, 'data-string');
            expect(result).toBe('hello');
            expect(typeof result).toBe('string');
        });

        test('returns number when type is number', () => {
            const result = getAttributeAs(container, 'data-number', 'number');
            expect(result).toBe(123);
            expect(typeof result).toBe('number');
        });

        test('returns boolean when type is boolean', () => {
            const result = getAttributeAs(container, 'data-boolean', 'boolean');
            expect(result).toBe(true);
            expect(typeof result).toBe('boolean');
        });

        test('returns null if element is null', () => {
            const result = getAttributeAs(null, 'anything');
            expect(result).toBeNull();
        });

        test('returns null if attribute does not exist', () => {
            const result = getAttributeAs(container, 'nonexistent');
            expect(result).toBeNull();
        });
    });

    describe('scrollToElement', () => {
        let targetElement;

        beforeEach(() => {
            targetElement = document.createElement('div');
            document.body.appendChild(targetElement);

            window.scrollTo = jest.fn();

            targetElement.getBoundingClientRect = jest.fn(() => ({
                top: 500,
                left: 0,
                bottom: 600,
                right: 100,
                width: 100,
                height: 100,
                x: 0,
                y: 500
            }));

            Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true });
        });

        test('scrolls to element', () => {
            scrollToElement(targetElement);

            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 600,
                behavior: 'smooth'
            });
        });

        test('scrolls with offset', () => {
            scrollToElement(targetElement, 50);

            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 550,
                behavior: 'smooth'
            });
        });

        test('accepts selector string', () => {
            const element = document.createElement('div');
            element.id = 'target';
            document.body.appendChild(element);
            element.getBoundingClientRect = jest.fn(() => ({ top: 100, bottom: 200, left: 0, right: 0, width: 0, height: 0, x: 0, y: 100 }));

            scrollToElement('#target');

            expect(window.scrollTo).toHaveBeenCalled();
        });

        test('does nothing if element not found', () => {
            scrollToElement('#nonexistent');
            expect(window.scrollTo).not.toHaveBeenCalled();
        });
    });
});