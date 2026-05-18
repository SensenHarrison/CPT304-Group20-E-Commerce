// ========== Toast 通知系统 ==========
function showToast(message, type = "info") {
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        toastContainer.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999;";
        document.body.appendChild(toastContainer);
    }
    const toast = document.createElement("div");
    let bgColor = type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#17a2b8";
    toast.style.cssText = `background: ${bgColor}; color: white; padding: 12px 20px; margin-top: 10px; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
// ========== Toast 系统结束 ==========// loading page
window.addEventListener("load", () => {
document.querySelector("main").style.display = "block";
document.querySelector(".loader").style.display = "none";
});

// scroll to top
let scroll__top__btn = document.querySelector(".scroll__top__btn");
scroll__top__btn.setAttribute("tabindex", "-1");
window.addEventListener("scroll", () => {
if(scrollY >= 500) {
  scroll__top__btn.classList.add("displayed");
  scroll__top__btn.setAttribute("tabindex", "0");
} else{
  scroll__top__btn.classList.remove("displayed");
  scroll__top__btn.setAttribute("tabindex", "-1");
}
});

// Currency convert
const currency__container = document.querySelector(".currency__container");
const currency__name = document.querySelector(".currency__name");
const currency__logo = document.querySelector(".currency__logo");
const currency__list__ico = document.querySelector(".currency__container i");

const currencies__data = [];

if(localStorage.getItem("currency")) {
let the__currency__data = JSON.parse(localStorage.getItem("currency"));
currency__name.setAttribute("the-rate", the__currency__data.rate);
currency__name.setAttribute("the-currency", the__currency__data.name);
currency__name.textContent = the__currency__data.name;

currency__logo.src = `https://flagcdn.com/w40/${the__currency__data.name.slice(0, the__currency__data.name.length - 1).toLowerCase()}.png`;
currency__logo.alt = the__currency__data.name;
} else{
let usd = {
  name: "USD",
  rate: 1.0
}

localStorage.setItem("currency", JSON.stringify(usd));
}

fetch_data('/api/currency')
.then(res => {

  for(let i in res.rates) {
    if(['EUR', 'USD', 'GBP', 'EGP'].includes(i)) {
        let cur = {
            name: i,
            rate: res.rates[i],
            logo__src: `https://flagcdn.com/w40/${i.slice(0, i.length - 1).toLowerCase()}.png`
        }
        currencies__data.push(cur);
    }
  }

  let currency__options = document.createElement("ul");
  currency__options.classList.add("currency__options", "list-unstyled", "p-1");

  currencies__data.forEach((ele) => {
    let currency = document.createElement("li"),
        currency__option__logo = document.createElement("img"),
        currency__option__name = document.createElement("span");

    currency__option__logo.src = ele.logo__src;
    currency__option__logo.alt = ele.name;

    currency__option__name.textContent = ele.name;
    currency__option__name.setAttribute("the-currency", ele.name);
    currency__option__name.setAttribute("the-rate", ele.rate);

    currency__container.append(currency__options);
    currency.append(currency__option__logo, currency__option__name);
    currency__options.append(currency);

    document.querySelector(".cart__items__preview").classList.remove("listed__cart");
  });

  currency__container.addEventListener("click", () => {
    if(!currency__options.classList.contains("listed")) {
        currency__options.classList.add("listed");
        currency__list__ico.className = "fa-solid fa-chevron-up mx-1";
    } else{
        currency__options.classList.remove("listed");
        currency__list__ico.className = "fa-solid fa-chevron-down mx-1";
    }
    showToast("Currency changed", "info");
  });

  let currencies__items = document.querySelectorAll(".currency__options li");
  currencies__items.forEach(ele => {
    ele.addEventListener("click", (e) => {
        currency__options.classList.add("listed");
        currency__logo.src = e.currentTarget.children[0].getAttribute("src");
        currency__logo.alt = e.currentTarget.children[1].textContent;

        currency__name.textContent = e.currentTarget.children[1].textContent;
        currency__name.setAttribute("the-currency", e.currentTarget.children[1].textContent);
        currency__name.setAttribute("the-rate", e.currentTarget.children[1].getAttribute("the-rate"));

        let currency__obj__in__localStorage = {
            name: currency__name.getAttribute("the-currency"),
            rate: currency__name.getAttribute("the-rate")
        };

        localStorage.setItem("currency",  JSON.stringify(currency__obj__in__localStorage));

        // change product currency
        let product__prices = document.querySelectorAll(".product__price");
        let current__currency = JSON.parse(localStorage.getItem("currency"));

        product__prices.forEach(ele => {
            let price = +ele.getAttribute("price-USD");
            ele.textContent = (price * current__currency.rate).toFixed(2) + " " + current__currency.name;
        });

    });
  });

})
.catch(error => {
    console.error("Currency API error:", error);
    showToast("Failed to load currency rates.", "error");
});


