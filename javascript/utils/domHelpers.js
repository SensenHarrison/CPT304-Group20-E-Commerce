/**
 * Showing loading spinner
 * @param {HTMLElement} container
 */
export function showLoadingSpinner(container) {
    if (!container) return;

    container.innerHTML = '';
    container.classList.add('loading');

    const spinner = document.createElement('div');
    spinner.className = 'products__loader justify-content-center align-items-center';
    spinner.innerHTML = `
        <div class="spinner-border text-primary spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;

    container.appendChild(spinner);
}

/**
 * Hide loading Spinner
 * @param {HTMLElement} container
 */
export function hideLoadingSpinner(container) {
    if (!container) return;
    container.classList.remove('loading');
}

/**
 * Create element
 * @param {string} tag
 * @param {object} attributes
 * @param {Array|string} children
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    });

    if (typeof children === 'string') {
        element.textContent = children;
    } else if (Array.isArray(children)) {
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof HTMLElement) {
                element.appendChild(child);
            }
        });
    }

    return element;
}

/**
 * Change element
 * @param {HTMLElement} element
 * @param {boolean} show
 */
export function toggleElement(element, show) {
    if (element) {
        element.style.display = show ? '' : 'none';
    }
}

/**
 * Add toggle
 * @param {boolean} show
 */
export function toggleOverlay(show) {
    if (show) {
        document.body.classList.add('overlay');
    } else {
        document.body.classList.remove('overlay');
    }
}

/**
 * Get attribute
 * @param {HTMLElement} element
 * @param {string} attribute
 * @param {string} type - 'number', 'string', 'boolean'
 * @returns {any}
 */
export function getAttributeAs(element, attribute, type = 'string') {
    if (!element) return null;

    const value = element.getAttribute(attribute);
    if (value === null) return null;

    switch (type) {
        case 'number':
            return parseFloat(value);
        case 'boolean':
            return value === 'true';
        default:
            return value;
    }
}

/**
 * Scroll to element
 * @param {string|HTMLElement} target
 * @param {number} offset
 */
export function scrollToElement(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}