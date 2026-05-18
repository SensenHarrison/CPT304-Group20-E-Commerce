[![codecov](https://codecov.io/github/SensenHarrison/CPT304-Group20-E-Commerce/graph/badge.svg?token=LU30UWVWLJ)](https://codecov.io/github/SensenHarrison/CPT304-Group20-E-Commerce)

# CPT304 Group 20 E-Commerce Website

## Project Overview

This repository contains the CPT304 Group 20 e-commerce coursework project. It is a browser-based shopping site built with HTML, SASS/CSS, Bootstrap, and modular JavaScript. The application lets users browse products, search for items, preview product details, manage a shopping cart, switch currencies and languages, and receive feedback through toast notifications.

Live demo: [https://cpt-304-group20-e-commerce.vercel.app/](https://cpt-304-group20-e-commerce.vercel.app/)

## Main Features

- Product listing, search, and detail preview
- Shopping cart with quantity and item management
- Currency selection
- Toast feedback
- English/Chinese language switching
- Cookie consent banner
- Privacy policy page
- Accessibility improvements
- DOM XSS mitigation for dynamic product rendering
- Jest, Istanbul, and Codecov testing

## Run Locally

1. Clone the repository:

```bash
git clone https://github.com/SensenHarrison/CPT304-Group20-E-Commerce.git
```

2. Open the project directory:

```bash
cd CPT304-Group20-E-Commerce
```

3. Start a local static server:

```bash
py -m http.server 8000
```

4. Open the site in your browser:

```text
http://localhost:8000
```

## Testing

Install dependencies:

```bash
npm ci
```

Run the Jest test suite with coverage:

```bash
npm test
```

Coverage focuses on the modular JavaScript logic under:

- `javascript/components/`
- `javascript/services/`
- `javascript/utils/`

## Test Coverage Summary

- Test Suites: 17 passed, 17 total
- Tests: 162 passed, 162 total
- Statements: 97.61%
- Branches: 92.10%
- Functions: 94.02%
- Lines: 98.75%