window.addEventListener("load", () => {
let currency__options__items = document.querySelectorAll(".currency__options li");

  currency__options__items.forEach(ele => {
    ele.addEventListener("click", () => {
      let products__price = document.querySelectorAll(".product__price"),
          theCurrency = JSON.parse(localStorage.getItem("currency"));

        products__price.forEach(ele => {
            let the_price_USD = parseInt(ele.getAttribute("price-USD"));
            let the_new_price = (the_price_USD * +theCurrency.rate).toFixed(2);

            ele.textContent = the_new_price + " " + theCurrency.name;
      });
    });
  })
});

// set categories
const categories__btn = document.querySelector(".categories__btn");
const categories = new Set();
const all_products = new Set();
const categories__logos = [
{
  name: "smartphones",
  src: "images/samrtphones.jpg"
},
{
  name: "electronics",
  src: "images/electronics.jpg"
},
{
  name: "laptops",
  src: "images/laptops.jpg"
},
{
  name: "watches",
  src: "images/watches.webp"
},
{
  name: "shoes",
  src: "images/shoes.png"
},
{
  name: "fragrances",
  src: "images/Fragrances.jpg"
},
{
  name: "skincare",
  src: "images/skincare.jpg"
},,
{
  name: "men's products",
  src: "images/Men's products.jpg"
},
{
  name: "women's products",
  src: "images/Women's products.jpg"
},
{
  name: "jewelery",
  src: "images/jewelry.webp"
}
];

fetch_data("all_products.json").then(res => {
  res.forEach((ele, i) => {set_products_obj(ele, i)});

  let categories__options = document.createElement("ul");

  categories__options.className = "categories__options p-2 list-unstyled";
  document.querySelector(".categories__container").append(categories__options);

  categories.forEach((ele) => {
    let category = document.createElement("li");
    let category__logo = document.createElement("img");

    category.className = "category p-2";
    category.setAttribute("category", ele);
    category__logo.classList.add("mx-2")

    categories__logos.forEach(el => {
        if(el.name == ele) {
          category__logo.src = el.src;
          category__logo.alt = category_image_alt(el.name);
        }
    });

    category.prepend(category__logo);
    category.append(category__link(ele));

    categories__options.append(category);
  });


  function set__categories__logos(category, data) {
    data.forEach(el => {
        if(el.name == category) {
            let category__logo = document.createElement("img");
            category__logo.src = el.src;

            return category__logo;
        }
    })
  }


  function category__link(txt) {
    let category__link = document.createElement("a");
    category__link.classList.add("text-decoration-none");
    category__link.href = `#categories__section`;
    category__link.text = txt;

    return category__link;
  }

  categories__btn.onclick = function() {
    if(!categories__options.classList.contains("listed")) {
        categories__options.classList.add("listed");
    } else {
        categories__options.classList.remove("listed");
    }
  }

  let categories__items = document.querySelectorAll(".category");

  categories__items.forEach(ele => {
    ele.onclick = function(e) {
        categories__options.classList.remove("listed");
    }
  });

});

// product preview
function display_product_preview() {
  let products = document.querySelectorAll(".product");

  products.forEach(ele => {
    ele.addEventListener("click", () => {
        // display the container
        document.body.classList.add("overlay");
        // render product
        render_preview(ele);
    });
  });
}

