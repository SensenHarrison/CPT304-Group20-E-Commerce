# XSS After-Fix Evidence

This folder stores evidence after fixing the DOM-based XSS risk caused by dynamic product data being inserted through `innerHTML`.

## Test Payload

The first product title in `all_products.json` was temporarily changed to:

```json
"title": "<img src=x onerror=alert(1)>"