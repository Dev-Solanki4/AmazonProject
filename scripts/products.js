import { getProduct } from "../data/products.js";

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
                <button class="add-to-cart-button">Add to Cart</button>
                <button class="buy-now-button">Buy Now</button>
            </div>
    `;
    document.querySelector('.js-content-grid').innerHTML = html;
    
}
renderProductDetails();