// cart items
const cart__items = new Set();
let saved__cart__items = localStorage.getItem("cart-items");
let cart__ico = document.querySelector(".cart__ico");

if(saved__cart__items) {
  JSON.parse(saved__cart__items).forEach(ele => {cart__items.add(ele)});
}

cart_items_num();

cart__ico.onclick = function() {
  let cart__items__preview = document.querySelector(".cart__items__preview"),
      localStorage__data = JSON.parse(localStorage.getItem("cart-items"));

  if(localStorage__data && localStorage__data.length >= 1) {
    display_cart_preview();
  } else{
    cart__items__preview.classList.remove("listed__cart");
  }
}


// ==== Global function ====

function fetch_data(url) {
const req = fetch(url).then(res => res.json());
return req;
}

function set_products_obj(element, index) {
all_products.add(element);
element.id = index;

if(["Pants","Jackets","Hoodies","Jackets","Hoodies","T-shirt","Jackets","T-shirt","Jackets", "T-shirts"].includes(element.category)) {
  element.category = "men's products";
}

categories.add(element.category);
}

function change_currency() {
  let currencies__items = document.querySelectorAll(".currency__options li");

  currencies__items.forEach(ele => {
      ele.addEventListener("click", () => {
          let product__prices = document.querySelectorAll(".product__price");
          let current__currency = JSON.parse(localStorage.getItem("currency"));

          product__prices.forEach(ele => {
              let price = +ele.getAttribute("price-USD");
              ele.textContent = (price * current__currency.rate).toFixed(2) + " " + current__currency.name;
          });
      });
  });

}

