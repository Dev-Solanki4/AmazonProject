import { getProduct } from "../data/products.js";
import { cart } from "../data/cart-class.js";

function renderProductDetails(){
    const url = new URL(window.location.href);
    const productId = url.searchParams.get("productId");

    const matchingProduct = getProduct(productId);
    const html = `
            <div class="product-left">
                <img src="${matchingProduct.image}" alt="Product Image" class="product-image">
            </div>
            <div class="product-right">
                <div class="product-name">
                    <h1>${matchingProduct.name}</h1>
                </div>
                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${matchingProduct.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                    (${matchingProduct.rating.count} Reviews)
                    </div>
                </div>
                <div class="product-price">${matchingProduct.getPrice()}</div>
                <div class="product-quantity">
                    <label for="quantity">Quantity:</label>
                    <select class=" js-product-quantity-${matchingProduct.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="added-to-cart js-added-message">
                    <img class="added-image" src="images/icons/checkmark.png">
                    Added
                </div>
                <button class="add-to-cart-button js-add-to-cart" data-product-id="${matchingProduct.id}">Add to Cart</button>
                <button class="buy-now-button">Buy Now</button>
            </div>
    `;
    document.querySelector('.js-content-grid').innerHTML = html;
    cartQuantity();
    

    let timeoutId;
    function message(){
        let message = document.querySelector('.js-added-message');
        clearTimeout(timeoutId);
        message.classList.add('add-to-cart-message');
        timeoutId = setTimeout(()=>{
            message.classList.remove('add-to-cart-message');
        },2000);
    }

    const button = document.querySelector('.js-add-to-cart');
    button.addEventListener('click',()=>{

        let productId = button.dataset.productId;

        cart.addToCart(productId);

        message();

        cartQuantity();
    })

    function cartQuantity(){
        let displayNoItems = document.querySelector('.js-cart-quantity');
        displayNoItems.innerText = `${cart.calculateCartQuantity()}`;
    }

}
renderProductDetails();