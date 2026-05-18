// tests/setup.js
import '@testing-library/jest-dom';

const localStorageMock = (function() {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
        removeItem: jest.fn(key => { delete store[key]; }),
        clear: jest.fn(() => { store = {}; }),
        get length() { return Object.keys(store).length; },
        key: jest.fn(index => Object.keys(store)[index] || null)
    };
})();

global.localStorage = localStorageMock;
global.fetch = jest.fn();
global.scrollTo = jest.fn();

global.console = {
    ...console,
    error: jest.fn(),
    warn: jest.fn()
};

beforeEach(() => {
    localStorage.clear();
    fetch.mockClear();
    document.body.innerHTML = '';
    jest.clearAllMocks();
});

afterEach(() => {
    jest.resetModules();
});

Element.prototype.getBoundingClientRect = jest.fn(() => ({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0
}));