function render_preview(element) {
  let product__preview = document.querySelector(".product__preview");

  display_loading_spinner(product__preview);

  fetch_data("all_products.json").then(res => {
    let product__id = +element.getAttribute("product-id"),
        product__obj = [...all_products][product__id],
        current__currency = JSON.parse(localStorage.getItem("currency")),
        current__price = (product__obj.price * current__currency.rate).toFixed(2);

    product__preview.innerHTML = `
    <i class="product__details__close fa-solid fa-xmark p-2"></i>

    <div class="product__images">
        <div class="main__image__container p-3"></div>

        <div class="product__images__pagination mt-3">
            <div class="images__pagination__container px-2"></div>
            <div class="images__pagination__control next d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-angle-right"></i>
            </div>
            <div class="images__pagination__control previous d-flex justify-content-center align-items-center">
                <i class="fa-solid fa-angle-left"></i>
            </div>
        </div>
    </div>

    <div class="product__details p-2">
        <h2 class="py-1"></h2><hr class="m-0">
        <div class="product__description mb-4 mt-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam sint itaque saepe beatae, facilis dolorem ipsa ut, accusantium temporibus minima nisi ex porro vel deserunt quae autem voluptates eum ipsam Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam sint itaque saepe beatae</div>

        <div>
            <div class="product__details__price">
                <span class="the__current__price">
                    <span class="currency__value"></span>
                    <span class="currency__name"></span>
                </span>
                <del class="the__old__price mx-2"></del>
            </div>

            <p class="availability mb-4">
                Availability : <span></span>
            </p>

        </div>

        <div class="product__sale mt-5">
        <button class="add__to__cart py-2 px-3">
            <i class="fa-solid fa-cart-shopping mx-2  text-decoration-none"></i>
            Add To Cart
        </button>

      </div>

    </div>`;

    let product__title = product__preview.querySelector(".product__details h2"),
        currency__value = product__preview.querySelector(".currency__value"),
        currency__name__preview = product__preview.querySelector(".currency__name"),
        availability__value = product__preview.querySelector(".availability span"),
        add__to__cart__btn = product__preview.querySelector(".add__to__cart");

    product__title.textContent = product__obj.title;
    currency__value.setAttribute("product-price", current__price);
    currency__value.textContent = current__price;
    currency__name__preview.textContent = current__currency.name;
    availability__value.textContent = product_stock();
    add__to__cart__btn.setAttribute("product-id", product__obj.id);

    // elements functions
      // main image
      const main__image__container = document.querySelector(".main__image__container");
      let main__image = document.createElement("img");

      main__image.className = 'main__image';
      main__image.alt = `${product__obj.title} - main product photo`;
      set_image_fallback(main__image, product__obj);
      main__image.src = img_src(product__obj);
      main__image__container.append(main__image);
      // image zoom
      main__image__container.onmousemove = function(e) {
          let x = (e.clientX - main__image__container.offsetWidth) / main__image__container.offsetWidth * 100,
              y = (e.clientY - main__image__container.offsetHeight) / main__image__container.offsetHeight * 100;

          main__image.style.transform = `translate(${-x}%, ${-y}%) scale(2.4)`;
      }

      main__image__container.ontouchmove = function(e){
          let x = (e.clientX - main__image__container.offsetWidth) / main__image__container.offsetWidth * 100,
              y = (e.clientY - main__image__container.offsetHeight) / main__image__container.offsetHeight * 100;

          main__image.style.transform = `translate(${-x}%, ${-y}%) scale(2)`;
      }

      main__image__container.addEventListener("mouseleave", (e) => {
          main__image.style.transform = `translate(0, 0) scale(1)`;
      });

      // product images pagination
      const images__pagination__container = document.querySelector(".images__pagination__container");
      set_images_pagination();
      pagination_control();
      pagination_images_select();

      // close preview container
      let product__details__close = document.querySelector(".product__details__close");
      product__details__close.onclick = function() {document.body.classList.remove("overlay");}
      product__preview.classList.remove("loading");

      // images slider
      const images__pagination__container__images = document.querySelectorAll(".images__pagination__container img");
      const next = document.querySelector(".next");
      const previous = document.querySelector(".previous");

      if(next && previous) {

          next.onclick = function() {
            let active__image = document.querySelector(".active__image"),
                active__image__id = +active__image.getAttribute("image-id");

              images__pagination__container__images.forEach(ele => {
                images__pagination__container.scrollLeft += 20;

                if(+ele.getAttribute("image-id") == (active__image__id + 1)) {
                  images__pagination__container__images.forEach(ele => {ele.classList.remove("active__image")});
                  ele.classList.add("active__image");
                  main__image.src = ele.src;
                  main__image.alt = ele.alt;
                }
              });
          }

          previous.onclick = function() {
            let active__image = document.querySelector(".active__image"),
              active__image__id = +active__image.getAttribute("image-id");

            images__pagination__container__images.forEach(ele => {
              images__pagination__container.scrollLeft -= 20;

              if(+ele.getAttribute("image-id") == (active__image__id - 1)) {
                images__pagination__container__images.forEach(ele => {ele.classList.remove("active__image")});
                ele.classList.add("active__image");
                main__image.src = ele.src;
                main__image.alt = ele.alt;
              }
            });
          }

      }

      // old price
      let the__old__price = document.querySelector(".the__old__price");
      the__old__price.textContent = product_price_before_discount();

      // add to cart
      let add__to__cart = document.querySelector(".add__to__cart");

      add__to__cart.onclick = function(e) {
        let item = +e.currentTarget.getAttribute("product-id");

        if(localStorage.getItem("cart-items")) {
          let update__items = new Set( JSON.parse(localStorage.getItem("cart-items")));
          update__items.add(item);
          localStorage.setItem("cart-items", JSON.stringify([...update__items]));
        } else{
          cart__items.add(item);
          localStorage.setItem("cart-items", JSON.stringify([...cart__items]));
        }

        cart_items_num();
        showToast("✓ Added to cart!", "success");
      }


    // functions
    function product_price_before_discount(){
        if(product__obj.discountPercentage) {
            let currency__value = +document.querySelector(".currency__value").textContent;
            let old__price = (currency__value / ((100 - product__obj.discountPercentage))) * 100;

            return old__price.toFixed(2)

        } else if(product__obj.old_price){
          return product__obj.old_price

        } else{
          return "";
        }
    }

    function product_stock() {
        if(product__obj.stock) {
            return product__obj.stock;
        } else{
            return "Many In Stock"
        }
    }

    function set_images_pagination() {
        if(Array.isArray(product__obj.images)) {
            product__obj.images.forEach((el, i) => {
              let pagination__img = document.createElement("img");
              pagination__img.className = "p-2 pagination__image";
              pagination__img.setAttribute("image-id", i);
              pagination__img.alt = `${product__obj.title} - thumbnail ${i + 1} of ${product__obj.images.length}`;
              set_image_fallback(pagination__img, product__obj);
              pagination__img.src = el;
              images__pagination__container.append(pagination__img);
            });
        } else{
          let pagination__img = document.createElement("img");
          pagination__img.className = "p-2 pagination__image";
          pagination__img.setAttribute("image-id", 0);
          pagination__img.alt = `${product__obj.title} - product thumbnail`;
          set_image_fallback(pagination__img, product__obj);
          pagination__img.src = product__obj.images;
          images__pagination__container.append(pagination__img);
        }
    }

    function pagination_control() {
        let images__pagination__container__images = document.querySelectorAll(".images__pagination__container img"),
          images__pagination__control = document.querySelectorAll(".images__pagination__control");

        if(images__pagination__container__images.length <= 2) {
          images__pagination__control.forEach(ele => ele.remove());
        }

    }

    function pagination_images_select() {
      let pagination__images = document.querySelectorAll(".pagination__image");
      pagination__images[0].classList.add("active__image");

      pagination__images.forEach(ele => {
        ele.onclick = function(e) {
          pagination__images.forEach(ele => {ele.classList.remove("active__image")});
          e.currentTarget.classList.add("active__image");
          // change the main image
          let main__image = document.querySelector(".main__image");
          main__image.src = e.currentTarget.src;
          main__image.alt = e.currentTarget.alt;
        }
      });
    }

  });
}

