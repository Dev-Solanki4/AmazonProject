import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
    let totalItems = calculateCartQuantity();
    const html = `
              Checkout (<a class="return-to-home-link js-total-item"
            href="amazon.html">${totalItems} items</a>)
    `;
    document.querySelector('.js-checkout-header-top').innerHTML = html;
}

export default renderCheckoutHeader;