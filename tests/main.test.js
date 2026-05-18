// --------------------
// 模拟 DOM
// --------------------
beforeAll(async () => {
    document.body.innerHTML = `
    <div class="currency__value">1</div>
    <div class="product__preview"></div>
    <button class="scroll__top__btn">Top</button>
    <div class="cart__items__num">0</div>
  `;

    // 延迟导入 main.js，确保 DOM 已经存在
    const mainModule = await import("../javascript/main.js");
    global.product_price_before_discount = mainModule.product_price_before_discount;
    global.product_stock = mainModule.product_stock;
    global.img_src = mainModule.img_src;
    global.category_image_alt = mainModule.category_image_alt;
    global.showToast = mainModule.showToast;
    global.initScrollTopBtn = mainModule.initScrollTopBtn;

    // 初始化 ScrollTop 按钮逻辑
    mainModule.initScrollTopBtn();
});

// --------------------
// 工具函数测试
// --------------------
describe("Utility functions tests", () => {

    test("product_stock returns 'Many In Stock' if stock not defined", () => {
        const mockProduct = {};
        expect(product_stock(mockProduct)).toBe("Many In Stock");
    });

    test("img_src returns first element if images is array", () => {
        const mockProduct = { images: ["img1.jpg", "img2.jpg"] };
        expect(img_src(mockProduct)).toBe("img1.jpg");
    });

    test("img_src returns the string itself if images is a string", () => {
        const mockProduct = { images: "img.png" };
        expect(img_src(mockProduct)).toBe("img.png");
    });

    test("category_image_alt returns readable string", () => {
        expect(category_image_alt("men's-products")).toBe("Illustration for men's-products category");
    });

    test("product_price_before_discount formats correctly", () => {
        expect(product_price_before_discount(109.95)).toBe("$109.95");
        expect(product_price_before_discount(0)).toBe("$0.00");
    });

});

// --------------------
// ScrollTop 按钮测试
// --------------------
describe("Scroll to top button tests", () => {
    test("scroll__top__btn has tabindex set", () => {
        const scroll__top__btn = document.querySelector(".scroll__top__btn");
        expect(scroll__top__btn).not.toBeNull();
        expect(scroll__top__btn.getAttribute("tabindex")).toBe("-1");
    });
});

// --------------------
// Toast 消息测试
// --------------------
describe("Toast notification tests", () => {
    test("showToast creates a toast element with correct text", () => {
        showToast("Test message");
        const toast = document.querySelector(".toast-container");
        expect(toast).not.toBeNull();
        expect(toast.textContent).toContain("Test message");
    });
});

// --------------------
// 购物车数量显示测试
// --------------------
describe("Cart display test", () => {
    test("cart__items__num exists and initial value is 0", () => {
        const cartNum = document.querySelector(".cart__items__num");
        expect(cartNum).not.toBeNull();
        expect(cartNum.textContent).toBe("0");
    });
});