function display_loading_spinner(container) {
  container.innerHTML = "";
  container.classList.add("loading");
  container.innerHTML = `<section class="products__loader justify-content-center align-items-center">
    <div class="spinner-border text-primary spinner-border-sm"
    role="status">
    <span class="visually-hidden">Loading products</span>
    </div>
  </section>`;
}

function cart_items_num() {
  let cart__items__num = document.querySelector(".cart__items__num");
  if(localStorage.getItem("cart-items")) {
    cart__items__num.textContent = JSON.parse(localStorage.getItem("cart-items")).length
  }
}

function category_image_alt(categoryName) {
  if (!categoryName) return "Product category illustration";
  const readable = String(categoryName).replace(/-/g, " ");
  return `Illustration for ${readable} category`;
}

function img_src(element) {
  if(Array.isArray(element.images)) {
      return element.images[0]
  } else{
      return element.images;
  }
}

function fallback_img_src(element) {
  const category = element?.category || "";
  const fallbackImages = {
    "smartphones": ["images/samrtphones.jpg", "images/phones.jpg"],
    "electronics": [
      "images/local-product-images/electronics 1.png",
      "images/local-product-images/electronics 2.png",
      "images/local-product-images/electronics 3.png",
      "images/local-product-images/Hard Drive.png"
    ],
    "laptops": [
      "images/local-product-images/laptops 1.png",
      "images/local-product-images/laptops 2.png",
      "images/local-product-images/laptops 3.png",
      "images/local-product-images/laptops 4.png"
    ],
    "watches": [
      "images/local-product-images/watches1.png",
      "images/local-product-images/watches2.png",
      "images/local-product-images/watches 3.png",
      "images/local-product-images/Leather Strap Skeleton Watch.png"
    ],
    "shoes": [
      "images/local-product-images/shoes1.png",
      "images/local-product-images/shoes2.png",
      "images/local-product-images/shoes3.png"
    ],
    "fragrances": [
      "images/local-product-images/fragrances 1.png",
      "images/local-product-images/fragrances 2.png",
      "images/local-product-images/fragrances 3.png"
    ],
    "skincare": [
      "images/local-product-images/skincare1.png",
      "images/local-product-images/skincare2.png",
      "images/local-product-images/skincare 3.png"
    ],
    "men's products": [
      "images/local-product-images/men's products1.png",
      "images/local-product-images/men's products2.png",
      "images/local-product-images/men's products 2.png",
      "images/local-product-images/men's products 4.png",
      "images/local-product-images/men's products 5.png"
    ],
    "women's products": [
      "images/local-product-images/women's products1.png",
      "images/local-product-images/women's products2.png",
      "images/local-product-images/women's products3.png",
      "images/local-product-images/winterjacket.png"
    ],
    "jewelery": ["images/jewelry.webp"],
    "Hoodies": [
      "images/local-product-images/men's products1.png",
      "images/local-product-images/men's products2.png"
    ],
    "Jackets": [
      "images/local-product-images/men's products 2.png",
      "images/local-product-images/men's products 4.png",
      "images/local-product-images/men's products 5.png"
    ],
    "Pants": [
      "images/local-product-images/men's products2.png",
      "images/local-product-images/men's products 4.png"
    ],
    "T-shirt": [
      "images/local-product-images/men's products1.png",
      "images/local-product-images/men's products 5.png"
    ],
    "T-shirts": [
      "images/local-product-images/men's products1.png",
      "images/local-product-images/men's products 5.png"
    ]
  };

  const title = String(element?.title || "").trim();
  const titleFallbacks = {
    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive": "images/local-product-images/Hard Drive.png",
    "Leather Strap Skeleton Watch": "images/local-product-images/Leather Strap Skeleton Watch.png",
    "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats": "images/local-product-images/winterjacket.png"
  };

  if(titleFallbacks[title]) {
      return titleFallbacks[title];
  }

  const options = fallbackImages[category] || ["images/images.jpg"];
  const numericId = Number.isFinite(+element?.id) ? +element.id : 0;
  const titleHash = [...title].reduce((total, char) => total + char.charCodeAt(0), 0);
  const fallbackIndex = Math.abs(numericId + titleHash) % options.length;

  return options[fallbackIndex];
}

