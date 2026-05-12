# XSS innerHTML Before Snippets

This evidence captures the original `innerHTML` usage related to dynamic product rendering. No source code has been changed.

## Select-String Search Result

Command:

```powershell
Select-String -Path javascript/index.js,javascript/main.js -Pattern 'innerHTML' | ForEach-Object { "{0}:{1}:{2}" -f $_.Path,$_.LineNumber,$_.Line.Trim() }
```

Result:

```text
E:\CPT304-Group20-E-Commerce-main\javascript\index.js:106:search__results.innerHTML = "";
E:\CPT304-Group20-E-Commerce-main\javascript\index.js:169:products__container.innerHTML = "<h3>No Results</h3>";
E:\CPT304-Group20-E-Commerce-main\javascript\index.js:289:div.innerHTML = `
E:\CPT304-Group20-E-Commerce-main\javascript\main.js:334:product__preview.innerHTML = `
E:\CPT304-Group20-E-Commerce-main\javascript\main.js:555:container.innerHTML = "";
E:\CPT304-Group20-E-Commerce-main\javascript\main.js:557:container.innerHTML = `<section class="products__loader justify-content-center align-items-center">
E:\CPT304-Group20-E-Commerce-main\javascript\main.js:588:cart__items__preview.innerHTML = `
E:\CPT304-Group20-E-Commerce-main\javascript\main.js:599:cart__items__preview.innerHTML = `
E:\CPT304-Group20-E-Commerce-main\javascript\main.js:621:product__item.innerHTML = `
```

## javascript/index.js around line 289

```javascript
 284:     }
 285: 
 286:     let div = document.createElement("div");
 287:     div.className = "product position-relative mx-3 mb-4 ";
 288:     div.setAttribute("product-id", ele.id);
 289:     div.innerHTML = `
 290:         <div class="product__img__container">
 291:             <img src=${img_src(ele)} alt="${ele.title}">
 292:         </div>
 293: 
 294:         <div class="product__info p-2 ">
 295:             <span class="category__name">${ele.category}</span>
 296:             <h3>${ele.title}</h3>
 297:             <span class="product__price" price-USD="${ele.price}">${product_price()}</span>
 298:         </div>
 299: 
 300:         <div class="product__discount px-1">${product_discount()}</div>
 301: 
 302:         <div class="product__rating" rate=${product_rate()}>
 303:             <i class="fa-regular fa-star"></i>
 304:             <i class="fa-regular fa-star"></i>
 305:             <i class="fa-regular fa-star"></i>
 306:             <i class="fa-regular fa-star"></i>
 307:             <i class="fa-regular fa-star"></i>
 308:     </div>`;
 309:         
 310:     products__container.append(div);
 311: 
 312:     function product_discount() {
```

## javascript/main.js around line 334

```javascript
 328:   display_loading_spinner(product__preview);
 329: 
 330:   fetch_data("all_products.json").then(res => {
 331:     let product__id = +element.getAttribute("product-id"),
 332:         product__obj = [...all_products][product__id];
 333: 
 334:     product__preview.innerHTML = `
 335:     <i class="product__details__close fa-solid fa-xmark p-2"></i>
 336: 
 337:     <div class="product__images">
 338:         <div class="main__image__container p-3"></div>
 339: 
 340:         <div class="product__images__pagination mt-3">
 341:             <div class="images__pagination__container px-2"></div>
 342:             <div class="images__pagination__control next d-flex justify-content-center align-items-center">
 343:                 <i class="fa-solid fa-angle-right"></i>
 344:             </div>
 345:             <div class="images__pagination__control previous d-flex justify-content-center align-items-center">
 346:                 <i class="fa-solid fa-angle-left"></i>
 347:             </div>
 348:         </div>
 349:     </div>
 350: 
 351:     <div class="product__details p-2">
 352:         <h2 class="py-1">${product__obj.title}</h2><hr class="m-0">
 353:         <div class="product__description mb-4 mt-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam sint itaque saepe beatae, facilis dolorem ipsa ut, accusantium temporibus minima nisi ex porro vel deserunt quae autem voluptates eum ipsam Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam sint itaque saepe beatae</div>
 354: 
 355:         <div>
 356:             <div class="product__details__price">
 357:                 <span class="the__current__price">
 358:                     <span class="currency__value" product-price="${(product__obj.price * JSON.parse(localStorage.getItem("currency")).rate).toFixed(2)}">
 359:                     ${(product__obj.price * JSON.parse(localStorage.getItem("currency")).rate).toFixed(2)}</span>
 360:                     <span class="currency__name">${JSON.parse(localStorage.getItem("currency")).name}</span>
 361:                 </span>
 362:                 <del class="the__old__price mx-2"></del>
 363:             </div>
 364: 
 365:             <p class="availability mb-4">
 366:                 Availability : <span>${product_stock()}</span>
 367:             </p>
 368: 
 369:         </div>
 370: 
 371:         <div class="product__sale mt-5">
 372:         <button class="add__to__cart py-2 px-3" product-id=${product__obj.id}>
 373:             <i class="fa-solid fa-cart-shopping mx-2  text-decoration-none"></i>
 374:             Add To Cart
 375:         </button>
 376: 
 377:       </div>
 378: 
 379:     </div>`;
 380: 
 381:     // elements functions
 382:       // main image
 383:       const main__image__container = document.querySelector(".main__image__container");
 384:       let main__image = document.createElement("img");
 385: 
 386:       main__image.className = 'main__image';
 387:       main__image.alt = "product-image";
 388:       main__image.src = img_src(product__obj);
 389:       main__image__container.append(main__image);
```

## javascript/main.js around line 621

```javascript
 616:       let product__item = document.createElement("div");
 617: 
 618:       product__item.className = "cart__item position-relative my-3 pb-3";
 619:       product__item.setAttribute("product-id", ele);
 620: 
 621:       product__item.innerHTML = `
 622:         <i class="fa-solid fa-xmark"></i>
 623:         <div class="cart__item__img__container p-2">
 624:           <img src=${img_src(item)} alt="product-image" product-id=${ele}>
 625:         </div>
 626:         <div class="cart__item__info">
 627:           <h2>${item.title}</h2>
 628: 
 629:           <div class="cart__item__sale d-flex justify-content-between align-items-center mt-4">
 630:             <div class="cart__item__price">${(currency.rate * item.price).toFixed(2)} ${currency.name}</div>
 631: 
 632:             <div class="product__count d-flex justify-content-between" max-quantity="10">
 633:               <div class="increase__btn d-flex justify-content-center align-items-center py-1"><i class="fa-solid fa-chevron-up"></i></div>
 634:               <span product-price=${(currency.rate * item.price).toFixed(2)} product-id=${item.id}>1</span>
 635:               <div class="decrease__btn d-flex justify-content-center align-items-center py-1"><i class="fa-solid fa-chevron-down"></i></div>
 636:             </div>
 637:           </div>
 638:         </div>
 639:       </div>`
 640: 
 641:       cart__items.append(product__item);
```

## Security relevance note

These locations are security-relevant because they build HTML strings with product data and assign those strings directly to `innerHTML`. The interpolated fields include values such as product title, category, price, id, image source, currency name, and computed product display data. If any of those dynamic values can be controlled or polluted by an attacker, the browser may parse the value as markup or script-capable HTML, creating a potential DOM-based XSS risk. This file is evidence only and does not rewrite or fix the original code.