function set_image_fallback(imageElement, product) {
  const applyFallback = () => {
      const fallbackSrc = fallback_img_src(product);
      if(!imageElement.src.endsWith(fallbackSrc)) {
          imageElement.src = fallbackSrc;
      }
  };

  imageElement.addEventListener("error", applyFallback);

  if(imageElement.complete && imageElement.naturalWidth === 0) {
      applyFallback();
  }
}

function display_cart_preview() {
  let cart__items__preview = document.querySelector(".cart__items__preview"),
      items__id = JSON.parse(localStorage.getItem("cart-items")),
      currency = JSON.parse(localStorage.getItem("currency"));
  // display list
  cart__items__preview.classList.toggle("listed__cart");
  // loading
  cart__items__preview.classList.add("loading");
  cart__items__preview.innerHTML = `
    <div class="cart__loader justify-content-center align-items-center">
        <div class="spinner-border text-primary spinner-border-sm"
        role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    </div>`;

  fetch_data("all_products.json").then(res => {
    // reset content
    cart__items__preview.classList.remove("loading");
    cart__items__preview.innerHTML = `
    <div class="cart__items position-relative pb-3"></div>

    <div class="cart__summary position-relative pt-2">
      <div class="cart__summary__total pb-3">
        Cart Total : <span class="mx-2"></span>
      </div>
      <button class="view__cart__btn py-2 px-3">
        <i href="#" class="fa-solid fa-cart-shopping mx-2 text-decoration-none"></i>
        Order Now
      </button>
    </div>`;

    let cart__items = document.querySelector(".cart__items");
  // render items
    items__id.forEach(ele => {
      let item = [...all_products][+ele];
      let product__item = document.createElement("div");

      product__item.className = "cart__item position-relative my-3 pb-3";
      product__item.setAttribute("product-id", ele);

      product__item.innerHTML = `
        <i class="fa-solid fa-xmark"></i>
        <div class="cart__item__img__container p-2">
          <img alt="product-image">
        </div>
        <div class="cart__item__info">
          <h2></h2>

          <div class="cart__item__sale d-flex justify-content-between align-items-center mt-4">
            <div class="cart__item__price"></div>

            <div class="product__count d-flex justify-content-between" max-quantity="10">
              <div class="increase__btn d-flex justify-content-center align-items-center py-1"><i class="fa-solid fa-chevron-up"></i></div>
              <span>1</span>
              <div class="decrease__btn d-flex justify-content-center align-items-center py-1"><i class="fa-solid fa-chevron-down"></i></div>
            </div>
          </div>
        </div>
      </div>`

      let cart__item__image = product__item.querySelector(".cart__item__img__container img"),
          cart__item__title = product__item.querySelector(".cart__item__info h2"),
          cart__item__price = product__item.querySelector(".cart__item__price"),
          product__count__num = product__item.querySelector(".product__count span"),
          current__price = (currency.rate * item.price).toFixed(2);

      cart__item__image.setAttribute("alt", `${item.title} - product in shopping cart`);
      set_image_fallback(cart__item__image, item);
      cart__item__image.setAttribute("src", img_src(item));
      cart__item__image.setAttribute("product-id", ele);
      cart__item__title.textContent = item.title;
      cart__item__price.textContent = `${current__price} ${currency.name}`;
      product__count__num.setAttribute("product-price", current__price);
      product__count__num.setAttribute("product-id", item.id);

      cart__items.append(product__item);
    });


// functions
  // delete item
    let del__btn = document.querySelectorAll(".cart__item .fa-xmark");
      cart__items = new Set(JSON.parse(localStorage.getItem("cart-items")));

    del__btn.forEach(ele => {
      ele.onclick = function() {
        let product__id = +ele.parentElement.getAttribute("product-id");
        // remove from local storage
        ele.parentElement.remove();
        cart__items.delete(product__id);
        localStorage.setItem("cart-items", JSON.stringify([...cart__items]));
        // update num of cart items
        cart_items_num();
        // no items
        let product__items = document.querySelectorAll(".cart__item");
        if(product__items.length === 0) {
          cart__items__preview.classList.remove("listed__cart");
          cart__items = new Set();
          localStorage.setItem("cart-items", JSON.stringify([...cart__items]));
        }
        // total price
        total_price()
        showToast("Item removed from cart", "success");
    }
    });

    // product quantity
    let increase__btn = document.querySelectorAll(".increase__btn"),
        decrease__btn = document.querySelectorAll(".decrease__btn");

    increase__btn.forEach(ele => {
      let product__count__num = ele.nextElementSibling;
      ele.onclick = function() {
        if(+product__count__num.textContent < +ele.parentElement.getAttribute("max-quantity")){
          product__count__num.textContent++;
        }
        total_price();
      }
    });

    decrease__btn.forEach(ele => {
      let product__count__num = ele.previousElementSibling;
      ele.onclick = function() {
        if(+product__count__num.textContent > 1){
          product__count__num.textContent--;
        }
        total_price();
      }
    });

    // total price
    total_price();

    function total_price() {
      let product__count__num = document.querySelectorAll(".product__count span"),
          cart__summary__total = document.querySelector(".cart__summary__total span");
      const bill = [];

      product__count__num.forEach(ele => {
        let total__price = (ele.textContent * ele.getAttribute("product-price"))
        ele.setAttribute("total-price", total__price);
        bill.push(+ele.getAttribute("total-price"));
      });

      const total = bill.reduce((initial, ele) => {
        return initial + ele;
      }, 0);

      cart__summary__total.textContent = total.toFixed(2) + ` ${currency.name}`;

    }

    // open product preview
    let cart__item__img__container = document.querySelectorAll(".cart__item__img__container img");
    cart__item__img__container.forEach(ele => {
      ele.onclick = function(e) {
        cart__items__preview.classList.remove("listed__cart");
        // display the container
        document.body.classList.add("overlay");
        // render product
        render_preview(e.currentTarget);
      }
    });


  });

}

